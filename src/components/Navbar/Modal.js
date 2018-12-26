import React from "react";
import { Header, Modal } from "semantic-ui-react";
import FormAuth from "./FormAuth";

const Modals = ({ open, button, handleModal, closeModal }) => (
  <Modal open={open} size="tiny" onClose={handleModal} closeIcon>
    <Header content={button} />
    <Modal.Content>
      <FormAuth type={button} closeModal={closeModal} />
    </Modal.Content>
  </Modal>
);

export default Modals;
