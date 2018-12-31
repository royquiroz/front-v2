import React, { Component } from "react";
import { message } from "antd";
import { Button, Form, Input } from "semantic-ui-react";
import { register, login } from "../../service";

class FormAuth extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }

  handleChange = e => {
    const { user } = this.state;
    let field = e.target.name;
    user[field] = e.target.value;

    this.setState({ user });
  };

  handleRegister = e => {
    e.preventDefault();
    register(this.state.user).then(res => {
      if (!res.error) {
        message.success(res.msg);
        this.props.closeModal();
      } else {
        message.error(res.msg);
      }
    });
  };

  handleLogin = e => {
    e.preventDefault();
    login(this.state.user).then(res => {
      if (!res.error) {
        message.success(res.msg);
        this.props.closeModal();
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      } else {
        message.error(res.msg);
      }
    });
  };

  render() {
    const { type } = this.props;
    return (
      <Form
        onSubmit={
          type === "Registrarse" ? this.handleRegister : this.handleLogin
        }
      >
        {type === "Registrarse" ? (
          <Form.Field>
            <Input
              name="name"
              icon="user"
              iconPosition="left"
              type="text"
              placeholder="Nombre"
              onChange={this.handleChange}
            />
          </Form.Field>
        ) : null}
        {type === "Registrarse" ? (
          <Form.Field>
            <Input
              name="last_name"
              icon="user"
              iconPosition="left"
              type="text"
              placeholder="Apellido"
              onChange={this.handleChange}
            />
          </Form.Field>
        ) : null}
        <Form.Field>
          <Input
            name="email"
            icon="mail"
            iconPosition="left"
            type="text"
            placeholder="Email"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            name="password"
            icon="lock"
            iconPosition="left"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Field>
        {type === "Registrarse" ? (
          <Form.Field>
            <Input
              name="confirmPassword"
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Confirmar Password"
              onChange={this.handleChange}
            />
          </Form.Field>
        ) : null}
        <Button color="blue" type="submit">
          {type}
        </Button>
      </Form>
    );
  }
}

export default FormAuth;
