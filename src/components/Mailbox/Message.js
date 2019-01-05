import React from "react";
import { Message } from "semantic-ui-react";

const MessageUser = ({ msg }) => (
  <Message>
    <Message.Header>{msg.title}</Message.Header>
    <p>{msg.comment}</p>
  </Message>
);

export default MessageUser;
