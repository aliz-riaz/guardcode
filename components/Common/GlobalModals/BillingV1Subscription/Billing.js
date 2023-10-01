import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import BillingForm from "./BillingForm";
import { connect } from "react-redux";

function Billing(props) {
  return (
    <Modal
      isOpen={props.showBillingModal}
      size="lg"
      className={`font-roboto`}
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalBody className="p-md-4 p-3">
        <BillingForm />
      </ModalBody>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  showBillingModal: state.vantage.billingReducer.showBillingModal,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
