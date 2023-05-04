import axios from "axios";

const axiosInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_URL_BACKEND,
});

export const postWithToken = (uri, requestBody, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.post(uri, requestBody, {
    headers: headers,
  });
};

export const getWithToken = (uri, params = {}, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.get(uri, {
    headers: headers,
  });
};

export const patchWithToken = (uri, params = {}, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.patch(uri, params, {
    headers: headers,
  });
};

export default axiosInstance;
