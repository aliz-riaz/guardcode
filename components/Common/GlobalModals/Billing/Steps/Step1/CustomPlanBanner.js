import { connect } from "react-redux";
import { useIntercom } from "react-use-intercom";
import styles from "./CustomPlanBanner.module.scss";

const CustomPlanBanner = () => {
  const { show } = useIntercom();
  return (
    <div className={`${styles.custom_plan}`}>
      <div className="row align-items-center">
        <div className="col-md-9">
          <h3 className="fs-5">Looking for a custom plan?</h3>
          <p>
            Get a personalised solution. Talk to our friendly sales team today!
          </p>
          <div className={styles.call_us_btn}>
            <button
              type="button"
              className="btn btn-md btn-green"
              onClick={(e) => {
                e.preventDefault();
                show();
              }}
            >
              Chat with us{" "}
              <img
                src={process.env.APP_URL + "/images/chat-ico.svg"}
                className="img-fluid"
              />
            </button>
            <h4>
              or call us on <a href="tel:03306600012">0330 660 0012</a>
            </h4>
          </div>
        </div>
        <div className="col-md-3">
          <ul>
            <li>
              <img
                src={process.env.APP_URL + "/images/spike-img.png"}
                className="img-fluid"
              />
              <span>Spike</span>
            </li>
            <li>
              <img
                src={process.env.APP_URL + "/images/sam-img.png"}
                className="img-fluid"
              />
              <span>Sam</span>
            </li>
            <li>
              <img
                src={process.env.APP_URL + "/images/will-img.png"}
                className="img-fluid"
              />
              <span>Will</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   selectedPlan: state.vantage.billingReducer.selectedPlan,
});

const mapDispatchToProps = (dispatch) => ({
  //   setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomPlanBanner);
