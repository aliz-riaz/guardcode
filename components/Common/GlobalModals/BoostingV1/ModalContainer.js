import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalContainer(props) {
  return (
    <Modal
      isOpen={props.modalState}
      size="lg"
      className={`font-roboto`}
      contentClassName="bg-transparent border-0"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalBody className="p-0">{props.children}</ModalBody>
    </Modal>
  );
}

export default ModalContainer;
