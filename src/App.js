import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Router from "./Router";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router />
      </div>
    );
  }
}

export default App;
