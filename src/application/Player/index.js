import React, { useRef, useState, useEffect } from "react";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import { usePlayer } from "./store/model";
import { isEmptyObject, getSongUrl } from "../../api/utils";

const Player = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlayingLyric, setCurrentPlayingLyric] = useState("");
  const [modeText, setModeText] = useState("");

  const audioRef = useRef();

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const {
    playing,
    currentSong,
    togglePlaying,
    changeCurrentPlayIndex,
    changeCurrentSongData,
  } = usePlayer();

  const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050,
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ];

  const initAudioPlay = () => {
    if (!currentSong) {
      return;
    }
    changeCurrentPlayIndex(0);
    const current = playList[0];
    changeCurrentSongData(current);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    togglePlaying(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
  };

  const togglePlayingState = (e, data) => {
    e.stopPropagation();
    togglePlaying(data);
  };

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlaying(true);
    }
  };

  useEffect(() => {
    initAudioPlay();
  }, []);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  return (
    <div>
      {!isEmptyObject(currentSong) ? (
        <NormalPlayer
          playing={playing}
          song={currentSong}
          percent={percent}
          clickPlay={togglePlayingState}
          onProgressChange={onProgressChange}
        ></NormalPlayer>
      ) : null}
      {!isEmptyObject(currentSong) ? (
        <MiniPlayer
          playing={playing}
          song={currentSong}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          clickPlay={togglePlayingState}
        ></MiniPlayer>
      ) : null}
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </div>
  );
};

export default React.memo(Player);
