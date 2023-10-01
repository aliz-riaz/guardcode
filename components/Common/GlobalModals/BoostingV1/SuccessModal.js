import React from "react";
import { Modal, ModalBody } from "reactstrap";
import styles from "./SuccessModal.module.scss";
import { connect } from "react-redux";
import { fetchJobs } from "../../../../redux/actions/jobPostAction";
import { toast } from "react-toastify";

function SuccessModal(props) {
  const onClickOkHandler = async () => {
    props.setSuccessModal(false);
    props.setBuyBoostModalStatus(false);
    props.setBoostConfirmationModal(false);
    if (props.isUserInJobPostingFlow == false) {
      props.fetchJobs(true);
    } else {
      toast.success("Job posted successfully");
      props.setActiveStep(6);
    }
  };

  return (
    <Modal
      isOpen={props.showSuccessModal}
      className={`discardModal`}
      contentClassName="bg-transparent border-0"
      backdrop="static"
      keyboard={false}
    >
      <div className={`${styles.deleteTeamModal}`}>
        <ModalBody>
          <div className={`${styles.deleteTeamModal}`}>
            <ModalBody>
              <div
                className={`${styles.delete_confirm_modal} ${styles.payment_confirm}`}
              >
                <div className={`${styles.img_wrap}`}>
                  <img
                    src={`${process.env.APP_URL}/images/payment-done.svg`}
                    alt="success"
                    className="img-fluid"
                  />
                </div>
                <h2>You have a great deal.</h2>
                <p>Your job has been boosted.</p>
                <div className={styles.button_wrap}>
                  <button onClick={() => onClickOkHandler()}>Done</button>
                </div>
              </div>
            </ModalBody>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    job_title: state.vantage.jobPostReducer.jobTitle,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchJobs: (status) => dispatch(fetchJobs(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal);
