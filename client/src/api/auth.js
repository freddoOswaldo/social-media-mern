import axios from "axios";

axios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-undef
  config.baseURL = process.env.REACT_APP_URL_BACKEND;
  return config;
});

export const login = (email, password) =>
  axios.post("/auth/login", {
    email,
    password,
  });

export const register = (user) => axios.post("/auth/register", user);
