import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Input, Tooltip } from "reactstrap";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import { checkEmailExist } from "../../../../redux/actions/teamAccessAction";
import styles from "./InviteMember.module.scss";
import { Spinner } from "react-bootstrap";

let compnaySchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
  // permission: yup.array().required().min(1, "Please select atleast one of them")
  //permisionStatus: yup.boolean().oneOf([true], 'Please select atleast one of them')
});

const InviteMemberForm = (props) => {
  const {
    listTeamMembers,
    setListTeamMembers,
    editTeamMember,
    setEditTeamMember,
  } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [permisionStatus, setPermisionStatus] = useState(false);
  const [permission, setPermission] = useState([
    {
      menu: "Training",
      access: "LIMITED",
    },
    {
      menu: "Staffing",
      access: "LIMITED",
    },
    {
      menu: "CV Search",
      access: "FULL",
    },
    {
      menu: "Chat",
      access: "LIMITED",
    },
    {
      menu: "Shifts",
      access: "LIMITED",
    },
  ]);

  const [emailExist, setEmailExist] = useState(false);
  useEffect(() => {
    if (editTeamMember?.status) {
      // const data = listTeamMembers[editTeamMember['index']]
      setEmail(editTeamMember.data.email_address);
      setPermission(editTeamMember.data.accessibility);
      setPermisionStatus(true);
    }
  }, [editTeamMember]);

  const checkBoxRef = useRef();
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const permissionHandler = (e) => {
    const index = permission.findIndex((val) => val.menu == e.target.name);
    let temArr = [...permission];
    temArr[index]["access"] = e.target.value;
    setPermission(temArr);
  };
  // const permissionHandler = (e) => {
  //     let temArr = [...permission]
  //     let index = temArr.findIndex(obj => obj.menu === e.target.value);
  //     if(access == "LIMITED") {
  //         if (e.target.checked) {
  //             temArr[index]['access'] = 'FULL'
  //             // temArr[index]['status'] = true
  //             //setPermisionStatus(true)
  //         }
  //         else {
  //             temArr[index]['access'] = 'LIMITED'
  //             // temArr[index]['status'] = false
  //             //let check = temArr.every(({ status }) => !status);
  //            // setPermisionStatus(check ? false : true)
  //         }
  //         setPermission(temArr)
  //     }
  // }

  return (
    <div className={`${styles.inviteMemberForm}`}>
      <Formik
        enableReinitialize={true}
        htmlFor="amazing"
        initialValues={{
          email: email,
        }}
        validationSchema={compnaySchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          const checkEmail = await props.checkEmailExist(
            props.user_token,
            email,
            props.organistaionId
          );
          let emailTaken = false;
          listTeamMembers.find((val) => {
            if (val.email_address == email) {
              emailTaken = true;
            }
          });
          if (!emailTaken && !checkEmail.invited) {
            setListTeamMembers((prev) => [
              ...prev,
              {
                email_address: email,
                //access: access,
                accessibility: permission.map((item) => {
                  return {
                    menu: item.menu,
                    access: item.access,
                    // access: access=='FULL' ? 'FULL' : item.access
                  };
                }),
              },
            ]);
          } else {
            toast.error("Email already exist!");
            actions.setSubmitting(false);
          }

          if (!emailTaken && !checkEmail.invited) {
            setEmail("");
            setPermission(
              permission.map((val) => {
                return {
                  menu: val.menu,
                  access: val.menu == "CV Search" ? "FULL" : "LIMITED",
                };
              })
            );

            setEditTeamMember([]);
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                email: "",
              },
            });
          }
        }}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form noValidate>
            <div className={`gl-input-simple mb-4 ${styles.input_field}`}>
              <label htmlFor="email">
                Email{" "}
                <span className={`fw-normal text-black-50 d-none`}>
                  (Separate your emails with comma)
                </span>
              </label>

              <Input
                className="form-control w-100"
                type="email"
                placeholder="John@email.com"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && touched.email ? (
                <div className="error text-danger mt-1">{errors.email}</div>
              ) : null}
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
                  className="tooltip-invite"
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
                      Limited access allows team members to access their own
                      account information.
                    </li>
                  </ul>
                  <p className="text-white text-left pl-2 fs-7">
                    *Only you as the admin can invite or delete team members
                    from the organisation
                  </p>
                  <span className="text-left d-block"></span>
                </Tooltip>
              </label>
              {/* <div className={`${styles.switchBtn}`}>
                                <label className={`d-inline-flex align-items-center`} id={'Tooltip-1'} ><img src={`${process.env.APP_URL}/images/tooltip.svg`} className={`mr-2`} alt="" /> Full Access</label>
                                <Tooltip
                                    placement='top'
                                    isOpen={tooltipOpen}
                                    target={'Tooltip-1'}
                                    toggle={toggle}
                                >You can change access anytime.</Tooltip>
                                <div className='gl-switch-btn ml-2'>
                                    <input type="checkbox" hidden="hidden" id="access"
                                       
                                        onChange={(e) => {
                                           if( e.target.checked) {
                                            setAccess('FULL')
                                            setPermisionStatus(true)
                                        } else {
                                            setAccess('LIMITED')
                                        }
                                        }}
                                        checked={access == 'FULL' ? true : false}
                                    />
                                    <label class="switch" for="access"></label>
                                </div>
                            </div> */}
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
                          if (value.menu == "Chat" && value.access == "FULL") {
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

            <div className={` align-items-center mb-3 d-none`}>
              {/* <div className={`gl-checkbox form-group mb-0 mr-3 ${styles.gl_checkbox}`}>
                                    <label>
                                        <input
                                            name="permission" type="checkbox"
                                            onChange={permissionHandler}
                                            value="Training"
                                            checked={permission.find((value) => {
                                                if (value.menu == "Training" && value.access == 'FULL') {
                                                    return true;
                                                }
                                                return false;
                                            })}
                                        />
                                        <span>Training</span>
                                        <span className={`checkmark ${styles.checkmark}`}></span>
                                    </label>
                                </div> */}
              {/* <div className={`gl-checkbox form-group mb-0 mr-3 ${styles.gl_checkbox}`}>
                                    <label>
                                        <input name="permission" type="checkbox"
                                            onChange={permissionHandler}
                                            value="Staffing"
                                            checked={permission.find((value) => {
                                                if (value.menu == "Staffing" && value.access == 'FULL') {
                                                    return true;
                                                }
                                                return false;
                                            })}
                                        />
                                        <span>Staffing</span>
                                        <span className={`checkmark ${styles.checkmark}`}></span>
                                    </label>
                                </div> */}
              {/* <div className={`gl-checkbox form-group mb-0 mr-3 ${styles.gl_checkbox}`}>
                                    <label>
                                        <input name="permission" type="checkbox"
                                            onChange={permissionHandler}
                                            value="CV Search"
                                            checked={permission.find((value) => {
                                                if (value.menu == "CV Search" && value.access == 'FULL') {
                                                    return true;
                                                }
                                                return false;
                                            })}
                                        />
                                        <span>CV Search</span>
                                        <span className={`checkmark ${styles.checkmark}`}></span>
                                    </label>
                                </div> */}
              {/* <div className={`gl-checkbox form-group mb-0 mr-3 ${styles.gl_checkbox}`}>
                                    <label>
                                        <input name="permission" type="checkbox"
                                            onChange={permissionHandler}
                                            value="Chat"
                                            checked={permission.find((value) => {
                                                if (value.menu == "Chat" && value.access == 'FULL') {
                                                    return true;
                                                }
                                                return false;
                                            })}
                                        />
                                        <span>Chat</span>
                                        <span className={`checkmark ${styles.checkmark}`}></span>
                                    </label>
                                </div> */}
            </div>

            <div>
              <button
                type="submit"
                className={`btn btn-md btn-secondary py-1 px-4 w-100 w-md-auto ${styles.button} d-flex align-items-center`}
                disabled={isSubmitting && true}
              >
                <span className="">
                  {editTeamMember?.status ? "Update" : "Add"}
                </span>
                {isSubmitting && (
                  <span className="translate-x-minus-1 ml-2">
                    <Spinner size="sm" animation="border" />
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  organistaionId: state.vantage.organisationReducer.organistaionId,
});

const mapDispatchToProps = (dispatch) => ({
  checkEmailExist: (userToken, email, organisation_id) =>
    dispatch(checkEmailExist(userToken, email, organisation_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberForm);
//   export default InviteMemberForm
