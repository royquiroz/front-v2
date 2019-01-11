import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { watchProfile } from "../../service";
import CardPlace from "../Cards/CardPlace";
import Loading from "../Loading/Loading";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      favorites: [],
      loading: true
    };
  }

  componentWillMount() {
    watchProfile(this.state.user._id).then(res => {
      this.setState({ favorites: res.favorites, loading: false });
    });
  }

  render() {
    const { favorites, loading } = this.state;

    return (
      <Container fluid style={{ padding: "5% 2% 0 2%" }}>
        <Loading loading={loading} />
        {!loading ? (
          <div>
            <h1>Mis Favoritos</h1>
            <Card.Group>
              {favorites.map((place, i) => (
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
