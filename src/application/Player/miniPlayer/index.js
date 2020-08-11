import React from "react";
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";

const MiniPlayer = (props) => {
  const { song } = props;

  return (
    <MiniPlayerContainer>
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
        <i className="fa fa-pause"></i>
      </div>
      <div className="control">
        <i className="fa fa-music"></i>
      </div>
    </MiniPlayerContainer>
  );
};

export default React.memo(MiniPlayer);
