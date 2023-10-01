import React from 'react';
import { Input, FormGroup, Label, Row, Col, Table, Button, Form, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { updateBookingActiveStepAction, setDidUserPlacedTheOrder, setScreenToBeLoadedOnStep5CheckOut, createMultipleBookingAction, updateAttendeesAction, setUserPONumber, downloadBankPO,emailPoToGivenEmail } from "../../redux/actions/bookingAction";
import { updateIsModelOpenAction, updateIsModelLinkAction,  } from "../../redux/actions/main";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import IsRequestLoderComponent from '../Common/IsRequestLoderComponent';

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Required'),
});


const PaymentWithBankPO = (props) => {
    const router = useRouter();
    const takeToDashboardClick = () => {
        if(props.booking_active_step != 5 && props.course_id != 0){
            props.updateIsModelOpenAction(true).then((resp0) => {})
            props.updateIsModelLinkAction("/dashboard").then((resp0) => {})
        }else{
            router.push("/dashboard");
        }
    }

    const moment = require("moment");
    const placeOrder = (e) => {
        e.preventDefault();
        // props.setDidUserPlacedTheOrder(true);
        // props.updateBookingActiveStepAction(5);
        props.createMultipleBookingActionTemp("2", props.user_id, props.location_id, props.payment_intent_id, props.attendees, '', props.user_token, props.user_po_number).then((resp0) => {
            if(resp0){
                if (resp0.type == 1) {
                  router.push('/booking/step-2');
                }else if(resp0.type == 2){
                  let errors_data = resp0.data;
                  _.forEach(errors_data, function(value, key) {
                    let key_temp = key.split(".")
                    props.attendees[key_temp[1]].[key_temp[2]+'_error'] = true;
                    props.updateAttendeesAction(props.attendees).then((resp0) => {});
                    router.push("/booking/step-3");
                  });
                }else if(resp0){
                //   redirectToCheckoutClickHandler(resp0)
                }else{
                  router.push("/booking/step-3");
                }
              // }); 
            }
             
            
          });
    }
    
    return (
        <>
        <div className="main-content">
                <div className="booking-steps"><ul><li className="active"><span className="circle"></span><span className="step_name">Select a course</span></li><li className="active"><span className="circle"></span><span className="step_name">Select dates</span></li><li className="active"><span className="circle"></span><span className="step_name">Attendees</span></li><li className="active"><span className="circle"></span><span className="step_name">Pay &amp; Confirm </span></li></ul></div>
                <div className="main-inner-content booking-content">
                    <div className="pt-2 pb-4 d-none d-md-block row">
                        <div className="col">
                            <h3 className="text-center">Pay &amp; Confirm</h3>
                        </div>
                    </div>
                    
                   
                    <Row className="row justify-content-center">
                        <Col className="col-12 col-md-6">
                            <div className="payment_detail_card">
                                <h4 className="">Bank Transfer</h4>
                                <div className="card_detail_box border-0">
                                   <Row className="mt-1">
                                        <Col col="12" md="12">
                                            <FormGroup className="gl-input">
                                                <Input className="form-control" placeholder="PO number (optional)" value={props.user_po_number}  onChange={(e) => props.setUserPONumber(e.target.value)}/>
                                                <Label>PO number (optional)</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <p className="fs-6 mb-0">
                                        Please remember to include the reference number when making a bank transfer payment. Course seats are not guaranteed till payment is made. 
                                    </p>
                                    <Row className="py-4">
                                    <Col className="col-12">
                                            
                                            <Button disabled={props.did_user_placed_the_order} className="d-inline-flex align-items-center btn btn-sm btn-green w-100 w-md-auto mb-2 mb-md-0 px-5"  onClick={(e) => placeOrder(e)}>
                                                <span className="mr-2">Confirm Order </span>
                                                 {!props.did_user_placed_the_order ? <IsRequestLoderComponent /> : null}
                                            </Button>
                                            {props.did_user_placed_the_order ? <Button className="d-inline-flex align-items-center btn btn-sm btn-green w-100 w-md-auto px-5 ml-0 ml-md-3"
                                            onClick={() => {
                                                props.setUserPONumber("");
                                                props.downloadBankPO(props.user_token, props.booking_ref_no,  props.user_po_number)}}
                                            >
                                                <span className="mr-2">Download PO</span>
                                                {props.did_user_placed_the_order ? <IsRequestLoderComponent /> : null} 

                                            </Button> : null}
                                        </Col>
                                        
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col>
                                        <Formik
                                            initialValues={{
                                                email: '',
                                            }}
                                            validationSchema={ValidationSchema}
                                            onSubmit={(values, {resetForm}) => {
                                                // same shape as initial values
                                                // alert(JSON.stringify(values));
                                                // (token, reference_no, email_address, po_number)
                                                props.emailPoToGivenEmail(props.user_token, props.booking_ref_no, values.email, props.user_po_number)
                                                resetForm();
                                            }}
                                            >
                                            {({ errors, touched }) => (
                                                <FormikForm>
                                                <h4 className="border-0 px-0 mb-2 mb-md-0">Send purchase order to an email address</h4>
                                                    <InputGroup className="gl-input-simple">
                                                        <Field name="email" placeholder="Email Address" type="email" className="form-control rounded"/>
                                                        
                                                        <Button type="submit" disabled={!props.did_user_placed_the_order} className="btn btn-sm btn-green btn btn-secondary ml-2 px-3 px-md-5">Send</Button>
                                                    </InputGroup>
                                                    {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                                                </FormikForm>
                                            )}
                                            </Formik>
                                           
                                        </Col>
                                    </Row>   
                                </div>
                            </div>
                        </Col>
                        <Col className="col-12 col-md-6 mt-3 mt-md-0">
                            
                            <div className="booking_summary_card">
                                <h4 className="">Order Summary</h4>
                                <div className="course_summary">
                                    <h5 className="mb-0">Course</h5>
                                    <div className="course_summary_row">
                                        <div className="course_name--location">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><g fill="#3BD55A" fill-rule="nonzero"><g><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" transform="translate(-1018.000000, -417.000000) translate(1018.000000, 417.000000)"></path></g></g></g></svg>
                                            </span>
                                            <span className="course_name">
                                                <span className="d-flex">
                                                    <span className="flex-shrink-0">{props.number_of_seats} x</span>
                                                    <span className="ml-2">
                                                        {props.selected_location_object.course_delivery_type == 3 ? "Personal Licence Training (APLH) - Virtual/Online Course" : props.course_name}<br />
                                                    {props.selected_location_object.course_delivery_type == 3 ? null : props.location_name} 
                                                    {props.selected_location_object.course_delivery_type == 3 ? null : "-"}
                                                    {
                                                        moment(
                                                            props.selected_location_object.start_date,
                                                            "YYYY-MM-DD"
                                                        ).format("DD MMMM YYYY")
                                                    }
                                                    </span>
                                                </span>    
                                            </span>
                                        </div>
                                        <div className="course_price_summary addtional_amount flex-shrink-0">&pound; {props.sub_total_for_payment}</div>
                                    </div>
                                </div>
                                {props.no_of_bookings_for_first_aid_for_payment == 0 ? null : <div className="course_summary">
                                    <div className="course_summary_row py-2">
                                        <div className="course_name--location">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><g fill="#3BD55A" fill-rule="nonzero"><g><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" transform="translate(-1018.000000, -417.000000) translate(1018.000000, 417.000000)"></path></g></g></g></svg>
                                            </span>
                                            <span className="course_name">
                                                <span className="d-flex">
                                                    <span className="flex-shrink-0">{props.no_of_bookings_for_first_aid_for_payment} x</span>
                                                    <span className="ml-2">Emergency First Aid At Work</span>
                                                </span>    
                                            </span>
                                        </div>
                                        <div className="course_price_summary addtional_amount flex-shrink-0">&pound; {props.efaw_total_for_payment}</div>
                                    </div>
                                </div>}
                                {props.no_of_bookings_for_unlimited_retakes_for_payment == 0 ? null : <div className="course_summary">
                                    <div className="course_summary_row py-2">
                                        <div className="course_name--location">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><g fill="#3BD55A" fill-rule="nonzero"><g><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" transform="translate(-1018.000000, -417.000000) translate(1018.000000, 417.000000)"></path></g></g></g></svg>
                                            </span>
                                            <span className="course_name">
                                                <span className="d-flex">
                                                    <span className="flex-shrink-0">{props.no_of_bookings_for_unlimited_retakes_for_payment} x</span>
                                                    <span className="ml-2">Unlimited Retakes</span>
                                                </span>    
                                            </span>
                                        </div>
                                        <div className="course_price_summary addtional_amount flex-shrink-0">&pound; {props.unlimited_retakes_total_for_payment}</div>
                                    </div>
                                </div>}
                                <div className="course_summary">
                                    {props.discount_for_payment == 0 ? null : <div className="course_summary_row py-2">
                                        <div className="course_name--location">
                                            <span className="course_name">Discount</span>
                                        </div>
                                        <div className="course_price_summary addtional_amount">- &pound; {props.discount_for_payment}</div>
                                    </div>}
                                    <div className="course_summary_row py-2">
                                        <div className="course_name--location">
                                            <span className="course_name">Total Amount</span>
                                        </div>
                                        <div className="course_price_summary addtional_amount">&pound; {props.total_bill_for_payment}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <>
                        <div className="slides_controls">
                            <div className="slide_control_fixed">
                                <Row className="justify-content-center">
                                    {!props.did_user_placed_the_order ? <Col className="col-4 col-md-6 justify-content-md-center  align-items-center">
                                        <button onClick={() => props.setScreenToBeLoadedOnStep5CheckOut(1)} className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100 aa btn btn-secondary">Back</button>                
                                    </Col> : null}

                                    {props.did_user_placed_the_order ? <Col className="d-flex justify-content-center col-8 col-md-6 px-md-0">
                                        <button  onClick={takeToDashboardClick} className="btn w-100 btn-next w-md-auto btn_next btn-sm btn-green btn-disble btn btn-secondary"><span>Take me to dashboard</span></button>             
                                    </Col> : null}
                                </Row>    
                            </div>
                        </div>                            
                        
                        
                    </>      
                       
                </div>
            </div>
        </>
    )    
}


const mapStateToProps = (state) => ({
    session_id: state.vantage.bookingReducer.session_id,
    // form multi-booking
    user_id: state.vantage.userDataReducer.user_id,
    user_token: state.vantage.userDataReducer.user_token,
    // is_bank_transfer_enabled: state.vantage.userDataReducer.is_bank_transfer_enabled,
    is_bank_transfer_enabled: 1,
    location_id: state.vantage.bookingReducer.location_id,
    payment_intent_id: state.vantage.bookingReducer.payment_intent_id,
    attendees: state.vantage.bookingReducer.attendees,
    did_user_placed_the_order : state.vantage.bookingReducer.did_user_placed_the_order,
    course_name: state.vantage.bookingReducer.course_name,
    sub_total_for_payment : state.vantage.bookingReducer.sub_total_for_payment,
    unlimited_retakes_total_for_payment: state.vantage.bookingReducer.unlimited_retakes_total_for_payment,
    efaw_total_for_payment: state.vantage.bookingReducer.efaw_total_for_payment,
    discount_for_payment:  state.vantage.bookingReducer.discount_for_payment,
    total_bill_for_payment: state.vantage.bookingReducer.total_bill_for_payment,
    number_of_seats: state.vantage.bookingReducer.number_of_seats, 
    no_of_bookings_for_first_aid_for_payment: state.vantage.bookingReducer.no_of_bookings_for_first_aid_for_payment, 
    no_of_bookings_for_unlimited_retakes_for_payment: state.vantage.bookingReducer.no_of_bookings_for_unlimited_retakes_for_payment,
    selected_location_object: state.vantage.bookingReducer.selected_location_object, 
    location_name: state.vantage.bookingReducer.location_name,
    is_request_loader: state.vantage.commonReducer.is_request_loader,
    booking_active_step: state.vantage.bookingReducer.booking_active_step,
    course_id: state.vantage.bookingReducer.course_id,
    user_po_number: state.vantage.bookingReducer.user_po_number,
    booking_ref_no: state.vantage.bookingReducer.booking_ref_no,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    // createSessionIdAction: createSessionIdAction,
    // createSessionIdActionTemp: (data, booking_id) => dispatch(createSessionIdAction(data, booking_id)),
  
    createMultipleBookingAction: createMultipleBookingAction,
    createMultipleBookingActionTemp: (payment_method, employer_id, event_id, payment_intent_id, trainees, stripeLink, user_token, po_number) => dispatch(createMultipleBookingAction(payment_method, employer_id, event_id, payment_intent_id, trainees, stripeLink, user_token, po_number)),
   
    updateAttendeesAction: (attendees) => dispatch(updateAttendeesAction(attendees)),
    setDidUserPlacedTheOrder: (value) => dispatch(setDidUserPlacedTheOrder(value)),
    setScreenToBeLoadedOnStep5CheckOut: (value) => dispatch(setScreenToBeLoadedOnStep5CheckOut(value)),
    updateBookingActiveStepAction: (step) => dispatch(updateBookingActiveStepAction(step)),
    updateIsModelOpenAction: (value) => dispatch(updateIsModelOpenAction(value)),
    updateIsModelLinkAction: (value) => dispatch(updateIsModelLinkAction(value)),
    setUserPONumber: (poNumber) => dispatch(setUserPONumber(poNumber)),
    downloadBankPO: (token, reference_no, po_number) => dispatch(downloadBankPO(token, reference_no, po_number)),
    emailPoToGivenEmail: (token, reference_no, email_address, po_number) => dispatch(emailPoToGivenEmail(token, reference_no, email_address, po_number)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentWithBankPO);
