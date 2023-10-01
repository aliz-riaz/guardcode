import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import styles from "./PersonalInfo.module.scss";
import EditPersonalInfo from "./EditPersonalInfo";

const PersonalInfo = (props) => {
  const [isEdit, setEdit] = useState(false);

  return (
    <>
      <div
        className={`table-card box-shadow mt-4 mt-md-4 ${styles.table_card} bg-white`}
      >
        {isEdit ? (
          <EditPersonalInfo setEditHandler={setEdit} />
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-between pr-md-3">
              <h4>Details</h4>
              <button
                className={`btn btn-md bg-transparent py-2 mr-2 px-0 mt-2 mt-md-0 ${styles.edit_button}`}
                onClick={() => setEdit(true)}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-2.svg"}
                  alt="icon"
                />
                <span>Edit</span>
              </button>
            </div>
            <div className={`table-wrap ${styles.table_wrap}`}>
              <div
                className={`table-responsive courses-table ${styles.persoanl_table}`}
              >
                <table className={`table ${styles.table}`}>
                  <tbody>
                    <tr>
                      <th>Name:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${props.decision_maker_first_name} ${props.decision_maker_last_name}`}</span>
                          <span></span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                        </div>
                      </td>
                      <th>Email:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{props.user_email}</span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                          <span></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Mobile Number:</th>
                      <td colSpan="3">
                        <div className="d-flex align-items-center">
                          <span>{`${
                            props.employers_mobile_number
                              ? props.employers_mobile_number
                              : "-"
                          }`}</span>
                          <span></span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Company Name:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${
                            props.user_name ? props.user_name : "-"
                          }`}</span>
                          <span></span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                        </div>
                      </td>
                      <th>Company Size:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${
                            props.organisationSize
                              ? props.organisationSize
                              : "-"
                          }`}</span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                          <span></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Address 1:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${
                            props.address1 ? props.address1 : "-"
                          }`}</span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                          <span></span>
                        </div>
                      </td>
                      <th>Address 2:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${
                            props.address2 ? props.address2 : "-"
                          }`}</span>
                          <span></span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>City:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${props.city ? props.city : "-"}`}</span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                          <span></span>
                        </div>
                      </td>

                      <th>Postcode:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{`${
                            props.postcode ? props.postcode : "-"
                          }`}</span>
                          <span></span>
                          {/* <span className='edit text-success cursor-pointer ml-2'>Edit</span> */}
                        </div>
                      </td>
                    </tr>
                    {/* <tr> */}
                    {/* <th>Role:</th>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <span>Admin</span>
                                                    <span className='edit text-success cursor-pointer ml-2'>Edit</span>
                                                </div>
                                                </td> */}

                    {/* </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  user_name: state.vantage.userDataReducer.user_name,
  user_id: state.vantage.userDataReducer.user_id,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  user_email: state.vantage.userDataReducer.user_email,
  organisationSize: state.vantage.organisationReducer.organisationSize,
  employers_mobile_number: state.vantage.userDataReducer.user_mobile_number,
  address1: state.vantage.userDataReducer.address1,
  address2: state.vantage.userDataReducer.address2,
  city: state.vantage.userDataReducer.city,
  postcode: state.vantage.userDataReducer.postcode,
  allOrganisations: state.vantage.organisationReducer.allOrganisations,
});

const mapDispatchToProps = (dispatch) => ({
  // userSignUpAction: (name, company_name, email, phoneNumber) => dispatch(userSignUpAction(name, company_name, email, phoneNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
