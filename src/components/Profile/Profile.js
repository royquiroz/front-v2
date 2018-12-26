import React, { Component } from "react";
import { message } from "antd";
import { Container, Form, Button, Image } from "semantic-ui-react";
import { profile } from "../../service";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
  }

  handleChange = e => {
    const { user } = this.state;
    let field = e.target.name;
    user[field] = e.target.value;

    this.setState({ user });
  };

  handleSubmit = e => {
    e.preventDefault();
    profile(this.state.user).then(res => {
      message.success(res.msg);
    });
  };

  render() {
    let { user } = this.state;
    return (
      <Container style={{ paddingTop: "3%" }}>
        <Image size="medium" src={user.profile_pic} centered />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Nombre</label>
            <input
              name="name"
              placeholder="Nombre"
              defaultValue={user.name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Apellido</label>
            <input
              name="last_name"
              placeholder="Apellido"
              defaultValue={user.last_name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              defaultValue={user.email}
              disabled
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.TextArea
            label="Acerca de ti"
            name="description"
            placeholder="Escribe un poco sobre ti"
            defaultValue={user.description}
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default Profile;
