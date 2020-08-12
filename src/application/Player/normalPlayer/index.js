import React, { useRef } from "react";
import { getName, formatPlayTime } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
} from "./style";
import { usePlayer } from "../store/model";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import ProgressBar from "../../../baseUI/ProgressBar";

const NormalPlayer = (props) => {
  const {
    playing,
    song,
    currentTime,
    duration,
    percent,
    clickPlay,
    onProgressChange,
    handlePrev,
    handleNext,
  } = props;

  const { fullScreen, toggleFullScreen, toggleShowPlayList } = usePlayer();

  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  return (
    <CSSTransition
      in={fullScreen}
      classNames="normal"
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExited={() => {
        normalPlayerRef.current.style.display = "none";
      }}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div
            className="back"
            onClick={() => {
              toggleFullScreen(false);
            }}
          >
            <i className="fa fa-arrow-down"></i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? "" : "pause"}`}
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              ></ProgressBar>
            </div>
            <span className="time time-r">{formatPlayTime(duration)}</span>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i className="fas fa-sync-alt" aria-hidden="true"></i>
            </div>
            <div className="icon i-left">
              <i className="fas fa-step-backward" onClick={handlePrev}></i>
            </div>
            <div className="icon i-center">
              {playing ? (
                <i
                  className="fas fa-pause-circle"
                  onClick={(e) => clickPlay(e, false)}
                ></i>
              ) : (
                <i
                  className="fas fa-play-circle"
                  onClick={(e) => clickPlay(e, true)}
                ></i>
              )}
            </div>
            <div className="icon i-right">
              <i className="fas fa-step-forward" onClick={handleNext}></i>
            </div>
            <div
              className="icon i-right"
              onClick={() => {
                toggleShowPlayList(true);
              }}
            >
              <i className="fa fa-music"></i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
