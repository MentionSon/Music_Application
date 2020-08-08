import React, {
  forwardRef,
  useState,
  useMemo,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import BetterScroll from "better-scroll";
import styled from "styled-components";
import { debounce } from "../../api/utils";
import Loading from "../Loading";
import Loading2 from "../LoadingV2";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
  const [betterScroll, setBetterScroll] = useState(null);

  const scrollContainerRef = useRef();

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props;

  const { pullUp, pullDown, onScroll } = props;

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500);
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BetterScroll(scrollContainerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBetterScroll(scroll);
    return () => {
      setBetterScroll(null);
    };
  }, []);

  useEffect(() => {
    console.log(pullUpLoading);
  }, [pullUpLoading]);

  useEffect(() => {
    if (!betterScroll || !onScroll) {
      return;
    }
    betterScroll.on("scroll", onScroll);
    return () => {
      betterScroll.off("scroll", onScroll);
    };
  }, [onScroll, betterScroll]);

  useEffect(() => {
    if (!betterScroll || !pullUp) {
      return;
    }
    const handlePullUp = () => {
      if (betterScroll.y < betterScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    betterScroll.on("scrollEnd", handlePullUp);
    return () => {
      betterScroll.off("scrollEnd", handlePullUp);
    };
  }, [betterScroll, pullUpDebounce, pullUp]);

  useEffect(() => {
    if (!betterScroll || !pullDown) {
      return;
    }
    const HandlePullDown = (pos) => {
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    betterScroll.on("touchEnd", HandlePullDown);
    return () => {
      betterScroll.off("touchEnd", HandlePullDown);
    };
  }, [betterScroll, pullDownDebounce, pullDown]);

  useEffect(() => {
    if (refresh && betterScroll) {
      betterScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (betterScroll) {
        betterScroll.refresh();
        betterScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (betterScroll) {
        return betterScroll;
      }
    },
  }));

  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <Loading2></Loading2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向下吸顶
};

export default Scroll;
