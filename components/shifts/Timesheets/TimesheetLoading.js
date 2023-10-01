import styles from "./TimesheetsTable.module.scss";
import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function TimesheetLoading({
  shift,
  organisationFilters,
  organisationAccountOwnerId,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div className={`table-card mt-4 mt-md-4 ${styles.table_card}`}>
        <div className={`table-wrap ${styles.table_wrap}`}>
          <div
            className={`table-responsive courses-table ${styles.timesheet_table}`}
          >
            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Shift Timings</th>
                  <th>Date</th>
                  <th>Role</th>
                  <th>Site</th>
                  <th>Clock In/Out</th>
                  <th>Worked Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((key) => {
                  return (
                    <tr>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            Title
                          </div>
                        </span>
                      </td>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            09 AM - 05PM
                          </div>
                        </span>
                      </td>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            Date
                          </div>
                        </span>
                      </td>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            Title
                          </div>
                        </span>
                      </td>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            Title
                          </div>
                        </span>
                      </td>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            08:58 - 17:10
                          </div>
                        </span>
                      </td>
                      <td>
                        <span>
                          <div className="animated_shimmer w-fit mb-0">
                            8 hrs 12 mins
                          </div>
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className={`${styles.btn_wrapper}`}>
                            <div className="animated_shimmer w-fit mb-0">
                              <button className="btn btn-sm btn-green">
                                Approve
                              </button>
                            </div>
                            <div className="m-0 text-left fw-normal px-3 pt-1 pb-0">
                              <div className="animated_shimmer w-fit mb-0">
                                48 hrs left
                              </div>
                            </div>
                          </div>
                        </div>
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
}

const mapStateToProps = (state) => ({
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
  organisationAccountOwnerId:
    state.vantage.organisationReducer.organisationAccountOwnerId,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetLoading);
