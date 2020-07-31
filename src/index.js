import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import RegisterVideo from "./pages/RegisterVideo";
import RegisterCategory from "./pages/RegisterCategory";
import ManageVideos from './pages/ManageVideos';

import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/cadastro/video/:videoId?" component={RegisterVideo} />
      <Route path="/cadastro/categoria" component={RegisterCategory} />
      <Route path="/category/:categoryId" component={ManageVideos} />
      <Route component={() => <h1>404: Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
