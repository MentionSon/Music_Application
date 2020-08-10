import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  ImgWrapper,
  CollectButton,
  BgLayer,
  SongListWrapper,
} from "./style";
import Header from "../../baseUI/Header";
import Scroll from "../../baseUI/Scroll";
import SongsList from "../../application/SongList";

const Singer = (props) => {
  const [showStatus, setShowStatus] = useState(true);

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  const initialHeight = useRef(0);

  const OFFSET = 5;

  const initStyle = () => {
    const h = imageWrapper.current.offsetHeight;
    console.log(h);
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  };

  const artist = {
    picUrl:
      "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑",
        },
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑",
        },
      },
      // 省略 20 条
    ],
  };

  useEffect(() => {
    initStyle();
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={"head"}></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="fa fa-plus" aria-hidden="true"></i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll}>
            <SongsList songs={artist.hotSongs} showCollect={false}></SongsList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Singer);
