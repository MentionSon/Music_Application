import React from "react";
import { GlobalStyle } from "./style";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./router/index";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
