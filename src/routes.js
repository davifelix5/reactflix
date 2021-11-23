import React from 'react'
import Home from "./pages/Home";
import RegisterVideo from "./pages/RegisterVideo";
import RegisterCategory from "./pages/RegisterCategory";
import ManageVideos from './pages/ManageVideos';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import { Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/cadastro/video/:videoId?" component={RegisterVideo} />
      <Route path="/cadastro/categoria/:categoryId?" component={RegisterCategory} />
      <Route path="/category/:categoryId" component={ManageVideos} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/sign-up" component={SignUp} />
      <Route component={() => <h1>404: Página não encontrada</h1>} />
    </Switch>
  )
}