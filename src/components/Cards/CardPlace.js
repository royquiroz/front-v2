import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { Card, Image } from "semantic-ui-react";

const CardPlace = ({ place }) => (
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
  </Card>
);

export default CardPlace;
