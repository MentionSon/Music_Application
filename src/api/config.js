import axios from "axios";

export const baseUrl = "http://localhost:3003";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.log(error);
  }
);

export { axiosInstance };
