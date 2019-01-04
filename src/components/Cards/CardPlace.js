import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Carousel, Rate } from "antd";
import { Card, Image } from "semantic-ui-react";

class CardPlace extends Component {
  constructor() {
    super();
    this.state = {
      average: ""
    };
  }

  componentWillMount() {
    const { place } = this.props;
    let average = place.reviews.reduce((acc, review) => {
      return acc + review.raiting;
    }, 0);
    this.setState({ average: average });
  }

  render() {
    const { place } = this.props;
    return (
      <Card as={Link} to={`/place/${place._id}`}>
        <Carousel effect="fade">
          {place.photos.map((photo, i) => (
            <Image size="mini" key={i} src={photo} />
          ))}
        </Carousel>
        <Card.Content>
          <Card.Header>{place.name}</Card.Header>
          <Card.Meta>
            <span className="date">{`$${place.price}`} /noche</span>
          </Card.Meta>
          <Card.Description>
            {place.description.length > 200
              ? `${place.description.substring(0, 200)}...`
              : place.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Rate value={this.state.average / place.reviews.length} disabled />(
          {place.reviews.length})
        </Card.Content>
      </Card>
    );
  }
}

export default CardPlace;
