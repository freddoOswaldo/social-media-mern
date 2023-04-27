import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userApi from "api/user";
import constants from "utils/constants";

const initialState = {
  user: null,
  posts: [],
  fetching: null,
  error: null,
};

export const createPost = createAsyncThunk(
  "createPost",
  async (post, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      const response = await userApi.createPost(post, token);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (_state) => initialState,
    setUser: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),
    clean: (_state) => initialState,
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      }
      console.error(
        "😞 ~ file: user.js:26 ~ setFriends: user friends non-existent"
      );
    },
    setPosts: (state, action) => {
      return {
        ...state,
        posts: action.payload.posts,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createPost.pending, (state) => {
        return {
          ...state,
          fetching: true,
        };
      })
      .addCase(createPost.rejected, (state, action) => {
        const { msg } = action.payload;
        return {
          ...state,
          fetching: false,
          error: msg,
        };
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        const { postId, post: payloadPost } = payload;
        const { posts } = state;
        const updatedPosts = posts.map((post) =>
          post._id === postId ? payloadPost : post
        );
        return {
          ...state,
          fetching: false,
          error: null,
          posts: updatedPosts,
        };
      }),
});

export const { setPost, setPosts, setFriends, setUser, clean, initUser } =
  userSlice.actions;
export default userSlice.reducer;
