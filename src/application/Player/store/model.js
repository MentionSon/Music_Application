import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  changeFullScreen,
  changePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayMode,
  changePlayList,
} from "./actionCreator";
import styled from "styled-components";

export const usePlayer = () => {
  const dispatch = useDispatch();

  const fullScreen = useSelector((state) =>
    state.getIn(["player", "fullScreen"])
  );

  const playing = useSelector((state) => state.getIn(["player", "playing"]));

  const currentSong =
    useSelector((state) => state.getIn(["player", "currentSong"])).toJS() || {};

  const currentIndex = useSelector((state) =>
    state.getIn(["player", "currentIndex"])
  );

  const mode = useSelector((state) => state.getIn(["player", "mode"]));

  const playList =
    useSelector((state) => state.getIn(["player", "playList"])).toJS() || [];

  const sequencePlayList =
    useSelector((state) =>
      state.getIn(["player", "sequencePlayList"])
    ).toJS() || [];

  const playCount = useSelector((state) => state.getIn(["player", "playList"]))
    .size;

  const toggleFullScreen = useCallback((data) => {
    dispatch(changeFullScreen(data));
  }, []);

  const togglePlaying = useCallback((data) => {
    dispatch(changePlayingState(data));
  }, []);

  const changeCurrentPlayIndex = useCallback((index) => {
    dispatch(changeCurrentIndex(index));
  }, []);

  const changeCurrentSongData = useCallback((data) => {
    dispatch(changeCurrentSong(data));
  }, []);

  const changeCurrentPlayListIndex = useCallback((data) => {
    dispatch(changeCurrentIndex(data));
  }, []);

  const changeMode = useCallback((data) => {
    dispatch(changePlayMode(data));
  }, []);

  const changeMusicPlayList = useCallback((data) => {
    dispatch(changePlayList(data));
  }, []);

  return {
    fullScreen,
    playing,
    currentSong,
    currentIndex,
    mode,
    playList,
    sequencePlayList,
    playCount,
    toggleFullScreen,
    togglePlaying,
    changeCurrentPlayIndex,
    changeCurrentSongData,
    changeCurrentPlayListIndex,
    changeMode,
    changeMusicPlayList,
  };
};
