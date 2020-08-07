import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";
import {
  changeBannerList,
  changeRecommendList,
  changeEnterLoading,
} from "./actionCreator";

export const useRecommend = () => {
  const dispatch = useDispatch();

  const bannerListJS =
    useSelector((state) => state.getIn(["recommend", "bannerList"])).toJS() ||
    [];
  const recommendListJS =
    useSelector((state) =>
      state.getIn(["recommend", "recommendList"])
    ).toJS() || [];
  const enterLoading = useSelector((state) =>
    state.getIn(["recommend", "enterLoading"])
  );

  const getBanners = useCallback(async () => {
    const result = await getBannerRequest();
    dispatch(changeBannerList(result.banners));
  }, []);

  const getRecommends = useCallback(async () => {
    const result = await getRecommendListRequest();
    dispatch(changeRecommendList(result.result));
  }, []);

  useEffect(() => {
    if (!bannerListJS.length || !recommendListJS.length) {
      getBanners();
      getRecommends();
      dispatch(changeEnterLoading(false));
    }
  }, [getBanners, getRecommends]);

  return { bannerListJS, recommendListJS, enterLoading };
};
