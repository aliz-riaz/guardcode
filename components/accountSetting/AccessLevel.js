import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import styles from "./AccessLevel.module.scss";

const AccessLevel = (props) => {
  return (
    <>
      <div
        className={`table-card box-shadow mt-4 mt-md-4 ${styles.table_card}`}
      >
        <h4 className="pt-4">Access Levels</h4>
        <div className={`table-wrap ${styles.table_wrap}`}>
          <div
            className={`table-responsive courses-table ${styles.persoanl_table}`}
          >
            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th className="text-center">Training</th>
                  <th className="text-center">Staffing</th>
                  <th className="text-center">Chat</th>
                  <th className="text-center">Shifts</th>
                  <th className="text-center">Role</th>
                </tr>
              </thead>
              <tbody>
                {props.allOrganisations &&
                  props.allOrganisations.length > 0 &&
                  props.allOrganisations.map((item) => {
                    return (
                      <tr>
                        <td>{item.title}</td>
                        {item.menus.map((val) => {
                          return (
                            <>
                              {val.title == "CV Search" ? null : (
                                <td className="text-center">
                                  <span
                                    className={`${
                                      val.access_level == "FULL"
                                        ? styles.full_badge
                                        : styles.limited_badge
                                    }`}
                                  >
                                    {val.access_level == "FULL"
                                      ? "Full "
                                      : "Limited "}
                                    Access
                                  </span>
                                </td>
                              )}
                            </>
                          );
                        })}

                        <td className="text-center">
                          {item.role == 1 ? "Admin" : "Member"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  allOrganisations: state.vantage.organisationReducer.allOrganisations,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccessLevel);
