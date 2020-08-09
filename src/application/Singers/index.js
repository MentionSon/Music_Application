import React, { useState } from "react";
import Horizon from "../../baseUI/HorizonItem";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, ListItem, List } from "./style";
import Scroll from "../../baseUI/Scroll";
import { useHotSingerList } from "./store/model";

const renderSingerList = (singerList) => {
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
  const [hot, setHot] = useState("hotSingers");
  const [category, setCategory] = useState({
    type: "",
    area: "-1",
  });
  const [alpha, setAlpha] = useState("");

  const handleUpdateCategory = (val) => {
    if (hot) {
      setHot(false);
    }
    changePage(0);
    setCategory(val);
  };

  const handleUpdateAlpha = (val) => {
    if (hot) {
      setHot(false);
    }
    changePage(0);
    setAlpha(val);
  };

  // const pullUpLoding = useSelector((state) =>
  //   state.getIn(["singers", "pullUpLoading"])
  // );

  const {
    singerList,
    pullUpLoading,
    pullDownLoading,
    changePage,
    pullUpRefreshDispatch,
    pullDownRefreshDishpatch,
  } = useHotSingerList(hot, category, alpha);

  return (
    <div>
      <NavContainer>
        <Horizon
          horizonType={"area"}
          list={categoryTypes}
          title={"Category(Default Hot):"}
          oldVal={category}
          handleClick={(val) => handleUpdateCategory(val)}
        ></Horizon>
        <Horizon
          horizonType={"alpha"}
          list={alphaTypes}
          title={"First Letter"}
          oldVal={alpha}
          handleClick={(val) => handleUpdateAlpha(val)}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUpLoading={pullUpLoading}
          pullUp={pullUpRefreshDispatch}
          pullDownLoading={pullDownLoading}
          pullDown={pullDownRefreshDishpatch}
        >
          {renderSingerList(singerList)}
        </Scroll>
      </ListContainer>
    </div>
  );
};

export default React.memo(Singer);
