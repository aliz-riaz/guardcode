import { Input, FormGroup, Label, Row, Col } from "reactstrap";
import SliderForPaymentWithBank from "./SliderForPaymentWithBank";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  setStep5CheckBoxBtnValue,
  setStep5RadioBtnValue,
  setScreenToBeLoadedOnStep5CheckOut,
} from "../../redux/actions/bookingAction";

const ConfirmSchema = Yup.object().shape({
  radioButton: Yup.string().required("Please select one of the above"),
  // termsAndConditions: Yup.string().when("radioButton", {
  //   is: "bank",
  //   then: Yup.string().required("You must agree to Terms & Conditions in order to continue.")
  // })
  termsAndConditions: Yup.string().required(
    "You must agree to Terms & Conditions in order to continue."
  ),
});

const PaymentWithBank = (props) => {
  return (
    <>
      <div className="main-content">
        <div className="booking-steps">
          <ul>
            <li className="active">
              <span className="circle"></span>
              <span className="step_name">Select a course</span>
            </li>
            <li className="active">
              <span className="circle"></span>
              <span className="step_name">Select dates</span>
            </li>
            <li className="active">
              <span className="circle"></span>
              <span className="step_name">Attendees</span>
            </li>
            <li className="active">
              <span className="circle"></span>
              <span className="step_name">Pay &amp; Confirm </span>
            </li>
          </ul>
        </div>
        <div className="main-inner-content booking-content">
          <div className="pt-5 pb-4 d-none d-md-block row">
            <div className="col">
              <h3 className="text-center">Pay &amp; Confirm</h3>
            </div>
          </div>

          <Row className="justify-content-center">
            <Col className="col-12 col-md-6">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  radioButton: props.step5_checkout_radio_btn_value,
                  termsAndConditions: props.step5_checkout_checkbox_btn_value,
                }}
                validationSchema={ConfirmSchema}
                onSubmit={(values) => {
                  if (values.radioButton == "bank") {
                    props.setScreenToBeLoadedOnStep5CheckOut(3);
                  } else {
                    props.setScreenToBeLoadedOnStep5CheckOut(2);
                  }
                }}
              >
                {({ errors, touched, values }) => (
                  <Form id="booking_payment_option">
                    <div className="payment_detail_card">
                      <h4 className="mb-0">Payment Details</h4>
                      <ul className="saved_cards_detail">
                        <li className="">
                          <FormGroup className="gl-radio form-check mb-0">
                            <Label className="mb-0 d-block ">
                              <Field
                                type="radio"
                                name="radioButton"
                                value="stripe"
                                onChange={(e) => {
                                  props.setStep5RadioBtnValue(e.target.value);
                                }}
                              />
                              <span className="font-weight-bold">
                                {" "}
                                Pay with Credit Card
                              </span>
                              <span className="checkmark"></span>
                            </Label>
                          </FormGroup>
                        </li>
                        <li>
                          <FormGroup className="gl-radio form-check mb-0">
                            <Label className="mb-0 d-block">
                              <Field
                                type="radio"
                                name="radioButton"
                                value="bank"
                                onChange={(e) => {
                                  props.setStep5RadioBtnValue(e.target.value);
                                }}
                              />
                              <span className="font-weight-bold">
                                {" "}
                                Pay with Bank Transfer
                              </span>
                              <span className="checkmark"></span>
                            </Label>
                          </FormGroup>
                        </li>
                      </ul>
                      {errors.radioButton && touched.radioButton ? (
                        <div className="text-danger text-danger ml-4 pt-2">
                          {errors.radioButton}
                        </div>
                      ) : null}
                      <div className="agrement_box mt-3">
                        <FormGroup className="gl-checkbox">
                          <Label className="mb-0">
                            <Field
                              type="checkbox"
                              name="termsAndConditions"
                              onChange={(e) => {
                                e.target.checked
                                  ? props.setStep5CheckBoxBtnValue(true)
                                  : props.setStep5CheckBoxBtnValue("");
                              }}
                            />
                            <span>
                              I agree to the Get Licensed terms and Training
                              provider{" "}
                              <a
                                href="https://www.get-licensed.co.uk/terms"
                                target="_blank"
                              >
                                terms and conditions.
                              </a>
                            </span>
                            <span className="checkmark"></span>
                          </Label>
                          {errors.termsAndConditions &&
                          touched.termsAndConditions ? (
                            <div className="text-danger">
                              {errors.termsAndConditions}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
          <SliderForPaymentWithBank formToSubmit="booking_payment_option" />
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    step5_checkout_radio_btn_value:
      state.vantage.bookingReducer.step5_checkout_radio_btn_value,
    step5_checkout_checkbox_btn_value:
      state.vantage.bookingReducer.step5_checkout_checkbox_btn_value,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setStep5RadioBtnValue: (value) => dispatch(setStep5RadioBtnValue(value)),
  setStep5CheckBoxBtnValue: (value) =>
    dispatch(setStep5CheckBoxBtnValue(value)),
  setScreenToBeLoadedOnStep5CheckOut: (value) =>
    dispatch(setScreenToBeLoadedOnStep5CheckOut(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWithBank);
