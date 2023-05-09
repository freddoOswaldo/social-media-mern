import { postWithToken, getWithToken, patchWithToken } from "./interceptor";

export const createPost = (post, token) => postWithToken("/posts", post, token);

export const getPosts = (token) => getWithToken("/posts", null, token);

export const getUserPosts = (userId, token) =>
  getWithToken(`/posts/${userId}/posts`, null, token);

export const patchFriend = (userId, friendId, token) =>
  patchWithToken(`/users/${userId}/${friendId}`, null, token);

export const patchLike = (postId, userId, token) =>
  patchWithToken(`/posts/${postId}/like`, { userId }, token);

export const getUser = (userId, token) =>
  getWithToken(`/users/${userId}`, null, token);
