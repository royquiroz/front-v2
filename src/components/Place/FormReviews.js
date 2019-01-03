import React, { Component } from "react";
import { Avatar, Rate, message } from "antd";
import { Segment, Grid, Button, Form, TextArea } from "semantic-ui-react";
import { review } from "../../service";
import "../../App.css";

class FormReviews extends Component {
  constructor() {
    super();
    this.state = {
      review: {
        raiting: 0,
        comment: ""
      }
    };
  }

  componentWillMount() {
    const { review } = this.state;

    review.lessor = this.props.place.lessor._id;
    review.client = this.props.user._id;
    review.place = this.props.place._id;
    this.setState({ review: review });
  }

  handleChange = e => {
    const { review } = this.state;

    if (e.target === undefined) {
      review.raiting = e;
    } else {
      let field = e.target.name;
      review[field] = e.target.value;
    }
    console.log(review);

    this.setState({ review });
  };

  handleSubmit = e => {
    e.preventDefault();

    review(this.state.review).then(res => {
      message.success(res.msg);
    });
  };

  render() {
    const { user } = this.props;

    return (
      <Segment basic>
        <Grid>
          <Grid.Column>
            <Avatar src={user.profile_pic} size="large" />
          </Grid.Column>

          <Grid.Column width={15}>
            <Form onSubmit={this.handleSubmit}>
              <h3 style={{ display: "inline-block" }}>Calificacion:</h3>{" "}
              <Rate
                value={this.state.review.raiting}
                target="raiting"
                onChange={this.handleChange}
              />
              <TextArea
                name="comment"
                rows={2}
                placeholder="Escribe tu reseña"
                style={{ marginBottom: "10px" }}
                onChange={this.handleChange}
              />
              <Button content="Publicar" type="submit" primary />
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default FormReviews;
