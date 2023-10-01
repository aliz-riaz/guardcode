import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { deleteJobTemplate } from "../../../redux/actions/jobPostAction";
import { connect } from "react-redux";
// import { Spinner } from "react-bootstrap";

function ConfirmationModal(props) {
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteJobTemplate = async (templateId) => {
    setIsDisabled(true);
    const deleteResponse = await props.deleteJobTemplate(
      props.user_token,
      templateId
    );
    props.setJobTemplateList(
      props.jobTemplateList.filter((item) => item.id !== templateId)
    );
    setIsDisabled(false);
    props.setModalData({ templateStatus: false });
  };

  const returnModalTitle = (modalData) => {
    if (modalData.is_draft) {
      return "Delete draft";
    } else if (modalData.is_draft == 0) {
      return "Delete job template";
    } else {
      return "";
    }
  };

  return (
    <Modal
      isOpen={props.modalData.templateStatus}
      className="discardModal"
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader toggle={() => props.toggle()}>
        {returnModalTitle(props.modalData)}
      </ModalHeader>
      <ModalBody>Are you sure you want to delete?</ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          className="btn-sm"
          onClick={() => props.toggle()}
        >
          Cancel
        </Button>
        {isDisabled ? (
          <Button
            color="green"
            style={{ minWidth: 100 }}
            className="btn-sm"
            disabled
            onClick={() => deleteJobTemplate(props.modalData.templateId)}
          >
            <Spinner size="sm" />
          </Button>
        ) : (
          <Button
            color="green"
            style={{ minWidth: 100 }}
            className="btn-sm"
            onClick={() => deleteJobTemplate(props.modalData.templateId)}
          >
            Delete
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteJobTemplate: (userToken, templateId) =>
      dispatch(deleteJobTemplate(userToken, templateId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
