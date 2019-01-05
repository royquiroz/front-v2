import React, { Component } from "react";
import { message, Badge } from "antd";
import {
  Container,
  Placeholder,
  Form,
  Icon,
  Button,
  Image,
  Label
} from "semantic-ui-react";
import { profile } from "../../service";
import Loading from "../Loading/Loading";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
      show: false
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

  handleSelectedFile = e => {
    const { user } = this.state;
    user.profile_image = e.target.files[0];

    this.setState({ user, show: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.user);

    this.setState({ loading: true });
    profile(this.state.user).then(res => {
      message.success(res.msg);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    });
  };

  render() {
    let { user, loading, show } = this.state;
    return (
      <Container style={{ padding: "5% 2% 0 2%" }}>
        <Loading loading={loading} />
        {loading ? (
          <Placeholder style={{ margin: "25px auto" }}>
            <Placeholder.Image square />
          </Placeholder>
        ) : (
          <Image
            size="medium"
            src={user.profile_pic}
            rounded
            centered
            style={{ paddingBottom: "20px" }}
          />
        )}
        <Form onSubmit={this.handleSubmit}>
          <Container textAlign="center">
            <Badge dot={show}>
              <Label
                width="4"
                as="label"
                htmlFor="file"
                basic
                size="large"
                style={{ cursor: "pointer" }}
              >
                <Icon name="paperclip" />
                Imagen
              </Label>
              <input
                id="file"
                name="profile_pic"
                type="file"
                hidden
                onChange={this.handleSelectedFile}
              />
            </Badge>
          </Container>
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
          <Button type="submit" primary>
            Guardar
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Profile;
