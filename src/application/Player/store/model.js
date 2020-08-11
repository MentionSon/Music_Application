import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { changeFullScreen, changePlayingState } from "./actionCreator";

export const usePlayer = () => {
  const dispatch = useDispatch();

  const fullScreen = useSelector((state) =>
    state.getIn(["player", "fullScreen"])
  );

  const toggleFullScreen = useCallback((data) => {
    dispatch(changeFullScreen(data));
  }, []);

  const togglePlaying = useCallback((data) => {
    dispatch(changePlayingState(data));
  }, []);

  return {
    fullScreen,
    toggleFullScreen,
    togglePlaying,
  };
};
