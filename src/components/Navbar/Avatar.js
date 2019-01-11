import React, { Component } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class userAvatar extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    const menu = (
      <Menu>
        <Menu.Item>
          <NavLink exact to="/profile">
            Perfil
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/messages">
            Mensajes
          </NavLink>
        </Menu.Item>
        {user.role === "LESSOR" ? (
          <Menu.Item>
            <NavLink exact to="/places">
              Mis Espacios
            </NavLink>
          </Menu.Item>
        ) : null}
        {user.role === "CLIENT" ? (
          <Menu.Item>
            <NavLink exact to="/favorites">
              Favoritos
            </NavLink>
          </Menu.Item>
        ) : null}
        <Menu.Item>
          <NavLink onClick={this.props.signup} exact to="/">
            Cerrar Sesión
          </NavLink>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ margin: "5px 50px 5px 10px" }}>
        <Dropdown overlay={menu}>
          {user === null ? null : (
            <Avatar
              src={user.profile_pic}
              size={48}
              style={{ cursor: "pointer" }}
            />
          )}
        </Dropdown>
      </Header>
    );
  }
}

export default userAvatar;
