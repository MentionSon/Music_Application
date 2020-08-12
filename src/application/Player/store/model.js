import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  changeFullScreen,
  changePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
} from "./actionCreator";

export const usePlayer = () => {
  const dispatch = useDispatch();

  const fullScreen = useSelector((state) =>
    state.getIn(["player", "fullScreen"])
  );

  const playing = useSelector((state) => state.getIn(["player", "playing"]));

  const currentSong =
    useSelector((state) => state.getIn(["player", "currentSong"])).toJS() || {};

  const toggleFullScreen = useCallback((data) => {
    dispatch(changeFullScreen(data));
  }, []);

  const togglePlaying = useCallback((data) => {
    dispatch(changePlayingState(data));
  }, []);

  const changeCurrentPlayIndex = useCallback((index) => {
    dispatch(changeCurrentIndex(index));
  });

  const changeCurrentSongData = useCallback((data) => {
    dispatch(changeCurrentSong(data));
  });

  return {
    fullScreen,
    playing,
    currentSong,
    toggleFullScreen,
    togglePlaying,
    changeCurrentPlayIndex,
    changeCurrentSongData,
  };
};
