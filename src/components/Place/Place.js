import React, { Component } from "react";
import { DatePicker, Carousel } from "antd";
import {
  Button,
  Image,
  Divider,
  Header,
  Icon,
  Container,
  Segment,
  Label,
  Grid
} from "semantic-ui-react";
import { place } from "../../service";
import Loading from "../Loading/Loading";
import Map from "../Map/Map";
import Reviews from "./Reviews";

const { RangePicker } = DatePicker;

class Place extends Component {
  constructor() {
    super();
    this.state = {
      place: {},
      user: {},
      loading: true
    };
  }

  componentWillMount() {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ user: user });
    }
    place(this.props.match.params.id).then(res => {
      this.setState({ place: res.place, loading: false });
    });
  }

  render() {
    let { place, loading, user } = this.state;
    console.log(place);

    return (
      <div>
        <Loading loading={loading} />
        {!loading ? (
          <div>
            <Carousel effect="fade" autoplay autoplaySpeed="300">
              {place.photos.map((photo, i) => (
                <Image size="mini" key={i} src={photo} />
              ))}
            </Carousel>
            <Container style={{ paddingTop: "15px" }}>
              <Segment basic>
                <Grid columns={2}>
                  <Grid.Column>
                    <Header as="h3" style={{ display: "inline" }}>
                      {place.name}
                    </Header>
                    <Header
                      as="h4"
                      style={{ marginLeft: "250px", display: "inline" }}
                    >
                      ${place.price} por dia/noche
                    </Header>
                    <Header
                      as="h5"
                      style={{ color: "#bdbdbd", marginTop: "0" }}
                    >
                      Distrito Federal
                    </Header>
                    <Label color="teal" tag style={{ marginTop: "25px" }}>
                      {place.type}
                    </Label>{" "}
                    <Label color="brown" tag style={{ marginTop: "25px" }}>
                      {place.size}
                    </Label>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Image
                      size="mini"
                      rounded
                      floated="right"
                      verticalAlign="middle"
                      src={place.lessor.profile_pic}
                    />
                    <Header
                      as="h4"
                      style={{ marginTop: "1.5%", color: "#bdbdbd" }}
                    >
                      {place.lessor.name} {place.lessor.last_name}
                    </Header>
                    {user._id !== place.lessor._id ? (
                      <Segment textAlign="left" style={{ marginTop: "25px" }}>
                        <RangePicker placeholder={["Llegada", "Salida"]} />
                        <Button
                          size="small"
                          color="google plus"
                          style={{ marginLeft: "25px" }}
                        >
                          <Icon name="travel" /> Reservar
                        </Button>
                      </Segment>
                    ) : null}
                  </Grid.Column>
                </Grid>
                <Divider vertical hidden />
              </Segment>
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="tag" />
                  Descripción
                </Header>
              </Divider>
              <p>{place.description}</p>
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="map" />
                  Ubicación
                </Header>
              </Divider>
              <Map name={place.name} />
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="comments" />
                  Comentarios
                </Header>
              </Divider>
              {user._id !== place.lessor._id ? <Reviews /> : null}
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Place;
