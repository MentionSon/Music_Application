import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRankListRequest } from "../../../api/request";
import { changeRankList, changeLoading } from ".";

export const useRank = () => {
  const disPatch = useDispatch();

  const rankList =
    useSelector((state) => state.getIn(["rank", "rankList"])).toJS() || [];

  const loading = useSelector((state) => state.getIn(["rank", "loading"]));

  async function getRankList() {
    try {
      const result = await getRankListRequest();
      disPatch(changeRankList(result.list));
      disPatch(changeLoading(false));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRankList();
  }, []);

  return {
    rankList,
    loading,
  };
};
