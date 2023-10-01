import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
} from "reactstrap";
import { connect } from "react-redux";
// import { setDiscardModalForJobPost } from "../../redux/actions/jobPostAction";
import router, { useRouter } from "next/router";
import { Label, Row, Col, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./ShareSWPProfileModal.module.scss";
import { shareSWPProfile } from "../../../redux/actions/staffingAction";

const SettingsSchema = Yup.object().shape({
  settingsEmail: Yup.string()
    .required("Please enter email address")
    .email("Please enter a valid email address"),
});

const ShareSWPProfileModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [modalLink, setModalLink] = useState(false);

  const toggle = () => {
    setModal(!modal);
    // props.updateIsModelOpenAction(!modal).then((resp0) => {})
  };

  const leaveFunction = () => {
    router.push(props.discard_link_for_modal);
    // props.setDiscardModalForJobPost(false);
    props.restJobPostReducer();
  };

  const cancelFunciton = () => {
    //   props.setDiscardModalForJobPost(false);
    props.setProfileModal(false);
  };

  return (
    <div>
      <Modal
        isOpen={props.profileModal}
        className={className + " discardModal " + styles.profile_share_modal}
        backdrop="static"
        keyboard={false}
      >
        <div className={styles.modal_header}>
          <span className="fs-6 fw-bold">Share Profile</span>
          <button onClick={cancelFunciton}>
            <img src={process.env.APP_URL + "/images/x-circle.svg"} alt="" />
          </button>
        </div>
        <div className={`${styles.share_modal_cont}`}>
          <div className={` ${styles.profile_avatar}`}>
            <img src={props.profileImg} width={250} height={250} />
          </div>
          <span className={styles.profile_name}>{props.profileName}</span>
          <p
            className={`d-flex align-items-center mb-0 justify-content-center ${styles.profile_location}`}
          >
            <img
              src={process.env.APP_URL + "/images/map-pin.svg"}
              height="14px"
              alt=""
              className="img-fluid"
            />
            <span className="">{props.profileLocation}</span>
          </p>
          <ul className={`${styles.profile_license} p-0`}>
            {props.profileLicense?.length > 0
              ? props.profileLicense.map((license) => {
                  return (
                    <li className="d-flex">
                      <i>
                        <img
                          src={process.env.APP_URL + "/images/badge-151.svg"}
                          alt=""
                        />
                      </i>
                      <span className={`px-1 ${styles.license_number}`}>
                        {license.course_license}
                      </span>
                      <span>
                        <img
                          src={
                            process.env.APP_URL +
                            "/images/verified-icn-sml-2.svg"
                          }
                          width="16px"
                        />
                      </span>
                    </li>
                  );
                })
              : null}
          </ul>
          <div className={styles.shareWith_email}>
            <h4>Share with:</h4>
            <Formik
              enableReinitialize={true}
              initialValues={{
                settingsEmail: email,
              }}
              validationSchema={SettingsSchema}
              onSubmit={(values) => {
                props
                  .shareSWPProfile(props.user_token, props.profileSlug, email)
                  .then(() => {
                    cancelFunciton();
                    setEmail("");
                  });
              }}
            >
              {({ errors, touched, values }) => (
                <Form id="updatingEmail">
                  <div className={`input-group mb-2 ${styles.input_group}`}>
                    <Field
                      value={email}
                      type="text"
                      name="settingsEmail"
                      className="form-control rounded"
                      placeholder="e.g. johndoe@gmail.com"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    {/* <Label>Notify another email address</Label> */}

                    <div className="input-group-append">
                      <button
                        className="btn btn-gray rounded ml-2 fw-bold"
                        type="submit"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  {errors.settingsEmail && touched.settingsEmail ? (
                    <div className="text-danger text-left">
                      {errors.settingsEmail}
                    </div>
                  ) : null}
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* <ModalFooter>
            <Button color="green" className="btn-sm" onClick={leaveFunction}>Leave</Button>{' '}
            <Button color="secondary"  className="btn-sm" onClick={cancelFunciton}>Cancel</Button>
            </ModalFooter> */}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show_discard_modal_for_job_post:
    state.vantage.jobPostReducer.show_discard_modal_for_job_post,
  discard_link_for_modal: state.vantage.jobPostReducer.discard_link_for_modal,
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  restJobPostReducer: () => dispatch({ type: "RESET_JOBPOST_REDUCER" }),
  shareSWPProfile: (userToken, slug, emailAddress) =>
    dispatch(shareSWPProfile(userToken, slug, emailAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareSWPProfileModal);
