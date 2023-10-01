import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import styles from "./PaymentDetail.module.scss";
import { fetchJobPrice } from "../../../redux/actions/jobPostAction";

function PaymentDetail(props) {
  useEffect(() => {
    if (!props.job_price || !props.job_price_vat) {
      props.fetchJobPrice(props.user_token);
    }
  }, []);

  if (!props.job_price || !props.job_price_vat) {
    return (
      <div className="text-center m-auto">
        <Spinner size={"lg"} color={"dark"} />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.job_post_payment_detail_card}>
        <p className="d-flex justify-content-between">
          <span>1 x Job Post</span>{" "}
          <span className="fw-bold"> &pound; {props.job_price}</span>
        </p>
        <p className="d-flex justify-content-between">
          <span>VAT</span>{" "}
          <span className="fw-bold"> &pound; {props.job_price_vat}</span>
        </p>
        <br />
        <p className="d-flex justify-content-between align-items-center mt-auto">
          <span>Total Amount</span>
          <span className={`${styles.grand_total} fw-bold`}>
            {" "}
            &pound; {Number(props.job_price) + Number(props.job_price_vat)}
          </span>
        </p>
      </div>
      <div
        className={`${styles.gurantee_card} d-flex px-3 py-3 `}
        style={{
          background: `url(${process.env.APP_URL}/images/big-bg-bacvk@2x.png)`,
        }}
      >
        <div className={`${styles.gurantee_badge} flex-shrink-0`}>
          <img src={process.env.APP_URL + "/images/Risky.svg"} width={"68px"} />
        </div>
        <div className={`${styles.gurantee_text} flex-grow-1`}>
          <h4 className="text-white pb-0 mb-0 mt-0">
            100% <span className="d-block">Money Back Guarantee</span>
          </h4>
          <p className="text-white mb-0">
            We’ll fully refund you if you don’t get a minimum{" "}
            <span className="fw-bold">10 applicants</span> within 3 days of
            posting your job.
          </p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  job_price: state.vantage.jobPostReducer.jobPrice,
  job_price_vat: state.vantage.jobPostReducer.jobPriceVAT,
});

const mapDispatchToProps = (dispatch) => ({
  fetchJobPrice: (userToken) => dispatch(fetchJobPrice(userToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail);
