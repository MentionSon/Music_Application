import React, { useRef } from "react";
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";
import { CSSTransition } from "react-transition-group";
import { usePlayer } from "../store/model";
import ProgressCircle from "../../../baseUI/ProgressCircle";

const MiniPlayer = (props) => {
  const { song } = props;

  const { fullScreen, toggleFullScreen } = usePlayer();

  const miniPlayerRef = useRef();

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => {
          toggleFullScreen(true);
        }}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              className="play"
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={0.2}>
            <i className="fa fa-pause icon-mini"></i>
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="fa fa-music"></i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
};

export default React.memo(MiniPlayer);
