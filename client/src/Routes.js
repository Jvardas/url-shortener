import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";

const Routes = () =>(
<BrowserRouter>
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
</BrowserRouter>);
export default Routes;