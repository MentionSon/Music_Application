import React, { useRef, useCallback, useState } from "react";
import {
  PlayListWrapper,
  ScrollWrapper,
  ListContent,
  ListHeader,
} from "./style";
import { CSSTransition } from "react-transition-group";
import Scroll from "../../../baseUI/Scroll";
import { getName } from "../../../api/utils";
import { usePlayer } from "../store/model";

const PlayList = () => {
  const [isShow, setIsShow] = useState(false);

  const {
    currentSong,
    playList,
    currentIndex,
    showPlayList,
    toggleShowPlayList,
    changeCurrentPlayListIndex,
  } = usePlayer();

  const playListRef = useRef();
  const listWrapperRef = useRef();

  const onEnter = useCallback(() => {
    setIsShow(true);
    listWrapperRef.current.style["transform"] = `translate3d(0, 100%, 0)`;
  }, []);

  const onEntering = useCallback(() => {
    // 让列表展现
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style["transform"] = `translate3d(0, 0, 0)`;
  }, []);

  const onExiting = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
  }, []);

  const onExited = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
  }, []);

  const getCurrentIcon = (item) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? "fa fa-music" : "";
    return <i className={`current ${className}`}></i>;
  };

  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return;
    changeCurrentPlayListIndex(index);
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      mountOnEnter
      onEnter={onEnter}
      onEntering={onEntering}
      onExiting={onExiting}
      onExited={onExited}
    >
      <PlayListWrapper
        ref={playListRef}
        onClick={() => toggleShowPlayList(false)}
        style={isShow === true ? { display: "block" } : { display: "none" }}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
        >
          <ScrollWrapper>
            <Scroll>
              <ListContent>
                {playList.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => {
                        handleChangeCurrentIndex(index);
                      }}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">
                        <i className="fa fa-heart"></i>
                      </span>
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  );
};

export default React.memo(PlayList);
