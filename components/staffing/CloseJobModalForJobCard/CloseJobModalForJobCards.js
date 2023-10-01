import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import ScreenForStepOne from "./ScreenForStepOne";
import ScreenForStepTwoYes from "./ScreenForStepTwoYes";
import ScreenForStepTwoNo from "./ScreenForStepTwoNo";

import { setDiscardModalForJobPost } from "../../../redux/actions/jobPostAction";
// import { setActiveStepForCloseJobDiscard, setRadioForJobDiscard, setCheckBoxListForCloseJobDiscard, addUserInFeedbackList } from '../../../redux/actions/staffingAction'
import {
  setActiveStepForCloseJobDiscard,
  setRadioForJobDiscard,
  setCheckBoxListForCloseJobDiscard,
} from "../../../redux/actions/staffingAction";

import styles from "./CloseJobModalForJobCards.module.scss";
import ScreenForHireWithGL from "./ScreenForHireWithGL";

const CloseJobModalForJobCards = (props) => {
  const setScreenToBeShown = (activeStep) => {
    activeStep = parseInt(activeStep);
    switch (activeStep) {
      case 1:
        return <ScreenForStepOne />;
      case 2:
        return props.radio_for_job_close_discard == "1" ? (
          <ScreenForStepTwoYes cancelFunciton={cancelFunciton} />
        ) : (
          <ScreenForStepTwoNo cancelFunciton={cancelFunciton} />
        );
      case 3:
        return props.check_box_list_for_close_job_discard[0] == "7" ? (
          <ScreenForHireWithGL cancelFunciton={cancelFunciton} />
        ) : (
          <ScreenForStepTwoNo cancelFunciton={cancelFunciton} />
        );
      default:
        return null;
    }
  };

  const setFooterToBeShown = (activeStep) => {
    activeStep = parseInt(activeStep);
    switch (activeStep) {
      case 1:
        return (
          <Button
            color="green"
            className="btn-sm"
            form="closeStepOne"
            type="submit"
          >
            Continue
          </Button>
        );
      case 2:
        return (
          <Button
            color="green"
            className="btn-sm"
            form={
              props.radio_for_job_close_discard == "1"
                ? "closeStepOneYes"
                : "closeStepOneNo"
            }
            type="submit"
          >
            Continue
          </Button>
        );
      case 3:
        return (
          <Button
            color="green"
            className="btn-sm"
            form={
              props.check_box_list_for_close_job_discard[0] == "7"
                ? "closeStepHireWithGL"
                : "closeStepOneNo"
            }
            type="submit"
          >
            Close this job
          </Button>
        );
      default:
        return null;
    }
  };

  const cancelFunciton = () => {
    props.setDiscardModalForJobPost(false);
    props.setActiveStepForCloseJobDiscard("1");
    props.setRadioForJobDiscard("");
    props.setCheckBoxListForCloseJobDiscard([]);
    // props.addUserInFeedbackList([])
  };

  return (
    <div>
      <Modal
        isOpen={props.show_discard_modal_for_job_post}
        className={"discardModal"}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader className="d-none" toggle={cancelFunciton}></ModalHeader>
        <ModalBody className={`${styles.close_job_modal}`}>
          <div className="d-flex align-items-center">
            <span className={`${styles.badge} badge bg-danger text-white`}>
              Close job
            </span>
            <span className="text-black-50 fs-6 pt-1 ml-2">{`(Step ${props.active_step_for_close_job_discard} of 3)`}</span>
          </div>

          <h3 className="mt-3">
            {props.selected_job_name_for_close_job_discard}
          </h3>
          {/* <p className="fs-6">Closing a job removes it from search results and your list of open jobs. You can still communicate with applicants.</p> */}
          {/* <h5 className="mb-0">Why are you closing this job?</h5> */}
          {/* <span className="text-black-50 fs-6">(choose one)</span> */}
          {setScreenToBeShown(props.active_step_for_close_job_discard)}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="btn-sm" onClick={cancelFunciton}>
            Cancel
          </Button>
          {setFooterToBeShown(props.active_step_for_close_job_discard)}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show_discard_modal_for_job_post:
    state.vantage.jobPostReducer.show_discard_modal_for_job_post,
  active_step_for_close_job_discard:
    state.vantage.staffingReducer.activeStepForCloseJobDiscard,
  radio_for_job_close_discard:
    state.vantage.staffingReducer.radioForCloseJobDiscard,
  selected_job_name_for_close_job_discard:
    state.vantage.staffingReducer.selectedJobNameForCloseJobDiscard,
  applicants_list: state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
  check_box_list_for_close_job_discard:
    state.vantage.staffingReducer.checkBoxListForCloseJobDiscard,
});

const mapDispatchToProps = (dispatch) => ({
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  setActiveStepForCloseJobDiscard: (step) =>
    dispatch(setActiveStepForCloseJobDiscard(step)),
  setCheckBoxListForCloseJobDiscard: (list) =>
    dispatch(setCheckBoxListForCloseJobDiscard(list)),
  setRadioForJobDiscard: (value) => dispatch(setRadioForJobDiscard(value)),
  // addUserInFeedbackList: (value)=>dispatch(addUserInFeedbackList(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseJobModalForJobCards);
