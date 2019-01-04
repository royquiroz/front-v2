import React, { Component } from "react";
import { message, Badge } from "antd";
import { Container, Form, Button, Label, Icon } from "semantic-ui-react";
import { newPlace } from "../../service";

class Place extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      optionSize: [
        { value: "SMALL", text: "Pequeño" },
        { value: "MEDIUM", text: "Mediano" },
        { value: "BIG", text: "Grande" }
      ],
      optionType: [
        { value: "STORAGE", text: "Almacenamiento" },
        { value: "ACOOMMODATION", text: "Alojamiento" }
      ],
      form: {},
      countImages: 0
    };
  }

  componentWillMount() {
    const { form } = this.state;
    let user = JSON.parse(localStorage.getItem("user"));

    form.lessee = user._id;
    console.log(form);
    this.setState({ user: user });
  }

  handleDropdownChange = (e, { value, name }) => {
    const { form } = this.state;
    form[name] = value;
    console.log(form);

    this.setState({ form });
  };

  handleChange = e => {
    const { form } = this.state;
    let field = e.target.name;
    form[field] = e.target.value;
    console.log(form);

    this.setState({ form });
  };

  handleSelectedFile = e => {
    const { form } = this.state;
    form.photos = e.target.files;
    console.log(form, form.photos.length);

    this.setState({ form, countImages: form.photos.length });
  };

  handleSubmit = e => {
    e.preventDefault();

    newPlace(this.state.form).then(res => {
      message.success(res.msg);
    });
  };

  render() {
    let { optionType, optionSize, countImages } = this.state;
    return (
      <Container style={{ padding: "5% 2% 0 2%" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Nombre"
              name="name"
              placeholder="Nombre"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Preció"
              icon="dollar sign"
              iconPosition="left"
              name="price"
              type="number"
              placeholder="0.00"
              onChange={this.handleChange}
            />
            <Form.Select
              label="Tipo"
              placeholder="Tipo de espació"
              name="type"
              options={optionType}
              onChange={this.handleDropdownChange}
            />
            <Form.Select
              label="Tamaño"
              placeholder="Tamaño del lugar"
              name="size"
              options={optionSize}
              onChange={this.handleDropdownChange}
            />
          </Form.Group>
          <Form.TextArea
            label="Acerca de tu espacio"
            name="description"
            placeholder="Describe tu propiedad"
            onChange={this.handleChange}
          />
          <Button type="submit" primary>
            Guardar
          </Button>
          <Badge count={countImages}>
            <Label
              as="label"
              basic
              color="green"
              size="large"
              htmlFor="upload"
              style={{ cursor: "pointer" }}
            >
              <Icon name="upload" /> Fotos
              <input
                hidden
                id="upload"
                name="photos"
                type="file"
                multiple
                onChange={this.handleSelectedFile}
              />
            </Label>
          </Badge>
        </Form>
      </Container>
    );
  }
}

export default Place;
