import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Router from "./Router";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    if (localStorage.getItem("user"))
      this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Router role={this.state.user.role} />
      </div>
    );
  }
}

export default App;
