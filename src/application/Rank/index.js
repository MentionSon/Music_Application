import React from "react";
import { useRank } from "./store/model";
import { filterIndex } from "../../api/utils";
import { Container, List, ListItem, SongList } from "./style";
import { EnterLoading } from "../Singers/style";
import Scroll from "../../baseUI/Scroll";
import Loading from "../../baseUI/Loading";
import { renderRoutes } from "react-router-config";

const Rank = (props) => {
  const { rankList, loading } = useRank();

  const globalStartIndex = filterIndex(rankList);

  const officialList = rankList.slice(0, globalStartIndex);

  const globalList = rankList.slice(globalStartIndex);

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`);
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem
              key={`${item.coverImgId}${index}`}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            Official Rank
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            Global Rank
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
};

export default React.memo(Rank);
