import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  changeEnterLoading,
  changeHotKeyWords,
  changeSuggestList,
  changeResultSongs,
} from "./actionCreator";
import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from "../../../api/request";

export const useSearch = () => {
  const dispatch = useDispatch();

  const hotList =
    useSelector((state) => state.getIn(["search", "hotList"])).toJS() || [];
  const enterLoading = useSelector((state) =>
    state.getIn(["search", "enterLoading"])
  );
  const suggestList =
    useSelector((state) => state.getIn(["search", "suggestList"])).toJS() || {};
  const songsCount = useSelector(
    (state) => state.getIn(["player", "playList"]).size
  );
  const songsList =
    useSelector((state) => state.getIn(["search", "songsList"])).toJS() || [];

  const changeEnterLoadingDispatch = useCallback((data) => {
    dispatch(changeEnterLoading(data));
  }, []);

  const getHotKeyWordsDispatch = useCallback((data) => {
    dispatch(changeHotKeyWords(data));
  }, []);

  const getSuggestListDispatch = useCallback((data) => {
    dispatch(changeSuggestList(data));
  }, []);

  const getResultSongsDispatch = useCallback((data) => {
    dispatch(changeResultSongs(data));
  });

  const setHotKeyWords = useCallback(async () => {
    // changeEnterLoadingDispatch(true);
    const res = await getHotKeyWordsRequest();
    getHotKeyWordsDispatch(res.result.hots);
  }, []);

  const setSuggestList = useCallback(async (query) => {
    const suggestRes = await getSuggestListRequest(query);
    const songsRes = await getResultSongsListRequest(query);
    getSuggestListDispatch(suggestRes.result);
    getResultSongsDispatch(songsRes.result.songs);
  });

  return {
    hotList,
    enterLoading,
    suggestList,
    songsCount,
    songsList,
    changeEnterLoadingDispatch,
    setHotKeyWords,
    setSuggestList,
  };
};
