import React from "react";
import { connect } from "react-redux";
import { setShiftSelectVenueType } from "../../../../redux/actions/shiftActions";
import { ErrorMessage, Field } from "formik";
import styles from "./VenueEnv.module.scss";

const VenueEnvType = (props) => {
  return (
    <div>
      <div className={`${styles.role_col}`}>
        <h4 className="mt-4">Venue or Environment type</h4>
        <div
          className={`${styles.venue_wrap} row mb-0 mt-3 justify-content-center justify-content-md-between no-gutters`}
        >
          <div className="col">
            <input
              type="text"
              name="venue_type"
              value={props.selectedVenue}
              hidden
            />
            <div
              className={`${styles.venue_box} ${
                props.selectedVenue == "Retail" ? styles.selected : ""
              } cursor-pointer`}
              onClick={() =>
                props.venueTypeHandler && props.venueTypeHandler("Retail")
              }
            >
              <span className={`${styles.select_icon}`}></span>
              <i className={`${styles.venue_icon}`}>
                <img src={`${process.env.APP_URL}/images/retail-icon.svg`} />
              </i>
              <span className={`${styles.venu_name}`}>Retail</span>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.venue_box} ${
                props.selectedVenue == "Corporate" ? styles.selected : ""
              } cursor-pointer`}
              onClick={() =>
                props.venueTypeHandler && props.venueTypeHandler("Corporate")
              }
            >
              <span className={`${styles.select_icon}`}></span>
              <i className={`${styles.venue_icon}`}>
                <img src={`${process.env.APP_URL}/images/corporate-icon.svg`} />
              </i>
              <span className={`${styles.venu_name}`}>Corporate</span>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.venue_box} ${
                props.selectedVenue == "Bar/Club" ? styles.selected : ""
              } cursor-pointer`}
              onClick={() =>
                props.venueTypeHandler && props.venueTypeHandler("Bar/Club")
              }
            >
              <span className={`${styles.select_icon}`}></span>
              <i className={`${styles.venue_icon}`}>
                <img src={`${process.env.APP_URL}/images/bar-icon.svg`} />
              </i>
              <span className={`${styles.venu_name}`}>Bar/Club</span>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.venue_box} ${
                props.selectedVenue == "Event" ? styles.selected : ""
              } cursor-pointer`}
              onClick={() =>
                props.venueTypeHandler && props.venueTypeHandler("Event")
              }
            >
              <span className={`${styles.select_icon}`}></span>
              <i className={`${styles.venue_icon}`}>
                <img src={`${process.env.APP_URL}/images/event-icon.svg`} />
              </i>
              <span className={`${styles.venu_name}`}>Event</span>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.venue_box} ${
                props.selectedVenue == "Mobile" ? styles.selected : ""
              }  cursor-pointer`}
              onClick={() =>
                props.venueTypeHandler && props.venueTypeHandler("Mobile")
              }
            >
              <span className={`${styles.select_icon}`}></span>
              <i className={`${styles.venue_icon}`}>
                <img src={`${process.env.APP_URL}/images/mobile-icon.svg`} />
              </i>
              <span className={`${styles.venu_name}`}>Mobile</span>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.venue_box} ${
                props.selectedVenue == "Other" ? styles.selected : ""
              }  cursor-pointer`}
              onClick={() =>
                props.venueTypeHandler && props.venueTypeHandler("Other")
              }
            >
              <span className={`${styles.select_icon}`}></span>
              <i className={`${styles.venue_icon}`}>
                <img src={`${process.env.APP_URL}/images/other-icon.svg`} />
              </i>
              <span className={`${styles.venu_name}`}>Other</span>
            </div>
          </div>
        </div>
        <ErrorMessage
          component="h6"
          className={`${styles.error_text} position-absolute text-danger fw-normal`}
          name={`venue_type`}
        />

        <hr className="mt-5" />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  selectedVenue: state.vantage.shiftReducer.selectedVenue,
});
const mapDispatchToProps = (dispatch) => ({
  setShiftSelectVenueType: (venue) => dispatch(setShiftSelectVenueType(venue)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VenueEnvType);
