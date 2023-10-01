import styles from "./ShiftsListViewCard.module.scss";
import data from "./data";
import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ShiftsListViewLoading({
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
      <div className={`bg-white w-100 mt-3 table-wrap ${styles.table_wrap}`}>
        <div className={`table-responsive ${styles.persoanl_table}`}>
          <table className={`table ${styles.table}`}>
            <thead>
              <tr>
                <th className={`${styles.icon_first_column}`}></th>
                <th>Shift ID</th>
                <th>Site</th>
                <th>Role</th>
                <th className="text-center">Shift Date</th>
                <th className="text-center">Time</th>
                <th className="text-center">Rate</th>
                <th className="text-center">Booked</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((shift, index) => {
                return (
                  <>
                    <tr className={`${styles.shift_list_card}`}>
                      <td className={`${styles.icon_row}`}>
                        <div className="animated_shimmer w-fit mb-0">
                          <img
                            src={process.env.APP_URL + "/images/report.svg"}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="animated_shimmer w-fit mb-0">
                          {shift.shift_system_id}
                        </div>
                      </td>
                      <td className={`${styles.shift_title}`}>
                        <div className="animated_shimmer w-fit mb-0">
                          {shift.site.title}
                        </div>
                      </td>
                      <td>
                        <div className="animated_shimmer w-fit mb-0">
                          {shift.role.title}
                        </div>
                      </td>
                      <td className={`text-center`}>
                        <div
                          className={`${styles.shift_badge}  ${
                            styles[shift.status.toLowerCase()]
                          } animated_shimmer w-fit mb-0`}
                        >
                          <span
                            className={`${styles.active_dot} mr-2 ${
                              styles[shift.status.toLowerCase()] ==
                                "incomplete" && "d-none"
                            }`}
                          />
                          <span className={`${styles.shift_badge_text}`}>
                            {shift.status}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="animated_shimmer w-fit mb-0">
                          {shift.start_time} - {shift.end_time}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="animated_shimmer w-fit mb-0">
                          £{shift.pay_rate}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="animated_shimmer w-fit mb-0">
                          {`${shift.booked_count}/${shift.candidates_count}`}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="animated_shimmer w-fit mb-0">
                          <div
                            className={`${styles.shift_badge}  ${
                              styles[shift.shift_status.toLowerCase()]
                            } `}
                          >
                            <span
                              className={`${styles.shift_badge_text} text-white`}
                            >
                              {shift.shift_status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <button
                          className={`${styles.candidates_btn} btn btn-green fw-medium animated_shimmer w-fit mb-0`}
                        >
                          {!shift.has_seen && (
                            <span
                              className={`${styles.active_dot_candidates}`}
                            ></span>
                          )}
                          Candidates
                        </button>
                      </td>
                      <td className="text-center">
                        <div className="animated_shimmer w-fit mb-0">
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggleDropdown}
                            end="false"
                            className="d-flex justify-content-end"
                          >
                            <DropdownToggle
                              className={`bg-white border-0 d-inline-flex align-items-center`}
                            >
                              <img
                                src={
                                  process.env.APP_URL +
                                  "/images/more-vertical.svg"
                                }
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="cursor-pointer"
                              />
                            </DropdownToggle>
                            <DropdownMenu className={`box-shadow`}>
                              <DropdownItem
                                className="py-2"
                                onClick={() => handleOptionSelect("Open")}
                              >
                                Open
                              </DropdownItem>
                              <DropdownItem
                                className="py-2"
                                onClick={() => handleOptionSelect("Close")}
                              >
                                Close
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiftsListViewLoading);
