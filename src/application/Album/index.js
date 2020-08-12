import React, { useState, useRef, useCallback } from "react";
import { Container, TopDesc, Menu, SongList, SongItem } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/Header";
import Scroll from "../../baseUI/Scroll";
import { getCount, getName, isEmptyObject } from "../../api/utils";
import style from "../../assets/global-style";
import { useAlbum } from "./store/model";
import Loading from "../../baseUI/Loading";
import { HEADER_HEIGHT } from "../../api/config";
import MusicNote from "../../baseUI/MusicNote";
import { usePlayer } from "../Player/store/model";

const Album = (props) => {
  const id = props.match.params.id;

  const { enterLoading, currentAlbum } = useAlbum(id);

  const [showStatus, setShowStatus] = useState(true);

  const {
    playCount,
    changeMusicPlayList,
    changeCurrentPlayListIndex,
  } = usePlayer();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const HeaderEl = useRef(null);

  const musicNoteRef = useRef(null);

  const selectItem = (e, index) => {
    changeMusicPlayList(currentAlbum.tracks);
    changeCurrentPlayListIndex(index);
    musicNoteRef.current.startAnimation({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  };

  const handleScroll = useCallback(
    (pos) => {
      const minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      const headerDom = HeaderEl.current;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
      }
    },
    [currentAlbum]
  );

  const renderMenu = () => {
    const menuList = [
      {
        icon: "comment",
        title: "评论",
      },
      {
        icon: "heart",
        title: "点赞",
      },
      {
        icon: "plus",
        title: "收藏",
      },
      {
        icon: "ellipsis-v",
        title: "更多",
      },
    ];

    return (
      <Menu>
        {menuList.map((item) => (
          <div key={item.icon}>
            <i className={`fa fa-${item.icon}`}></i>
            {item.title}
          </div>
        ))}
      </Menu>
    );
  };

  const renderSongList = () => (
    <SongList showBackground>
      <div className="first_line">
        <div
          className="play_all"
          onClick={(e) => {
            selectItem(e, 0);
          }}
        >
          <i className="fa fa-play-circle"></i>
          <span>
            {" "}
            播放全部{" "}
            <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
          </span>
        </div>
        <div className="add_list">
          <i className="fa fa-plus" aria-hidden="true"></i>
          <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {currentAlbum.tracks.map((item, index) => (
          <li
            key={index}
            onClick={(e) => {
              selectItem(e, index);
            }}
          >
            <span className="index">{index + 1}</span>
            <div className="info">
              <span>{item.name}</span>
              <span>
                {getName(item.ar)} - {item.al.name}
              </span>
            </div>
          </li>
        ))}
      </SongItem>
      <MusicNote ref={musicNoteRef}></MusicNote>
    </SongList>
  );

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      unmountOnExit
      appear={true}
      onExited={props.history.goBack}
    >
      <Container playCount={playCount}>
        <Header title="返回" handleClick={handleBack} ref={HeaderEl}></Header>
        {enterLoading ? <Loading></Loading> : null}
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                  <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={currentAlbum.coverImgUrl} />
                  <div className="play_count">
                    <i className="fa fa-play"></i>
                    <span className="count">
                      {Math.floor(currentAlbum.subscribedCount / 1000)} T
                    </span>
                  </div>
                </div>
              </TopDesc>
              {renderMenu()}
              {renderSongList()}
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
