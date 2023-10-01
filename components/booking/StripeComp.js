import React, { useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import FullPageLoderComponent from '../Common/FullPageLoderComponent'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { createSessionIdAction, createMultipleBookingAction, updateAttendeesAction, setScreenToBeLoadedOnStep5CheckOut } from '../../redux/actions/bookingAction'

var _ = require('lodash')
import { loadStripe } from '@stripe/stripe-js'
import Payment from '../Common/StripePayment/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { Spinner } from 'reactstrap'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

export function StripeComp(props) {
  const router = useRouter()

  const [submiting, setSubmitting] = useState(false)

  const goToNext = () => {
    router.push(`${process.env.APP_URL}/booking/step-thanks`)
  }

  // const stripe = useStripe();

  useEffect(() => {
    // if(stripe) {

    props.createMultipleBookingActionTemp('1', props.user_id, props.location_id, props.payment_intent_id, props.attendees, props.stripeCancelLink).then((resp0) => {
      if (resp0) {
        if (resp0.type == 1) {
          router.push('/booking/step-2')
        } else if (resp0.type == 2) {
          let errors_data = resp0.data
          _.forEach(errors_data, function (value, key) {
            let key_temp = key.split('.')
            props.attendees[key_temp[1]].[key_temp[2]+'_error'] = true;
            props.updateAttendeesAction(props.attendees).then((resp0) => {})
            router.push('/booking/step-3')
          })
        } else if (resp0) {
          // redirectToCheckoutClickHandler(resp0)
          // setOptions({clientSecret: resp0})
        } else {
          router.push('/booking/step-3')
        }
        // });
      }
    })
    // }
  }, [])

  const redirectToCheckoutClickHandler = async (session_id) => {
    if (session_id) {
      try {
        await stripe.redirectToCheckout({
          sessionId: session_id,
        })
      } catch (e) {}
    }
  }

  const fullLoader = () => {
    return (
      <div className="100-vh d-flex align-items-center justify-content-center pl-3 pr-3 fullLoader" style={{ height: '100vh', position: 'absolute' }}>
        <div>
          <img src={process.env.APP_URL + '/images/Logo-toga.gif'} className="FullPageLoder" alt="Loader" />
        </div>
      </div>
    )
  }

  return (
    <>
     
        <>
        <div className="main-content">
        <div className="booking-steps"><ul><li className="active"><span className="circle"></span><span className="step_name">Select a course</span></li><li className="active"><span className="circle"></span><span className="step_name">Select dates</span></li><li className="active"><span className="circle"></span><span className="step_name">Attendees</span></li><li className="active"><span className="circle"></span><span className="step_name">Pay &amp; Confirm </span></li></ul></div>
          <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
            <div className="col">
              <h3 className="text-center text-sm-uppercase font-sm-12">Pay & Confirm</h3>
            </div>
          </div>
          <div className="row justify-content-center">
           
           {props.client_secret ?  <><div className="col-12 col-md-5">
              <Elements
                stripe={stripePromise}
                options={{
                  // passing the client secret obtained from the server
                  clientSecret: props.client_secret,
                }}
              >
                <Payment headerAndAsideBlocker={true} {...props} goToNext={goToNext} clientSecret={props.client_secret} setSubmitting={setSubmitting} showTerms={props.showTerms} toastMessage="Your Seat(s) booked successfully."/>
              </Elements>
            </div>
            <div className='col-12 col-md-3'>
                <div className="booking_total_card">
                  {props.sub_total_for_payment != '0.00' && (
                    <p className="d-flex justify-content-between">
                      <span>Sub Total</span> <span className="fw-bold"> &pound; {props.sub_total_for_payment}</span>
                    </p>
                  )}

                  {props.efaw_total_for_payment != '0.00' && (
                    <p className="d-flex justify-content-between">
                      <span>Emergency First Aid At Work</span> <span className="fw-bold"> &pound; {props.efaw_total_for_payment}</span>
                    </p>
                  )}

                  {props.unlimited_retakes_total_for_payment != '0.00' && (
                    <p className="d-flex justify-content-between">
                      <span>Unlimited Retakes</span>
                      <span className="fw-bold"> &pound; {props.unlimited_retakes_total_for_payment}</span>
                    </p>
                  )}

                  {props.is_discount_on_booking_enabled == 1 && props.course_id != 61 && props.number_of_seats >= props.no_of_bookings_to_avail_discount ? (
                    <>
                      <p className="d-flex justify-content-between">
                        <span>Discount</span>
                        <span>
                          <strong>- &pound; {props.discount_for_payment}</strong>
                        </span>
                      </p>
                    </>
                  ) : null}
                <br />
                  <p className="d-flex justify-content-between align-items-center mt-auto">
                      <span>Total Amount</span>
                      <span className="grand_total fw-bold"> &pound; {props.total_bill_for_payment}</span>
                    </p>
                </div>
            </div></> : 
        <span className="text-center m-auto"><Spinner size={'lg'} color={'dark'} /></span>
      }

          </div>
          <div className='slides_controls'>
            <div className='slide_control_fixed'>
              <div className='class="justify-content-center row'>
                <div className='col-5 col-md-6 justify-content-md-center  align-items-center col-md-6 col'>
                  <button className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100 aa btn btn-secondary" onClick={props.backClickHandler}>
                    Back
                  </button>
                </div>
                <div className='d-flex justify-content-center col-5 col-md-6 col col'>
                  <button form="jobPostPayment" type="submit" className="btn w-100 btn-next w-md-auto btn_next btn-sm btn-green btn-disble btn btn-secondary">
                    Pay
                    {submiting && <span className='pl-2 d-inline-block'><Spinner size={'sm'} color={'dark'} /></span>}
                  </button>{' '}
                </div>
              </div>
            </div>
          </div>
          
          </div>
          
        </>
      
    </>
  )
}

const mapStateToProps = (state) => ({
  session_id: state.vantage.bookingReducer.session_id,
  // form multi-booking
  user_id: state.vantage.userDataReducer.user_id,
  location_id: state.vantage.bookingReducer.location_id,
  payment_intent_id: state.vantage.bookingReducer.payment_intent_id,
  attendees: state.vantage.bookingReducer.attendees,
  client_secret: state.vantage.bookingReducer.client_secret,
  total_bill_for_payment: state.vantage.bookingReducer.total_bill_for_payment,
  discount_for_payment: state.vantage.bookingReducer.discount_for_payment,
  efaw_total_for_payment: state.vantage.bookingReducer.efaw_total_for_payment,
  unlimited_retakes_total_for_payment: state.vantage.bookingReducer.unlimited_retakes_total_for_payment,
  sub_total_for_payment: state.vantage.bookingReducer.sub_total_for_payment,

  number_of_seats: state.vantage.bookingReducer.number_of_seats,
  course_id: state.vantage.bookingReducer.course_id,
  is_discount_on_booking_enabled: state.vantage.userDataReducer.is_discount_on_booking_enabled,
  discount_per_on_booking: state.vantage.userDataReducer.discount_per_on_booking,
  no_of_bookings_to_avail_discount: state.vantage.userDataReducer.no_of_bookings_to_avail_discount,
})

const mapDispatchToProps = (dispatch) => ({
  createSessionIdAction: createSessionIdAction,
  createSessionIdActionTemp: (data, booking_id) => dispatch(createSessionIdAction(data, booking_id)),

  createMultipleBookingAction: createMultipleBookingAction,
  createMultipleBookingActionTemp: (payment_method, employer_id, event_id, payment_intent_id, trainees, stripe_cancel_link) => dispatch(createMultipleBookingAction(payment_method, employer_id, event_id, payment_intent_id, trainees, stripe_cancel_link)),

  updateAttendeesAction: (attendees) => dispatch(updateAttendeesAction(attendees)),
  setScreenToBeLoadedOnStep5CheckOut: (value) => dispatch(setScreenToBeLoadedOnStep5CheckOut(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StripeComp)
