import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { places } from "../../service";
import CardPlace from "./CardPlace";
import Loading from "../Loading/Loading";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      loading: true
    };
  }

  componentWillMount() {
    places().then(res => {
      this.setState({ places: res, loading: false });
    });
  }

  render() {
    const { places, loading } = this.state;
    return (
      <Container fluid style={{ padding: "5% 2% 0 2%" }}>
        <Loading loading={loading} />
        {!loading ? (
          <div>
            <h1>Hola Home</h1>
            <Card.Group>
              {places.map((place, i) => (
                <CardPlace key={i} place={place} />
              ))}
            </Card.Group>
          </div>
        ) : null}
      </Container>
    );
  }
}

export default Home;
