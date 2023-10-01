import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Modal } from "react-bootstrap";
import { Input, Tooltip } from "reactstrap";
import { Spinner } from "react-bootstrap";
import styles from "./EditMemberModal.module.scss";

import { updateMember } from "../../../redux/actions/teamAccessAction";

const EditMemberModal = (props) => {
  const {
    editModal,
    setEditModal,
    singleMember,
    setSingleMember,
    closeEditModal,
    setUpdateMember,
  } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [email, setEmail] = useState(singleMember.email_address);
  const [permission, setPermission] = useState(
    singleMember.access_unserialised
  );

  const toggle = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    return () => {
      setEmail("");
      setPermission([]);
      setTooltipOpen(false);
    };
  }, []);

  const permissionHandler = (e) => {
    const index = permission.findIndex((val) => val.menu == e.target.name);
    let temArr = [...permission];
    temArr[index]["access"] = e.target.value;
    setPermission(temArr);
  };
  return (
    <Modal show={editModal} size="lg" centered={true}>
      <div className={`${styles.inviteTeamModal}`}>
        <Modal.Header className={`p-4`}>
          <Modal.Title>
            <h2 className={`m-0`}>Edit Team Members</h2>
          </Modal.Title>
          <button className={`${styles.closeBtn}`} onClick={closeEditModal}>
            {" "}
            <img src={`${process.env.APP_URL}/images/cancel.svg`} />
          </button>
        </Modal.Header>
        <Modal.Body className={`p-4`}>
          <div className={`${styles.inviteMemberForm}`}>
            <Formik
              enableReinitialize={true}
              htmlFor="amazing"
              initialValues={{
                email: email,
                permission: permission,
              }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const obj = {
                  invitation: {
                    accessibility: permission.map((item) => {
                      return {
                        menu: item.menu,
                        access: item.access,
                      };
                    }),
                  },
                };

                const data = await props.updateMember(
                  props.user_token,
                  obj,
                  singleMember.id
                );
                if (data) {
                  setUpdateMember(true);
                  setEditModal(false);
                  setEmail("");
                  setPermission([]);
                }
                actions.setSubmitting(false);
              }}
            >
              {({ errors, values, touched, isSubmitting, setFieldValue }) => (
                <Form>
                  <div className={`gl-input-simple mb-3 ${styles.input_field}`}>
                    <label htmlFor="email">
                      Email{" "}
                      <span className={`fw-normal text-black-50`}>
                        (Separate your emails with comma)
                      </span>
                    </label>
                    {}
                    <Input
                      className="form-control w-100 disabled"
                      type="email"
                      placeholder="John@email.com"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled="true"
                    />
                  </div>
                  <div
                    className={`d-flex align-items-center justify-content-between`}
                  >
                    <label>
                      Permissions
                      <span
                        id={"Tooltip-1"}
                        className="d-inline-block translate-x-minus-1 ml-2"
                      >
                        <img src={`${process.env.APP_URL}/images/info1.svg`} />
                      </span>
                      <Tooltip
                        placement="bottom"
                        isOpen={tooltipOpen}
                        target={"Tooltip-1"}
                        toggle={toggle}
                      >
                        <ul className="list-bullet text-left p-0">
                          <li>
                            Full access allows users to access company-wide
                            information.
                            <br />
                          </li>
                          <li>
                            Limited access allows team members to access their
                            own account information.
                          </li>
                        </ul>
                        <p className="text-white text-left pl-2 fs-7">
                          *Only you as the admin can invite or delete team
                          members from the organisation
                        </p>
                        <span className="text-left d-block"></span>
                      </Tooltip>
                    </label>
                  </div>
                  <div className={`${styles.permission_container} my-2`}>
                    <div
                      className={`${styles.permission_row} row justify-content-between align-items-center my-2`}
                    >
                      <div className="col-12 col-md-4 fw-medium">Training</div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-center mt-2 mt-md-0">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Training"
                              className=""
                              value="LIMITED"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Training" &&
                                  value.access == "LIMITED"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Limited Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-end">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Training"
                              className=""
                              value="FULL"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Training" &&
                                  value.access == "FULL"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Full Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.permission_row} row justify-content-between my-2`}
                    >
                      <div className="col-12 col-md-4 fw-medium">Staffing</div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-center mt-2 mt-md-0">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Staffing"
                              className=""
                              value="LIMITED"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Staffing" &&
                                  value.access == "LIMITED"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Limited Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-end">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Staffing"
                              className=""
                              value="FULL"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Staffing" &&
                                  value.access == "FULL"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Full Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.permission_row} row justify-content-between my-2`}
                    >
                      <div className="col-12 col-md-4 fw-medium">Chat</div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-center mt-2 mt-md-0">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Chat"
                              className=""
                              value="LIMITED"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Chat" &&
                                  value.access == "LIMITED"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Limited Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-end">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Chat"
                              className=""
                              value="FULL"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Chat" &&
                                  value.access == "FULL"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Full Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.permission_row} row justify-content-between my-2`}
                    >
                      <div className="col-12 col-md-4 fw-medium">Shifts</div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-center mt-2 mt-md-0">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Shifts"
                              className=""
                              value="LIMITED"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Shifts" &&
                                  value.access == "LIMITED"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Limited Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 d-flex justify-content-md-end">
                        <div className="gl-radio mb-0">
                          <label>
                            <input
                              type="radio"
                              name="Shifts"
                              className=""
                              value="FULL"
                              onChange={permissionHandler}
                              checked={permission.find((value) => {
                                if (
                                  value.menu == "Shifts" &&
                                  value.access == "FULL"
                                ) {
                                  return true;
                                }
                                return false;
                              })}
                            />
                            <span>Full Access</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`d-flex justify-content-end`}>
                    <button
                      type="submit"
                      className={`btn btn-md btn-green py-2 px-4 w-100 w-md-auto d-md-flex align-items-center ${styles.button}`}
                      // onClick={submitInvite}
                    >
                      <span>Update</span>
                      {isSubmitting && (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="ml-2"
                        />
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  updateMember: (userToken, obj, id) =>
    dispatch(updateMember(userToken, obj, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMemberModal);
