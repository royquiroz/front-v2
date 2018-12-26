import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { place } from "../../service";
import CardPlace from "./CardPlace";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
  }

  componentWillMount() {
    place().then(res => {
      console.log(res);

      this.setState({ places: res });
    });
  }

  render() {
    const { places } = this.state;
    return (
      <Container fluid style={{ padding: "2%" }}>
        <h1>Hola Home</h1>
        <Card.Group>
          {places.map((place, i) => (
            <CardPlace key={i} place={place} />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default Home;
