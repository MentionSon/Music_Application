import { useEffect } from "react";
import { getAlbumDetailRequest } from "../../../api/request";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentAlbum, changeEnterLoading } from "./actionCreator";

export const useAlbum = (id) => {
  const dispatch = useDispatch();

  const currentAlbum =
    useSelector((state) => state.getIn(["album", "currentAlbum"])).toJS() || {};

  const enterLoading = useSelector((state) =>
    state.getIn(["album", "enterLoading"])
  );

  const getAlbumList = async () => {
    const result = await getAlbumDetailRequest(id);
    dispatch(changeCurrentAlbum(result.playlist));
    dispatch(changeEnterLoading(false));
  };

  useEffect(() => {
    getAlbumList();
  }, [id]);

  return {
    enterLoading,
    currentAlbum,
  };
};
