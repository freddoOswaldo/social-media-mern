import axios from "axios";
import { postWithToken } from "./interceptor";

export const createPost = (post, token) => postWithToken("/posts", post, token);
