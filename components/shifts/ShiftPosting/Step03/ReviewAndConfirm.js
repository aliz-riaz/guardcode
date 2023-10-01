import React, { useState } from "react";
import ReviewAndConfirmShiftList from "./ReviewAndConfirmShiftList";
import ReviewAndConfirmAgreeTerms from "./ReviewAndConfirmAgreeTerms";
import NextBackBtn from "../GlobalComponents/NextBackBtn";
import { connect } from "react-redux";
import useSaveAddShift from "../../../../hooks/Shifts/ShiftPosting/useSaveAddShift";
import {
  setShowCreateRole,
  setShiftSelectSite,
  setShiftSelectRole,
  setShiftSelectVenueType,
  setShiftActiveStep,
} from "../../../../redux/actions/shiftActions";
import styles from "./ReviewAndConfirm.module.scss";

function ReviewAndConfirm(props) {
  //calculating date_end for api payload
  const shiftPostingArrayObjWithEndDate = props.shiftPostingArray.map(
    (data, i) => {
      let formatted_date_end;
      const timeEnd = data.time_end;
      const timeParts = timeEnd.split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      if (hours < 12 || (hours === 12 && minutes === 0)) {
        const dateEnd = new Date(data.date_start);
        dateEnd.setDate(dateEnd.getDate() + 1);
        const formattedDate = dateEnd.toISOString().split("T")[0];
        formatted_date_end = formattedDate;
      } else {
        formatted_date_end = data.date_start;
      }

      return {
        ...data,
        date_end: formatted_date_end,
      };
    }
  );

  // post shift api
  const { mutate } = useSaveAddShift();
  //object which sent to post shift api
  const obj = {
    role_id: props.selectedRole.id,
    site_id: props.selectedSite.id,
    venue_type: props.selectedVenue,
    slots: shiftPostingArrayObjWithEndDate,
  };
  //checking is user agree with privacy or not
  const [agreePrivacyCheck, setAgreePrivacyCheck] = useState(false);

  const [checkingIsNextButtonClicked, setCheckingIsNextButtonCLicked] =
    useState(false);

  function handleSubmit() {
    setCheckingIsNextButtonCLicked(true);
    // Check if privacy didn't agree and error pop up it will lead user to error message
    // Scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
    if (agreePrivacyCheck) {
      //sending payload and forwarding step if api success
      mutate(obj, {
        onSuccess: () => {
          props.setShiftActiveStep(3);
        },
      });
    }
  }
  //values coming from redux in response of calculation api showing them here on summary page
  const {
    grand_total,
    guarflex_fee,
    holiday_pay,
    national_insurance,
    sub_total,
    vat,
  } = props.shiftExternalCharge;

  return (
    <>
      <div className={`${styles.main_wrapper} main-inner-content`}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <h2 className={`${styles.reviewAndConfirm}`}>Review and Confirm</h2>
            <div className={`${styles.wrapper} bg-white p-4 pb-0 `}>
              <div className={`${styles.calculatingSubTotalDiv} p-4`}>
                {/* top div with shift information  */}
                <div className="table-responsive">
                  <table
                    className={`${styles.shiftDescription} table table-borderless`}
                  >
                    <tr>
                      <th>Role:</th>
                      <td>{props.selectedRole?.title}</td>
                    </tr>
                    <tr>
                      <th>Site:</th>
                      <td>{props.selectedSite?.title}</td>
                    </tr>
                    <tr>
                      <th>Location:</th>
                      <td>{props.selectedSite.fullTitle}</td>
                    </tr>
                    <tr>
                      <th>Venue:</th>
                      <td>{props.selectedVenue}</td>
                    </tr>
                  </table>
                </div>
                {/* showing shifts on summary page for review which was added by user on shift posting first step  */}
                <hr className="mt-1 mt-md-2 mt-lg-3" />
                <h3>Shifts</h3>
                <ReviewAndConfirmShiftList />
                {/* showing all external charger coming in response of calculation api  */}
                <hr className="mt-1 mt-md-2 mt-lg-3" />
                <div className={`${styles.subTotal}`}>
                  <span>Sub total</span>
                  <span>&pound;{sub_total?.toFixed(2)}</span>
                </div>
              </div>
              <div className={`${styles.externalCharges}`}>
                <div className="d-flex justify-content-between mt-4">
                  <span>Holiday pay</span>
                  <span>&pound;{holiday_pay}</span>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span>National insurance</span>
                  <span>&pound;{national_insurance}</span>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span>GuardFlex fee (15%)</span>
                  <span>&pound;{guarflex_fee}</span>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span>VAT (20%)</span>
                  <span>&pound;{vat}</span>
                </div>
              </div>
            </div>
            <div className={`${styles.wrapper} bg-white`}>
              <hr className="m-0" />
              <div className={`${styles.grandTotal} p-4`}>
                <span>Grand total</span>
                <span>&pound;{grand_total}</span>
                <p>
                  *This is an estimate and the final charges will be calculated{" "}
                  <br /> based on hours covered
                </p>
              </div>
            </div>
            {/*terms and conditions div*/}
            <ReviewAndConfirmAgreeTerms
              setAgreePrivacyCheck={setAgreePrivacyCheck}
              agreePrivacyCheck={agreePrivacyCheck}
              checkingIsNextButtonClicked={checkingIsNextButtonClicked}
            />
            {/* error if user submitted form without doing agree terms and conditions  */}
            {checkingIsNextButtonClicked && !agreePrivacyCheck && (
              <p className="text-danger mt-2 ">
                Please agree terms and conditions
              </p>
            )}
          </div>
        </div>
      </div>
      {/* next button hitting post shift save api and proceeding to all done page  */}
      <NextBackBtn
        postShiftActiveStep={2}
        setPostShiftActiveStep={props.setPostShiftActiveStep}
        handleSubmit={handleSubmit}
        btnText="Post shifts"
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedSite: state.vantage.shiftReducer.selectedSite,
  selectedRole: state.vantage.shiftReducer.selectedRole,
  selectedVenue: state.vantage.shiftReducer.selectedVenue,
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  shiftExternalCharge: state.vantage.shiftReducer.shiftExternalCharge,
});
const mapDispatchToProps = (dispatch) => ({
  setShiftSelectSite: (site) => dispatch(setShiftSelectSite(site)),
  setShiftSelectRole: (role) => dispatch(setShiftSelectRole(role)),
  setShiftSelectVenueType: (venue) => dispatch(setShiftSelectVenueType(venue)),
  setShiftActiveStep: (step) => dispatch(setShiftActiveStep(step)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReviewAndConfirm);
