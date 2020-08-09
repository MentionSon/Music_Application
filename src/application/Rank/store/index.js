import { fromJS } from "immutable";

export const CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST";
export const CHANGE_LOADING = "home/rank/CHANGE_LOADING";

// actionCreator
export const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data),
});

export const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data: data,
});

const defaultState = fromJS({
  rankList: [],
  loading: true,
});

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set("rankList", action.data);
    case CHANGE_LOADING:
      return state.set("loading", action.data);
    default:
      return state;
  }
};
