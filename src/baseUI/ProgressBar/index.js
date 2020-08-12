import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import style from "../../assets/global-style";

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
      }
    }
  }
`;

const ProgressBar = (props) => {
  const { percent, percentChange } = props;

  const progressBar = useRef();
  const progress = useRef();
  const progressBtn = useRef();
  const [touch, setTouch] = useState({});

  const progressBtnWidth = 16;

  const setProgressOffset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3D(${offsetWidth}px, 0, 0)`;
  };

  const progressTouchStart = (e) => {
    const startTouch = {};
    startTouch.initialed = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e) => {
    if (!touch.initialed) {
      return;
    }
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offset = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    setProgressOffset(offset);
    changePercent();
  };

  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initialed = false;
    setTouch(endTouch);
  };

  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect();
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offset = Math.min(e.pageX - rect.left, barWidth);
    setProgressOffset(offset);
    changePercent();
  };

  const changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth;
    percentChange(curPercent);
  };

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[
        "transform"
      ] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
};

export default React.memo(ProgressBar);
