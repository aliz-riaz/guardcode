import React, { useState } from "react";
import styles from "./TimesheetsTable.module.scss";
import TimesheetTableCard from "./TimesheetsTableCard";
import TimeSheetEmptyStates from "./TimeSheetsEmptyState";
import ActiveShifts from "./ActiveShifts";
import WorkerProfile from "./WorkerProfile";
import WorkerReview from "./WorkerReview";
import useFetchTimesheet from "../../../hooks/Shifts/Timesheets/useFetchTimeSheet";
// import styles from "./TimesheetsTableCard.module.scss";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import TimesheetLoading from "./TimesheetLoading";
import { connect } from "react-redux";
import {
  setCurrentWorkerScreen,
  showWorkerScreen,
} from "../../../redux/actions/shiftActions";
import WorkerActionSteps from "../WorkerActionSteps";

function TimesheetTable(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { data, isLoading, isError, error, refetch } = useFetchTimesheet({
    site_id: "SH86626",
    currentPage: 1,
  });

  if (isLoading) {
    return <TimesheetLoading />;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (isLoading == false && data.length < 0) {
    return <TimeSheetEmptyStates />;
  }

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
                {data.map((key) => {
                  return (
                    // <TimesheetTableCard openWorkerProfile={openWorkerProfile} />
                    <tr>
                      <td>
                        <span>{key.slot.site.title}</span>
                      </td>
                      <td>
                        <span>09 AM - 05PM</span>
                      </td>
                      <td>
                        <span>{key.slot.shift_date}</span>
                      </td>
                      <td>
                        <span>{key.slot.role.title}</span>
                      </td>
                      <td>
                        <span>{key.slot.site.title}</span>
                      </td>
                      <td>
                        <span>08:58 - 17:10</span>
                      </td>
                      <td>
                        <span>8 hrs 12 mins</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className={`${styles.btn_wrapper}`}>
                            <button
                              className="btn btn-sm btn-green"
                              onClick={() => props.showWorkerScreen(true)}
                            >
                              Approve
                            </button>
                            <div className="m-0 text-left fw-normal px-3 pt-1 pb-0">
                              48 hrs left
                            </div>
                          </div>
                          {/* <div className={`${styles.badge} ${styles.dispute}`}>Disputed</div>

          <div className={`${styles.badge} ${styles.approved}`}>Approved</div>

          <div className={`${styles.badge} ${styles.paid}`}>
            <img src={process.env.APP_URL + "/images/c-check.svg"} alt="icon" />
            Paid
          </div> */}

                          <ButtonDropdown
                            direction="down"
                            isOpen={dropdownOpen}
                            toggle={toggleDropdown}
                            className={`${styles.dropdownBtn}`}
                          >
                            <DropdownToggle className="bg-transparent border-0 px-0">
                              <img
                                src={
                                  process.env.APP_URL +
                                  "/images/more-vertical-sm.svg"
                                }
                                width={24}
                                height={24}
                              />
                            </DropdownToggle>
                            <DropdownMenu
                              className={`py-0 ${styles.dropdown_menu}`}
                            >
                              <ul className="list-unstyled mb-0">
                                <li className="cursor-pointer d-flex align-items-center">
                                  <img
                                    src={`${process.env.APP_URL}/images/eye.svg`}
                                    width={"16"}
                                    height={"16"}
                                  />
                                  <span className="pl-2">View</span>
                                </li>
                                <li className="cursor-pointer d-flex align-items-center">
                                  <img
                                    src={`${process.env.APP_URL}/images/feedback.svg`}
                                    width={"16"}
                                    height={"16"}
                                  />
                                  <span className="pl-2">Dispute</span>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </ButtonDropdown>
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
      <WorkerActionSteps />
      {/* <WorkerProfile
        closeWorkerProfile={closeWorkerProfile}
        showProfile={showProfile}
      /> */}
      {/* <ActiveShifts
        closeWorkerProfile={closeWorkerProfile}
        showProfile={showProfile}
      /> */}
      {/* <WorkerReview
        closeWorkerProfile={closeWorkerProfile}
        showProfile={showProfile}
      /> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  currentStepWorkerScreen: state.vantage.shiftReducer.currentStepWorkerScreen,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentWorkerScreen: (step) => dispatch(setCurrentWorkerScreen(step)),
  showWorkerScreen: (status) => dispatch(showWorkerScreen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetTable);
