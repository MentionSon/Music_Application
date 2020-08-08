import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Scroll from "../Scroll";
import { PropTypes } from "prop-types";
import style from "../../assets/global-style";

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`;
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`;

const Horizon = (props) => {
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  const Category = useRef(null);

  useEffect(() => {
    const CategoryDom = Category.current;
    const tagElms = CategoryDom.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElms).forEach((tag) => {
      totalWidth += tag.offsetWidth;
    });
    CategoryDom.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction="horizontal">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {list.map((item) => (
            <ListItem
              className={`${oldVal === item.key ? "selected" : ""}`}
              key={item.key}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </div>
    </Scroll>
  );
};

Horizon.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: null,
};

Horizon.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Horizon;
