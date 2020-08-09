import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (type, area, inital, pageCount) => {
  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area}&initial=${inital}&offset=${pageCount}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get("/toplist/detail");
};
