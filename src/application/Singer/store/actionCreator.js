import {
  CHANGE_ARTIST,
  CHANGE_SONGS_OF_ARTIST,
  CHANGE_ENTER_LOADING,
} from "./constant";
import { fromJS } from "immutable";

export const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data),
});

export const changeSongs = (data) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data),
});
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
});
