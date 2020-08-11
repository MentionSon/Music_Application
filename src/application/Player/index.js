import React, { useRef } from "react";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import { usePlayer } from "./store/model";

const Player = (props) => {
  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };

  const { fullScreen, toggleFullScreen } = usePlayer();

  return (
    <div>
      <NormalPlayer song={currentSong}></NormalPlayer>
      <MiniPlayer song={currentSong}></MiniPlayer>
    </div>
  );
};

export default React.memo(Player);
