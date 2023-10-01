import { useState } from "react";
import styles from "./ShiftsListViewCard.module.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import useOpenCloseShifts from "../../../hooks/Shifts/useOpenCloseShifts";
import { toast } from "react-toastify";
import {
  setCurrentWorkerScreen,
  showWorkerScreen,
} from "../../../redux/actions/shiftActions";

function ShiftsListViewCard({
  shift,
  organisationFilters,
  organisationAccountOwnerId,
  showWorkerScreen,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mutate, isLoading } = useOpenCloseShifts();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (shift_system_id) => {
    mutate(shift_system_id, {
      onSuccess: () => {
        toast.success("Shift closed successfully.");
        setDropdownOpen(false);
      },
    });
  };

  const allowedStatuses = ["published", "closed"];
  const allowedDateStatuses = ["active", "completed"];

  const candidateAndActionDropDownButtonShowHideLogic =
    allowedStatuses.includes(shift.shift_status.toLowerCase()) &&
    !allowedDateStatuses.includes(shift.shift_date.toLowerCase());

  const candidateButtonDisableLogic =
    shift.shift_status.toLowerCase() == "closed";

  const shouldAllowToOpenTimeSheet =
    shift.shift_date.toLowerCase() == "active" ||
    shift.shift_date.toLowerCase() == "completed";

  const timeSheetClickHandler = () => {
    if (shouldAllowToOpenTimeSheet) {
      // Add code to open timesheet here
      showWorkerScreen(true);
    }
    return;
  };

  return (
    <>
      <tr
        className={`${styles.shift_list_card} ${
          shouldAllowToOpenTimeSheet ? "cursor-pointer" : ""
        }`}
        onClick={timeSheetClickHandler}
      >
        <td className={`${styles.icon_row}`}>
          {shift.shift_requirement.show_exclamation &&
            shift.shift_date.toLowerCase() != "active" && (
              <OverlayTrigger
                placement="right"
                delay={{ show: 150, hide: 300 }}
                overlay={
                  <Tooltip id="tooltip2">
                    This shift is starting within{" "}
                    {shift.shift_requirement.shift_starting_in_hours} hours and
                    is not fully booked
                  </Tooltip>
                }
              >
                <img
                  src={process.env.APP_URL + "/images/report.svg"}
                  className="cursor-pointer"
                />
              </OverlayTrigger>
            )}
        </td>
        <td>{shift.shift_system_id}</td>
        <td className={`${styles.shift_title}`}>
          <div>{shift.site.title}</div>
          {organisationFilters.shifts.switchValue == "All Shifts" && (
            <span className={`mb-0 fw-bold fs-7 ${styles.user_tag}`}>
              Posted by{" "}
              {`${shift.shift.employer.decision_maker_first_name} ${
                shift.shift.employer.decision_maker_last_name
              } ${
                shift.shift.employer.id == organisationAccountOwnerId
                  ? "(Admin)"
                  : ""
              }`}
            </span>
          )}
        </td>
        <td>{shift.role.title}</td>
        <td className={`text-center`}>
          <div
            className={`${styles.shift_badge}  ${
              styles[shift.shift_date.toLowerCase()]
            }`}
          >
            <span
              className={`${styles.active_dot} mr-2 ${
                styles[shift.shift_date.toLowerCase()] == "incomplete" &&
                "d-none"
              }`}
            />
            <span className={`${styles.shift_badge_text}`}>
              {shift.shift_date}
            </span>
          </div>
        </td>
        <td className="text-center">
          {shift.start_time} - {shift.end_time}
        </td>
        <td className="text-center">£{shift.pay_rate}</td>
        <td className="text-center">
          {`${shift.booked_count}/${shift.workers_required}`}
        </td>
        <td className="text-center">
          <div
            className={`${styles.shift_badge}  ${
              styles[shift.shift_status.toLowerCase()]
            }`}
          >
            <span className={`${styles.shift_badge_text} text-white`}>
              {shift.shift_status}
            </span>
          </div>
        </td>
        <td className="text-center">
          {candidateAndActionDropDownButtonShowHideLogic && (
            <Link
              href={`/shifts/worker-approval?shift_id=${shift.shift_system_id}&role=door-supervisor&candidate=interested`}
            >
              <button
                className={`${styles.candidates_btn} btn btn-green fw-medium`}
                disabled={candidateButtonDisableLogic}
              >
                {!shift.has_seen && (
                  <span className={`${styles.active_dot_candidates}`}></span>
                )}
                Candidates
              </button>
            </Link>
          )}
        </td>
        <td className="text-center">
          {candidateAndActionDropDownButtonShowHideLogic &&
            !candidateButtonDisableLogic && (
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
                    src={process.env.APP_URL + "/images/more-vertical.svg"}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="cursor-pointer"
                  />
                </DropdownToggle>
                <DropdownMenu className={`box-shadow`}>
                  <DropdownItem
                    className="py-2"
                    onClick={() => handleOptionSelect(shift.shift_system_id)}
                  >
                    Close
                  </DropdownItem>
                  {/* <DropdownItem
                  className="py-2"
                  onClick={() =>
                    handleOptionSelect("Close", shift.shift_system_id)
                  }
                >
                  Close
                </DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            )}
        </td>
      </tr>
    </>
  );
}

const mapStateToProps = (state) => ({
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
  organisationAccountOwnerId:
    state.vantage.organisationReducer.organisationAccountOwnerId,
});

const mapDispatchToProps = (dispatch) => ({
  showWorkerScreen: (status) => dispatch(showWorkerScreen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsListViewCard);
