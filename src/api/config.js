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

export const categoryTypes = [
  {
    name: "华语男",
    type: "1",
    area: "7",
    key: "1-7",
  },
  {
    name: "华语女",
    type: "2",
    area: "7",
    key: "2-7",
  },
  {
    name: "华语组合",
    type: "3",
    area: "7",
    key: "3-7",
  },
  {
    name: "欧美男",
    type: "1",
    area: "76",
    key: "1-76",
  },
  {
    name: "欧美女",
    type: "2",
    area: "76",
    key: "2-76",
  },
  {
    name: "欧美组合",
    type: "3",
    area: "76",
    key: "3-76",
  },
  {
    name: "日本男",
    type: "1",
    area: "8",
    key: "1-8",
  },
  {
    name: "日本女",
    type: "2",
    area: "8",
    key: "2-8",
  },
  {
    name: "日本组合",
    type: "3",
    area: "8",
    key: "3-8",
  },
  {
    name: "韩国男",
    type: "1",
    area: "16",
    key: "1-16",
  },
  {
    name: "韩国女",
    type: "2",
    area: "16",
    key: "2-16",
  },
  {
    name: "韩国组合",
    type: "3",
    area: "16",
    key: "3-16",
  },
  {
    name: "其他男歌手",
    type: "1",
    area: "0",
    key: "1-0",
  },
  {
    name: "其他女歌手",
    type: "2",
    area: "0",
    key: "2-0",
  },
  {
    name: "其他组合",
    type: "3",
    area: "0",
    key: "3-0",
  },
];

export const alphaTypes = [
  {
    type: "A",
    name: "A",
  },
  {
    type: "B",
    name: "B",
  },
  {
    type: "C",
    name: "C",
  },
  {
    type: "D",
    name: "D",
  },
  {
    type: "E",
    name: "E",
  },
  {
    type: "F",
    name: "F",
  },
  {
    type: "G",
    name: "G",
  },
  {
    type: "H",
    name: "H",
  },
  {
    type: "I",
    name: "I",
  },
  {
    type: "J",
    name: "J",
  },
  {
    type: "K",
    name: "K",
  },
  {
    type: "L",
    name: "L",
  },
  {
    type: "M",
    name: "M",
  },
  {
    type: "N",
    name: "N",
  },
  {
    type: "O",
    name: "O",
  },
  {
    type: "P",
    name: "P",
  },
  {
    type: "Q",
    name: "Q",
  },
  {
    type: "R",
    name: "R",
  },
  {
    type: "S",
    name: "S",
  },
  {
    type: "T",
    name: "T",
  },
  {
    type: "U",
    name: "U",
  },
  {
    type: "V",
    name: "V",
  },
  {
    type: "W",
    name: "W",
  },
  {
    type: "X",
    name: "X",
  },
  {
    type: "Y",
    name: "Y",
  },
  {
    type: "Z",
    name: "Z",
  },
];

export const HEADER_HEIGHT = 45;

export { axiosInstance };
