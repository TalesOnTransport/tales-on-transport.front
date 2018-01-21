import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import ScanContainer from "./ScanContainer";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/scan/:id" component={ScanContainer} />
    <Route path="/not-found" component={NotFound} />
  </Switch>
);

export default Main;
