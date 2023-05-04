import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import * as userApi from "api/user";
import constants from "utils/constants";

const initialState = {
  user: null,
  posts: [],
  fetching: false,
  error: null,
  fetchingFriend: false,
  errorFriend: null,
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

export const getPosts = createAsyncThunk(
  "getPosts",
  async (_params, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      const response = await userApi.getPosts(token);
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

export const getUserPosts = createAsyncThunk(
  "getUserPosts",
  async (userId, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      const response = await userApi.getUserPosts(userId, token);
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

export const patchFriend = createAsyncThunk(
  "patchFriend",
  async ({ userId, friendId }, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      const response = await userApi.patchFriend(userId, friendId, token);
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

export const patchLike = createAsyncThunk(
  "patchFriend",
  async ({ postId, userId }, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      const response = await userApi.patchLike(postId, userId, token);
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
      .addCase(patchFriend.pending, (state) => ({
        ...state,
        fetchingFriend: true,
      }))
      .addCase(patchFriend.rejected, (state, { payload: { msg } }) => ({
        ...state,
        fetchingFriend: false,
        errorFriend: msg,
      }))
      .addCase(patchFriend.fulfilled, (state, { payload: { friends } }) => ({
        ...state,
        fetchingFriend: false,
        errorFriend: null,
        user: {
          ...state.user,
          friends,
        },
      }))
      .addMatcher(isAnyOf(patchLike.fulfilled), (state, { payload }) => {
        const { post: payloadPost } = payload;
        const updatedPosts = state.posts.map((post) =>
          post._id === payloadPost._id ? payloadPost : post
        );
        return {
          ...state,
          fetching: false,
          error: null,
          posts: updatedPosts,
        };
      })
      .addMatcher(
        isAnyOf(
          createPost.pending,
          getPosts.pending,
          getUserPosts.pending,
          patchLike.pending
        ),
        (state) => ({
          ...state,
          fetching: true,
        })
      )
      .addMatcher(
        isAnyOf(
          createPost.rejected,
          getPosts.rejected,
          getUserPosts.rejected,
          patchLike.rejected
        ),
        (state, { payload: { msg } }) => ({
          ...state,
          fetching: false,
          error: msg,
        })
      )
      .addMatcher(
        isAnyOf(
          getPosts.fulfilled,
          getUserPosts.fulfilled,
          createPost.fulfilled
        ),
        (state, { payload: { posts } }) => ({
          ...state,
          fetching: false,
          error: null,
          posts,
        })
      ),
});

export const { setPost, setPosts, setFriends, setUser, clean, initUser } =
  userSlice.actions;
export default userSlice.reducer;
