import React from "react";
import Slider from "../../components/Slider";
import RecommendList from "../../components/List";
import Scroll from "../../baseUI/Scroll";
import styled from "styled-components";
import { useRecommend } from "./store/model";
import { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/Loading";

const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`;

const Recommend = () => {
  const { bannerListJS, recommendListJS, enterLoading } = useRecommend();

  return (
    <Content>
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
    </Content>
  );
};

export default React.memo(Recommend);
