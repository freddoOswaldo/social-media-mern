import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "api/auth";
import { setUser } from "./user";

const initialState = {
  user: null,
  token: null,
  fetching: false,
  error: null,
  success: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await authApi.login(email, password);
      thunkApi.dispatch(setUser(response.data));
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      const response = await authApi.register(user);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (_state) => initialState,
    init: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return {
          ...state,
          fetching: true,
          success: false,
          error: null,
        };
      })
      .addCase(login.rejected, (state, action) => {
        const { msg } = action.payload;
        return {
          ...state,
          fetching: false,
          error: msg,
          success: false,
        };
      })
      .addCase(login.fulfilled, (_state, action) => {
        console.log(action);
        const { user, token } = action.payload;
        return {
          user,
          token,
          fetching: false,
          error: null,
          success: true,
        };
      })
      .addCase(register.pending, (state) => {
        return {
          ...state,
          fetching: true,
        };
      })
      .addCase(register.rejected, (state, action) => {
        const { msg } = action.payload;
        return {
          ...state,
          fetching: false,
          error: msg,
          success: false,
        };
      })
      .addCase(register.fulfilled, (_state) => {
        return {
          fetching: false,
          err: null,
          success: true,
        };
      });
  },
});

export const { setLogout, init } = authSlice.actions;
export default authSlice.reducer;
