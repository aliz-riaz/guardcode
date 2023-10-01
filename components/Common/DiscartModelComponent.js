import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { updateIsModelOpenAction } from "../../redux/actions/main";
import { useRouter } from "next/router";

const DiscartModelComponent = (props) => {
  const router = useRouter();

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [modalLink, setModalLink] = useState(false);

  const toggle = () => {
    setModal(!modal);
    props.updateIsModelOpenAction(!modal).then((resp0) => {});
  };

  const cancelFunciton = () => {
    setModal(false);
    props.updateIsModelOpenAction(false).then((resp0) => {});
  };

  const GoToNext = () => {
    props.updateIsModelOpenAction(false).then((resp0) => {
      router.push("" + modalLink);
    });
  };
  useEffect(() => {
    props.updateIsModelOpenAction(false).then((resp0) => {});
  }, []);

  useEffect(() => {
    setModal(props.is_model_open);
  }, [props.is_model_open]);
  useEffect(() => {
    setModalLink(props.is_model_link);
  }, [props.is_model_link]);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className + " discardModal"}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={toggle}>Incomplete Booking</ModalHeader>
        <ModalBody>
          You haven't completed this booking yet. Are you sure you want to exit?
        </ModalBody>
        <ModalFooter>
          <Button color="green" className="btn-sm" onClick={GoToNext}>
            Leave
          </Button>{" "}
          <Button color="secondary" className="btn-sm" onClick={cancelFunciton}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  is_model_open: state.vantage.commonReducer.is_model_open,
  is_model_link: state.vantage.commonReducer.is_model_link,
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
});

const mapDispatchToProps = (dispatch) => ({
  updateIsModelOpenAction: (value) => dispatch(updateIsModelOpenAction(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscartModelComponent);
