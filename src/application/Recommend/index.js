import React from "react";
import Slider from "../../components/Slider";
import RecommendList from "../../components/List";
import Scroll from "../../baseUI/Scroll";
import styled from "styled-components";
import { useRecommend } from "./store/model";
import { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/Loading";
import { renderRoutes } from "react-router-config";
import { usePlayer } from "../Player/store/model";

const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.playCount > 0 ? "60px" : "0px")};
  width: 100%;
`;

const Recommend = (props) => {
  const { bannerListJS, recommendListJS, enterLoading } = useRecommend();

  const { playCount } = usePlayer();

  return (
    <Content playCount={playCount}>
      {enterLoading ? (
        <Loading></Loading>
      ) : (
        <Scroll onScroll={forceCheck}>
          <div>
            <Slider bannerList={bannerListJS}></Slider>
            <RecommendList recommendList={recommendListJS}></RecommendList>
          </div>
        </Scroll>
      )}
      {renderRoutes(props.route.routes)}
    </Content>
  );
};

export default React.memo(Recommend);
