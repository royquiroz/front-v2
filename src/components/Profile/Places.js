import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { places } from "../../service";
import CardPlace from "../Cards/CardPlace";
import Loading from "../Loading/Loading";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      places: [],
      loading: true
    };
  }

  componentWillMount() {
    places().then(res => {
      console.log(res);
      const places = res.filter(p => p.lessor === this.state.user._id);
      this.setState({ places: places, loading: false });
    });
  }

  render() {
    const { places, loading } = this.state;

    return (
      <Container fluid style={{ padding: "5% 2% 0 2%" }}>
        <Loading loading={loading} />
        {!loading ? (
          <div>
            <h1>Mis Espacios</h1>
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
