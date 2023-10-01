import React from "react";
import { useRouter } from "next/router";
import styles from "./AllDone.module.scss";
import AllDoneButtons from "./AllDoneButtons";
import { connect } from "react-redux";
function AllDone(props) {
  const router = useRouter();

  // function when user click add another shift button
  function handleAddAnotherShift() {
    //resetting shift reducer
    props.resetShiftReducer();
    //navigating user to step 1 of posting shift
    router.push("/shifts/post");
    router.reload();
  }
  // function when user click go to shift list button
  function handleGoToShiftList() {
    //navigating user to shift list
    router.push("/shifts");
    //resetting shift reducer after 1 second
    setTimeout(() => {
      props.resetShiftReducer();
    }, 1000);
  }
  return (
    <div className={`${styles.main_wrapper} main-inner-content`}>
      <div className="row justify-content-center">
        <div className="col-lg-7 col-12">
          <div className={`${styles.wrapper}`}>
            <span>All done</span>
            <div className={`${styles.contentDiv} bg-white`}>
              <img
                src={`${process.env.APP_URL}/images/shiftPostDoneTick.svg`}
                alt="Done"
              />
              <h3>Your shifts have been posted</h3>
              <p>
                You’ll be able to review and approve <br /> workers once they
                apply
              </p>
            </div>
            <div className={`${styles.btnDiv} d-flex justify-content-end`}>
              {/*Add another shift button*/}
              <AllDoneButtons
                btnText="Post another shift"
                styleClass="btn btn-sm btn-green mt-3"
                handleClick={handleAddAnotherShift}
              />
              {/*go to shift list button*/}
              <AllDoneButtons
                btnText="Go to shifts list"
                styleClass="btn btn-sm btn-secondary mt-3"
                handleClick={handleGoToShiftList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetShiftReducer: () => dispatch({ type: "RESET_SHIFT_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllDone);
