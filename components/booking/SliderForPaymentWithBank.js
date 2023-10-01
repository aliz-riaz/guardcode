import { Button, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function SliderForPaymentWithBank(props) {
  const router = useRouter();

  return (
    <>
      <div className="slides_controls">
        <div className="slide_control_fixed">
          <Row className="justify-content-center">
            <Col className="col-5 col-md-6 justify-content-md-center  align-items-center col-md-6">
              <button
                onClick={() => router.push("/booking/step-4")}
                className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100 aa btn btn-secondary"
              >
                Back
              </button>
            </Col>
            <Col className="d-flex justify-content-center col-5 col-md-6 col">
              <button
                form={props.formToSubmit}
                className="btn w-100 btn-next w-md-auto btn_next btn-sm btn-green btn-disble btn btn-secondary"
                type="submit"
              >
                Confirm
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
  };
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderForPaymentWithBank);
