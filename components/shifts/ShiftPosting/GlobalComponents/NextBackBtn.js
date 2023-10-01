import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Button, Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setShiftActiveStep } from "../../../../redux/actions/shiftActions";
import { setDiscardModalForShiftPost } from "../../../../redux/actions/shiftActions";

function NextBackBtn(props) {
  const [goToNextEnable, SetGoToNextEnable] = useState(false);
  const router = useRouter();

  //for check if shiftposting field is empty or not
  const isAnyFieldNotEmpty = props.shiftPostingArray.some((shiftObject) => {
    const conditionResult =
      shiftObject.date_start !== "" ||
      shiftObject.paid_break !== "" ||
      shiftObject.time_end !== "" ||
      shiftObject.time_start !== "";

    return conditionResult;
  });

  useEffect(() => {
    if (props.postShiftActiveSteps == 2) {
      SetGoToNextEnable(true);
    } else if (props.postShiftActiveSteps == 3) {
      SetGoToNextEnable(true);
    } else {
      SetGoToNextEnable(false);
    }
  }, [props.postShiftActiveSteps]);

  const GoBackHandler = () => {
    if (props.postShiftActiveStep > 0) {
      props.setShiftActiveStep(props.postShiftActiveSteps - 1);
    }
  };
  return (
    <>
      <div className="slides_controls">
        <div className="slide_control_fixed">
          <Row className="justify-content-center w-100">
            <Col className="col-5 col-md-3">
              {props.postShiftActiveSteps === 1 ? (
                <Button
                  onClick={() => {
                    if (
                      (props.shiftPostingArray.length > 1 ||
                        props.selectedVenue !== "" ||
                        !_.isEmpty(props.selectedSite) ||
                        !_.isEmpty(props.selectedRole) ||
                        isAnyFieldNotEmpty) &&
                      router.pathname == "/shifts/post"
                    ) {
                      props.setDiscardModalForShiftPost(true);
                    } else {
                      router.push("/shifts");
                    }
                  }}
                  className="btn w-100 btn_back w-md-auto btn-sm border-0 shadow-none text-white"
                >
                  Cancel
                </Button>
              ) : props.postShiftActiveSteps > 1 ? (
                <Button
                  onClick={(e) => GoBackHandler(e)}
                  className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100 aa"
                >
                  Back
                </Button>
              ) : null}
            </Col>
            <Col className="col-5 col-md-3 text-right">
              <Button
                type="submit"
                onClick={() => props.handleSubmit && props.handleSubmit()}
                className="btn w-100 btn-next w-md-auto btn_next btn-sm btn-green btn-disble"
                disabled={props.postShiftActiveSteps > 1 && !goToNextEnable}
              >
                {props.btnText ? props.btnText : "Next"}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  postShiftActiveSteps: state.vantage.shiftReducer.postShiftActiveSteps,
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  selectedVenue: state.vantage.shiftReducer.selectedVenue,
  selectedSite: state.vantage.shiftReducer.selectedSite,
  selectedRole: state.vantage.shiftReducer.selectedRole,
});

const mapDispatchToProps = (dispatch) => ({
  setDiscardModalForShiftPost: (toggle) =>
    dispatch(setDiscardModalForShiftPost(toggle)),
  setShiftActiveStep: (step) => dispatch(setShiftActiveStep(step)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NextBackBtn);
