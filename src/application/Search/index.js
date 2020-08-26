import React, { useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  ShortcutWrapper,
  HotKey,
  List,
  ListItem,
  SongItem,
} from "./style";
import SearchBox from "../../baseUI/SearchBox";
import Scroll from "../../baseUI/Scroll";
import { useSearch } from "./store/model";
import Loading from "../../baseUI/Loading";
import { getName } from "../../api/utils";

const Search = (props) => {
  const [show, setShow] = useState(true);

  const [query, setQuery] = useState("");

  const {
    enterLoading,
    hotList,
    suggestList,
    songsList,
    setHotKeyWords,
    setSuggestList,
  } = useSearch();

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = useCallback((q) => {
    setQuery(q);
    if (!q) {
      return;
    }
    setSuggestList(q);
  }, []);

  console.log(songsList);

  const renderHotKey = () => {
    return (
      <ul>
        {hotList &&
          hotList.map((item) => (
            <li
              className="item"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          ))}
      </ul>
    );
  };

  const renderSingers = () => {
    const singers = suggestList.artists;
    if (!singers || !singers.length) {
      return;
    }
    return (
      <List>
        <h1 className="title">Relation Singer</h1>
        {singers.map((item, index) => (
          <ListItem
            key={`${item.accoutId} ${index}`}
            onClick={() => props.history.push(`/singers/${item.id}`)}
          >
            <div className="img_wrapper">
              <img src={item.picUrl} width="100%" height="100%" alt="music" />
            </div>
            <span className="name">Singer: {item.name}</span>
          </ListItem>
        ))}
      </List>
    );
  };

  const renderAlbum = () => {
    const albums = suggestList.albums;
    if (!albums || !albums.length) {
      return;
    }
    return (
      <List>
        <h1 className="title">Related Albums</h1>
        {albums.map((item, index) => (
          <ListItem
            key={item.accoutId + " " + index}
            onClick={() => props.history.push(`/album/${item.id}`)}
          >
            <div className="img_wrapper">
              <img
                src={item.artist.picUrl}
                width="100%"
                height="100%"
                alt="music"
              />
            </div>
            <span className="name">Album: {item.name}</span>
          </ListItem>
        ))}
      </List>
    );
  };

  const renderSongs = () => {
    return (
      <SongItem style={{ paddingLeft: "20px" }}>
        {songsList.map((item) => (
          <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
            <div className="info">
              <span>{item.name}</span>
              <span>
                {getName(item.artists)} - {item.album.name}
              </span>
            </div>
          </li>
        ))}
      </SongItem>
    );
  };

  const selectItem = (e, id) => {};

  useEffect(() => {
    if (!hotList.length) {
      setHotKeyWords();
    }
  }, []);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="fly"
      unmountOnExit
      appear={true}
      onExited={props.history.goBack}
    >
      <Container>
        <div className="search_box_wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}
          ></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <HotKey>
              <h1 className="title">Hot Search</h1>
              {renderHotKey()}
            </HotKey>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Search);
