import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { SearchBoxWrapper } from "./style";
import { debounce } from "../../api/utils";

const SearchBox = (props) => {
  const queryRef = useRef();

  const [query, setQuery] = useState("");

  const { newQuery, handleQuery } = props;

  const displayStyle = query ? { display: "block" } : { display: "none" };

  const handleChange = useCallback((e) => {
    setQuery(e.currentTarget.value);
  }, []);

  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 0);
  }, [handleQuery]);

  const clearQuery = useCallback(() => {
    setQuery("");
  }, []);

  useEffect(() => {
    queryRef.current.focus();
  }, []);

  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);

  return (
    <SearchBoxWrapper>
      <i className="fa fa-arrow-left" onClick={props.back}></i>
      <input
        ref={queryRef}
        className="box"
        placeholder="search songs, singers or albums"
        value={query}
        onChange={handleChange}
      />
      <i className="fa fa-times" style={displayStyle} onClick={clearQuery}></i>
    </SearchBoxWrapper>
  );
};

export default React.memo(SearchBox);
