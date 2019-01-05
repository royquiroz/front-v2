import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { places } from "../../service";
import CardPlace from "../Cards/CardPlace";
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
      <div>
        <img
          alt="home_image"
          src="https://res.cloudinary.com/royquiroz/image/upload/v1546672082/spacio/frank-mckenna-252014-unsplash.jpg"
          style={{ width: "100%", height: "750px" }}
        />

        <Container fluid style={{ padding: "5% 2% 0 2%" }}>
          <Loading loading={loading} />
          {!loading ? (
            <div>
              <Card.Group>
                {places.map((place, i) => (
                  <CardPlace key={i} place={place} />
                ))}
              </Card.Group>
            </div>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default Home;
