import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingerInfoRequest } from "../../../api/request";
import { changeSongs, changeEnterLoading } from "./actionCreator";
import { CHANGE_ARTIST } from "./constant";
import { fromJS } from "immutable";

export const useSinger = (id) => {
  const dispatch = useDispatch();

  const artist =
    useSelector((state) => state.getIn(["singer", "artist"])).toJS() || {};

  const songsOfArtist =
    useSelector((state) => state.getIn(["singer", "songsOfArtist"])).toJS() ||
    [];

  const enterLoading = useSelector((state) =>
    state.getIn(["singer", "enterLoading"])
  );

  const getArtistAndHotSongs = async () => {
    const result = await getSingerInfoRequest(id);
    dispatch({
      type: CHANGE_ARTIST,
      data: fromJS(result.artist),
    });
    dispatch(changeSongs(result.hotSongs));
    dispatch(changeEnterLoading(false));
  };

  useEffect(() => {
    getArtistAndHotSongs();
  }, [id]);

  return {
    artist,
    songsOfArtist,
    enterLoading,
  };
};
