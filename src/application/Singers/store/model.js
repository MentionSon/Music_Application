import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from "../../../api/request";
import {
  changeSingerList,
  changePullDownLoading,
  changePageCount,
  changePullUpLoading,
} from "./actionCreators";

export const useHotSingerList = (hot, { type, area }, inital) => {
  const dispatch = useDispatch();

  const singerList =
    useSelector((state) => state.getIn(["singers", "singerList"])).toJS() || [];

  const pageCount = useSelector((state) =>
    state.getIn(["singers", "pageCount"])
  );

  const pullUpLoading = useSelector((state) =>
    state.getIn(["singers", "pullUpLoading"])
  );

  const pullDownLoading = useSelector((state) =>
    state.getIn(["singers", "pullDownLoading"])
  );

  function changePage(count) {
    dispatch(changePageCount(count));
  }

  function pullUpRefreshDispatch() {
    dispatch(changePullUpLoading(true));
    changePage(pageCount + 1);
  }

  function pullDownRefreshDishpatch() {
    dispatch(changePullDownLoading(true));
    changePage(0);
    dispatch(changePullDownLoading(false));
  }

  async function getHotSingers() {
    const result = await getHotSingerListRequest(pageCount);
    if (pullUpLoading) {
      dispatch(changeSingerList([...singerList, ...result.artists]));
    } else {
      dispatch(changeSingerList(result.artists));
    }
    dispatch(changePullUpLoading(false));
  }

  async function getSingers() {
    const result = await getSingerListRequest(type, area, inital, pageCount);
    if (pullUpLoading) {
      dispatch(changeSingerList([...singerList, ...result.artists]));
    } else {
      dispatch(changeSingerList(result.artists));
    }
    dispatch(changePullUpLoading(false));
  }

  useEffect(() => {
    if (hot) {
      getHotSingers();
    } else {
      getSingers();
    }
  }, [hot, pageCount, type, area, inital]);

  return {
    singerList,
    pullUpLoading,
    pullDownLoading,
    changePage,
    pullUpRefreshDispatch,
    pullDownRefreshDishpatch,
  };
};
