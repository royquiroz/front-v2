import React from "react";
import { Header, Dropdown, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const trigger = (
  <Header as="h3" style={{ padding: "15px 40px 0 0" }}>
    <Image
      circular
      src="https://res.cloudinary.com/royquiroz/image/upload/v1541363947/Tfixeo/male.png"
    />
  </Header>
);

const Avatar = ({ signup }) => (
  <Dropdown trigger={trigger} pointing="top" icon={null}>
    <Dropdown.Menu>
      <Dropdown.Item as={NavLink} exact to={"/profile"} text="Perfil" />
      <Dropdown.Item
        as={NavLink}
        exact
        to={"/"}
        text="Cerrar Sesión"
        onClick={signup}
      />
    </Dropdown.Menu>
  </Dropdown>
);

export default Avatar;
