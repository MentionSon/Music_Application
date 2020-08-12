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
  const [presetSong, setPresetSong] = useState({});

  const audioRef = useRef();

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const {
    playing,
    currentSong,
    currentIndex,
    playList,
    togglePlaying,
    changeCurrentSongData,
    changeCurrentPlayListIndex,
  } = usePlayer();

  const initAudioPlay = async () => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === presetSong.id
    ) {
      return;
    }
    let current = playList[currentIndex];
    changeCurrentSongData(current);
    setPresetSong(current);
    audioRef.current.src = await getSongUrl(current.id);
    audioRef.current.autoplay = true;
    // setTimeout(() => {
    audioRef.current.play();
    // }, 100);
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

  // 一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    togglePlaying(true);
    audioRef.current.play();
  };

  const handlePrev = () => {
    console.log(currentIndex);
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) {
      index = playList.length - 1;
    }
    changeCurrentPlayListIndex(index);
    if (!playing) {
      togglePlaying(true);
    }
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) {
      index = 0;
    }
    changeCurrentPlayListIndex(index);
    if (!playing) {
      togglePlaying(true);
    }
  };
  useEffect(() => {
    initAudioPlay();
  }, [playList, currentIndex]);

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
          currentTime={currentTime}
          duration={duration}
          handlePrev={handlePrev}
          handleNext={handleNext}
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
