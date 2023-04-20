import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  posts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
    setPost: (state, action) => {
      const { postId, post: payloadPost } = action.payload;
      const { posts } = state;
      const updatedPosts = posts.map((post) =>
        post._id === postId ? payloadPost : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };
    },
  },
});

export const { setPost, setPosts, setFriends, setUser, clean } =
  userSlice.actions;
export default userSlice.reducer;
