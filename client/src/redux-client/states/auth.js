import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "api/auth";
import { initUser, setUser } from "./user";
import constants from "utils/constants";

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
      return thunkApi.rejectWithValue(
        err.response
          ? err.response.data
          : {
              msg: constants.GENERAL_ERROR,
            }
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      const formData = new FormData();
      for (let value in user) {
        formData.append(value, user[value]);
      }
      formData.append("picturePath", user.picture.name);
      const response = await authApi.register(formData);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response
          ? err.response.data
          : {
              msg: constants.GENERAL_ERROR,
            }
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (_state) => {
      initUser();
      return initialState;
    },
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
