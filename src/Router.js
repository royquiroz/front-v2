import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import NewPlace from "./components/Place/NewPlace";
import Place from "./components/Place/Place";
import Places from "./components/Profile/Places";

const Router = ({ role }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route
      exact
      path="/place"
      render={props =>
        role === "LESSOR" ? <NewPlace {...props} /> : <Redirect to="/" />
      }
    />
    <Route exact path="/place/:id" render={props => <Place {...props} />} />
    <Route
      exact
      path="/places"
      render={props =>
        role === "LESSOR" ? <Places {...props} /> : <Redirect to="/" />
      }
    />
  </Switch>
);

export default Router;
