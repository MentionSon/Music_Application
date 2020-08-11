import React from "react";
import { getName } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from "./style";

const NormalPlayer = (props) => {
  const { song } = props;

  return (
    <NormalPlayerContainer>
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
        <div className="back">
          <i className="fa fa-arrow-down"></i>
        </div>
        <h1 className="title">{song.name}</h1>
        <h1 className="subtitle">{getName(song.ar)}</h1>
      </Top>
      <Middle>
        <CDWrapper>
          <div className="cd">
            <img
              className="image play"
              src={song.al.picUrl + "?param=400x400"}
              alt=""
            />
          </div>
        </CDWrapper>
      </Middle>
      <Bottom className="bottom">
        <Operators>
          <div className="icon i-left">
            <i class="fas fa-sync-alt" aria-hidden="true"></i>
          </div>
          <div className="icon i-left">
            <i className="fas fa-step-forward"></i>
          </div>
          <div className="icon i-center">
            <i className="fas fa-play-circle"></i>
          </div>
          <div className="icon i-right">
            <i className="fas fa-step-backward"></i>
          </div>
          <div className="icon i-right">
            <i className="fas fa-music"></i>
          </div>
        </Operators>
      </Bottom>
    </NormalPlayerContainer>
  );
};

export default React.memo(NormalPlayer);
