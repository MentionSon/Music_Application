import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from "./constant";
import { fromJS } from "immutable";

export const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
});
