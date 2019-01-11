import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { places } from "../../service";
import CardPlace from "../Cards/CardPlace";
import Loading from "../Loading/Loading";
import logo from "../../logo.svg";

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
        <Loading loading={loading} />
        {!loading ? (
          <div>
            <img
              src={logo}
              alt="logo"
              style={{
                display: "block",
                position: "absolute",
                margin: "9% auto",
                width: "600px",
                left: "0",
                right: "0"
              }}
            />
            <img
              alt="home_image"
              src="https://res.cloudinary.com/royquiroz/image/upload/v1547178022/spacio/storage2.png"
              style={{ width: "100%", height: "750px" }}
            />
            <Container fluid style={{ padding: "5% 8%" }}>
              <Card.Group>
                {places.map((place, i) => (
                  <CardPlace key={i} place={place} />
                ))}
              </Card.Group>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Home;
