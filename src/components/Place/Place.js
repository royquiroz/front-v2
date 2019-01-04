import React, { Component } from "react";
import { Carousel, Rate } from "antd";
import {
  Comment,
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
import FormReviews from "./FormReviews";
import Review from "./Review";
import Rent from "./Rent";

class Place extends Component {
  constructor() {
    super();
    this.state = {
      place: {},
      user: {},
      average: "",
      loading: true
    };
  }

  componentWillMount() {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ user: user });
    }
    place(this.props.match.params.id).then(res => {
      let average = res.place.reviews.reduce((acc, review) => {
        return acc + review.raiting;
      }, 0);

      this.setState({ place: res.place, average: average, loading: false });
    });
  }

  render() {
    let { place, loading, user, average } = this.state;
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
                    <div>
                      <Rate value={average / place.reviews.length} disabled /> (
                      {place.reviews.length}{" "}
                      {place.reviews.length === 1
                        ? "calificacion"
                        : "calificaciones"}
                      )
                    </div>
                    <Label
                      color="teal"
                      tag
                      style={{ margin: "15px 10px 0px 10px" }}
                    >
                      {place.type}
                    </Label>{" "}
                    <Label
                      color="brown"
                      tag
                      style={{ margin: "15px 10px 0px 10px" }}
                    >
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
                    {user._id === place.lessor._id ||
                    user.role === "LESSOR" ||
                    Object.keys(user).length === 0 ? null : (
                      <Rent place={place} user={user} />
                    )}
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
              {user._id === place.lessor._id ||
              user.role === "LESSOR" ||
              Object.keys(user).length === 0 ? null : (
                <FormReviews user={user} place={place} />
              )}
              <Comment.Group size="large">
                {place.reviews.map((review, i) => (
                  <Review key={i} review={review} />
                ))}
              </Comment.Group>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Place;
