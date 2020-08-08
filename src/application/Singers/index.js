import React, { useState } from "react";
import Horizon from "../../baseUI/HorizonItem";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, ListItem, List } from "./style";
import Scroll from "../../baseUI/Scroll";
import { useHotSingerList } from "./store/model";
import { useSelector } from "react-redux";

const renderSingerList = (singerList) => {
  // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
  //   return {
  //     picUrl:
  //       "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
  //     name: "Roll",
  //     accountId: 277313426,
  //   };
  // });

  return (
    <List>
      {singerList.map((item, index) => (
        <ListItem key={`${item.accountId}-${index}`}>
          <div className="img_wrapper">
            <img
              src={`${item.picUrl}?param=300x300`}
              width="100%"
              height="100%"
              alt="music"
            />
          </div>
          <span className="name">{item.name}</span>
        </ListItem>
      ))}
    </List>
  );
};

const Singer = () => {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");

  const handleUpdateCategory = (val) => {
    setCategory(val);
  };

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
  };

  // const pullUpLoding = useSelector((state) =>
  //   state.getIn(["singers", "pullUpLoading"])
  // );

  const {
    singerList,
    pullUpLoading,
    pullUpRefreshDispatch,
  } = useHotSingerList();

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={"Category(Default Hot):"}
          oldVal={category}
          handleClick={(val) => handleUpdateCategory(val)}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={"First Letter"}
          oldVal={alpha}
          handleClick={(val) => handleUpdateAlpha(val)}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll pullUpLoading={pullUpLoading} pullUp={pullUpRefreshDispatch}>
          {renderSingerList(singerList)}
        </Scroll>
      </ListContainer>
    </div>
  );
};

export default React.memo(Singer);
