import React from "react";
import { renderRoutes } from "react-router-config";
import { Top, Tab, TabItem } from "./style";
import { NavLink } from "react-router-dom";
import Player from "../Player";

function Home(props) {
  const { route } = props;

  const paths = [
    {
      path: "/recommend",
      title: "Recommend",
    },
    {
      path: "/singers",
      title: "Singers",
    },
    {
      path: "/rank",
      title: "Rank",
    },
  ];

  return (
    <div>
      <Top>
        <span>
          <i className="fa fa-bars"></i>
        </span>
        <span className="title"></span>
        <span>
          <i className="fa fa-search"></i>
        </span>
      </Top>
      <Tab>
        {paths.map((item) => (
          <NavLink to={item.path} activeClassName="selected" key={item.path}>
            <TabItem>
              <span>{item.title}</span>
            </TabItem>
          </NavLink>
        ))}
      </Tab>
      {renderRoutes(route.routes)}
      <Player></Player>
    </div>
  );
}

export default React.memo(Home);
