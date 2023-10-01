import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { UpdateNewsModalState } from "../../redux/actions/userAction";

import styles from "./index.module.scss";

const NewsModal = (props) => {
  const cancelFunciton = () => {
    props.UpdateNewsModalState(props.user_token);
  };

  return (
    <div>
      <Modal
        isOpen={
          (props.is_news_modal_disabled === undefined && true) ||
          (props.is_news_modal_disabled === 1 && false) ||
          (props.is_news_modal_disabled === 0 && true)
        }
        className={"discardModal"}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal isOpen={true} className={'discardModal'} backdrop="static" keyboard={false}> */}
        <ModalHeader className="d-none" toggle={cancelFunciton}></ModalHeader>

        <ModalBody className={`${styles.close_job_modal}`}>
          <div className="text-center">
            <img
              src={process.env.APP_URL + "/images/alert-ultimatum@2x.png"}
              width="272px"
              height="170px"
              alt=""
            />
          </div>
          <h3 className="fw-bold mt-3 text-center mt-3">
            We have an important update for you!
          </h3>
          <p className="fs-7 text-center mt-4">
            Commencing on <span className="fw-bold">15th June, 2022,</span> all
            new job posts will be charged at{" "}
            <span className="fw-bold">£149+VAT per post,</span> and all job
            posts will expire after <span className="fw-bold">14 days</span>
          </p>
          <p className="fs-7 text-center mt-4">
            All paid jobs posts will be risk free - 100% money back guarantee if
            you don't receive 10 applicants within 72 hours.
          </p>
          <div className="text-center mt-4">
            <Button
              className="btn-sm btn-green px-5 py-2"
              onClick={cancelFunciton}
            >
              Agree & continue
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  is_news_modal_disabled: state.vantage.userDataReducer.is_news_modal_disabled,
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  UpdateNewsModalState: (status) => dispatch(UpdateNewsModalState(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsModal);
