import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Front from "../pages/Front";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Myhabits from "../pages/Myhabits";

const Redirect = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Front}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/search" component={Search}></Route>
        <Route exact path="/myhabits" component={Myhabits}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Redirect;
