import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import NewPlace from "./components/Place/NewPlace";
import Place from "./components/Place/Place";
import Places from "./components/Profile/Places";
import Favorites from "./components/Profile/Favorites";
import Mailbox from "./components/Mailbox/Mailbox";

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
    <Route
      exact
      path="/favorites"
      render={props =>
        role === "CLIENT" ? <Favorites {...props} /> : <Redirect to="/" />
      }
    />
    <Route exact path="/messages" component={Mailbox} />
  </Switch>
);

export default Router;
