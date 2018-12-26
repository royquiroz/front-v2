import React from "react";
import { Carousel } from "antd";
import { Card, Icon, Image } from "semantic-ui-react";

const CardPlace = ({ place }) => (
  <Card>
    <Carousel effect="fade">
      <Image
        size="mini"
        src="https://res.cloudinary.com/royquiroz/image/upload/v1545787539/spacio/eric-muhr-725953-unsplash.jpg"
      />
      <Image
        size="mini"
        src="https://res.cloudinary.com/royquiroz/image/upload/v1545786842/spacio/daniil-silantev-574966-unsplash.jpg"
      />
    </Carousel>
    <Card.Content>
      <Card.Header>{place.name}</Card.Header>
      <Card.Meta>
        <span className="date">{`$${place.price}`}</span>
      </Card.Meta>
      <Card.Description>{place.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <span>
        <Icon name="user" />
        22 Friends
      </span>
    </Card.Content>
  </Card>
);

export default CardPlace;
