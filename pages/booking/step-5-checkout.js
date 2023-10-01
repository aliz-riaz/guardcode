import React, { useState, useEffect, useMemo } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  createSessionIdAction,
  createMultipleBookingAction,
  updateAttendeesAction,
  setScreenToBeLoadedOnStep5CheckOut,
} from "../../redux/actions/bookingAction";
import FullPageLoderComponent from "../../components/Common/FullPageLoderComponent";
import { useRouter } from "next/router";
// import PaymentWithBank from '../../components/booking/PaymentWithBank';
var _ = require("lodash");
import { protectedRoute } from "../../utilites/utility";
import Header from "../../components/Header";
import Sidenav from "../../components/LeftNav";
import StripeComp from "../../components/booking/StripeComp";
import ShowDifferentScreenOnStep5 from "../../components/booking/ShowDifferentScreenOnStep5";
import ProgressBar from "../../components/booking/ProgressBar";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

// function StripeComp(props) {
//   const router = useRouter()

//   const stripe = useStripe();

//   useEffect(() => {
//     if(stripe){
//       props.createMultipleBookingActionTemp(props.user_id, props.location_id, props.payment_intent_id, props.attendees.map(attendee => {
//         return {
//           ...attendee,
//           "phone" : attendee.phone.slice(1)
//         }
//       })).then((resp0) => {
//         if(resp0){
//             if (resp0.type == 1) {
//               router.push('/booking/step-2');
//             }else if(resp0.type == 2){
//               let errors_data = resp0.data;
//               _.forEach(errors_data, function(value, key) {
//                 let key_temp = key.split(".")
//                 props.attendees[key_temp[1]].[key_temp[2]+'_error'] = true;
//                 props.updateAttendeesAction(props.attendees).then((resp0) => {});
//                 router.push("/booking/step-3");
//               });
//             }else if(resp0){
//               redirectToCheckoutClickHandler(resp0)
//             }else{
//               router.push("/booking/step-3");
//             }
//           // });
//         }
//       });
//     }
//   }, [stripe]);

//   const redirectToCheckoutClickHandler = async (session_id) => {
//     if (session_id) {
//       try{
//         await stripe.redirectToCheckout({
//           sessionId: session_id,
//         });
//       }catch(e){

//       }
//     }
//   }

//   return (
//     <>
//       <FullPageLoderComponent />
//     </>
//   );
// }

function Step5Checkout(props) {
  const router = useRouter();

  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.STRIPE_PUBLIC_KEY)
  );

  // useEffect(() => {
  //   if(props.screen_to_be_loaded_on_step5_checkout == "2"){
  //     props.setScreenToBeLoadedOnStep5CheckOut(1)
  //   }
  // }, [])
  const backClickHandler = () => {
    router.push("/booking/step-4");
  };

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        {props.is_bank_transfer_enabled == 0 ? (
          <div className="form-group col-sm-12">
            <div className="inner-addon right-addon">
              <StripeComp
                headerAndAsideBlocker={true}
                {...props}
                backClickHandler={backClickHandler}
                showTerms={true}
              />
            </div>
          </div>
        ) : (
          <ShowDifferentScreenOnStep5 />
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  session_id: state.vantage.bookingReducer.session_id,
  // form multi-booking
  user_id: state.vantage.userDataReducer.user_id,
  is_bank_transfer_enabled:
    state.vantage.userDataReducer.is_bank_transfer_enabled,
  location_id: state.vantage.bookingReducer.location_id,
  payment_intent_id: state.vantage.bookingReducer.payment_intent_id,
  attendees: state.vantage.bookingReducer.attendees,
  screen_to_be_loaded_on_step5_checkout:
    state.vantage.bookingReducer.screen_to_be_loaded_on_step5_checkout,
});

const mapDispatchToProps = (dispatch) => ({
  createSessionIdAction: createSessionIdAction,
  createSessionIdActionTemp: (data, booking_id) =>
    dispatch(createSessionIdAction(data, booking_id)),

  createMultipleBookingAction: createMultipleBookingAction,
  createMultipleBookingActionTemp: (
    employer_id,
    event_id,
    payment_intent_id,
    trainees
  ) =>
    dispatch(
      createMultipleBookingAction(
        employer_id,
        event_id,
        payment_intent_id,
        trainees
      )
    ),

  updateAttendeesAction: (attendees) =>
    dispatch(updateAttendeesAction(attendees)),
  setScreenToBeLoadedOnStep5CheckOut: (value) =>
    dispatch(setScreenToBeLoadedOnStep5CheckOut(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step5Checkout);
