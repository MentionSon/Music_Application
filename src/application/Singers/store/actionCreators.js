import * as actionTypes from "./constant";
import { fromJS } from "immutable";

export const changeSingerList = (data) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data),
});

export const changePageCount = (data) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: data,
});

export const changePullUpLoading = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data: data,
});

export const changePullDownLoading = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data: data,
});
