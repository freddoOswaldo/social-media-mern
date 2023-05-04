import axiosInstance from "./interceptor";

export const login = (email, password) =>
  axiosInstance.post("/auth/login", {
    email,
    password,
  });

export const register = (user) => axiosInstance.post("/auth/register", user);
