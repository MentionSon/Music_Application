import React from "react";
import { SongList, SongItem } from "./style";
import { getName } from "../../api/utils";
import { usePlayer } from "../Player/store/model";

const SongsList = React.forwardRef((props, refs) => {
  const { collectCount, showCollect, songs, musicAnimation } = props;

  const { changeMusicPlayList, changeCurrentPlayListIndex } = usePlayer();

  const totalCount = songs.length;

  const selectItem = (e, index) => {
    e.persist();
    changeMusicPlayList(songs);
    changeCurrentPlayListIndex(index);
    musicAnimation(e.clientX, e.clientY);
  };

  const songList = (list) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={i} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    }
    return res;
  };

  const collect = (count) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span> 收藏 ({Math.floor(count / 1000)} T)</span>
      </div>
    );
  };

  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="fa fa-play"></i>
          <span>
            {" "}
            播放全部 <span className="sum">(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  );
});

export default React.memo(SongsList);
