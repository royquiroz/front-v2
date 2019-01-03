import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";

const Review = ({ review }) => (
  <Comment>
    <Comment.Avatar src={review.client.profile_pic} />
    <Comment.Content>
      <Comment.Author as="a">
        {review.client.name} {review.client.last_name}
      </Comment.Author>
      <Comment.Metadata>
        <div>{moment(review.created_at).fromNow()}</div>
      </Comment.Metadata>
      <Comment.Text>{review.comment}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Review;
