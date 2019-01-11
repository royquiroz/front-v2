import React, { Component } from "react";
import { message } from "antd";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Modals from "./Modal";
import Avatar from "./Avatar";
import logo from "../../logo_min.svg";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      activeItem: "",
      selectButton: "",
      open: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem("user"))
      this.setState({ user: JSON.parse(localStorage.getItem("user")) });
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
    const { user, selectButton, open } = this.state;

    return (
      <div>
        <Menu size="large" borderless fixed="top">
          <Menu.Item as={Link} to={"/"}>
            <img src={logo} alt="logo_min" />
          </Menu.Item>
          {/*<Menu.Item as={Link} name="home" to={"/"} />*/}

          {localStorage.getItem("token") ? (
            <Menu.Menu position="right">
              {user.role === "LESSOR" ? (
                <Menu.Item as={Link} name="Registra tu espacio" to={"/place"} />
              ) : null}
              <Avatar signup={this.signup} />{" "}
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  name="Iniciar Sesión"
                  content="Iniciar Sesión"
                  size="tiny"
                  onClick={this.handleModal}
                  basic
                />
              </Menu.Item>
              <Menu.Item>
                <Button
                  name="Registrarse"
                  content="Registrarse"
                  size="tiny"
                  onClick={this.handleModal}
                  basic
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
