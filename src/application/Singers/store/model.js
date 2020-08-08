import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from "../../../api/request";
import {
  changeSingerList,
  changeEnterLoading,
  changePullDownLoading,
  changePageCount,
  changePullUpLoading,
} from "./actionCreators";

export const useHotSingerList = () => {
  const dispatch = useDispatch();

  const singerList = useSelector(
    (state) => state.getIn(["singers", "singerList"]).toJS() || []
  );

  const pageCount = useSelector((state) =>
    state.getIn(["singers", "pageCount"])
  );

  const pullUpLoading = useSelector((state) =>
    state.getIn(["singers", "pullUpLoading"])
  );

  function pullUpRefreshDispatch() {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(pageCount + 1));
  }

  const getHotSingers = useCallback(async () => {
    const result = await getHotSingerListRequest(pageCount);
    const result1 = await getSingerListRequest();
    dispatch(changeSingerList(result.artists));
    // dispatch(changeEnterLoading(false));
    dispatch(changePullUpLoading(false));
  }, [pageCount]);

  useEffect(() => {
    getHotSingers();
  }, [pageCount]);

  return {
    singerList,
    pullUpLoading,
    pullUpRefreshDispatch,
  };
};
