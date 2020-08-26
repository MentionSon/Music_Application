import {
  SET_HOT_KEYWRODS,
  SET_SUGGEST_LIST,
  SET_RESULT_SONGS_LIST,
  SET_ENTER_LOADING,
} from "./constant";
import { fromJS } from "immutable";

export const changeHotKeyWords = (data) => ({
  type: SET_HOT_KEYWRODS,
  data: fromJS(data),
});

export const changeSuggestList = (data) => {
  console.log(data);
  return { type: SET_SUGGEST_LIST, data: fromJS(data) };
};

export const changeResultSongs = (data) => ({
  type: SET_RESULT_SONGS_LIST,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: SET_ENTER_LOADING,
  data,
});
