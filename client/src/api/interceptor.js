import axios from "axios";

const axiosInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_URL_BACKEND,
});

export const postWithToken = (uri, requestBody, token) => {
  let headers = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`,
  };
  console.log(headers);
  return axiosInstance.post(uri, requestBody, {
    headers: headers,
  });
};

export default axiosInstance;
