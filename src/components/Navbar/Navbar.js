import React, { Component } from "react";
import { message } from "antd";
import { Menu, Button } from "semantic-ui-react";
import Modals from "./Modal";
import Avatar from "./Avatar";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "home",
      selectButton: "",
      open: false
    };
  }

  signup = e => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("Cerraste Sesión exitosamente");
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleModal = (e, { name }) =>
    this.setState({ open: !this.state.open, selectButton: name });

  closeModal = () => this.setState({ open: false });

  render() {
    const { activeItem, selectButton, open } = this.state;

    return (
      <div>
        <Menu size="large" inverted borderless stackable>
          <Menu.Item>
            <img src="../../logo.svg" alt="logo" />
          </Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />

          {localStorage.getItem("token") ? (
            <Menu.Menu position="right">
              {" "}
              <Avatar signup={this.signup} />{" "}
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  name="Iniciar Sesión"
                  content="Iniciar Sesión"
                  size="tiny"
                  color="green"
                  onClick={this.handleModal}
                />
              </Menu.Item>
              <Menu.Item>
                <Button
                  name="Registrarse"
                  content="Registrarse"
                  size="tiny"
                  color="grey"
                  onClick={this.handleModal}
                />
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
        <Modals
          open={open}
          button={selectButton}
          handleModal={this.handleModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default Navbar;
