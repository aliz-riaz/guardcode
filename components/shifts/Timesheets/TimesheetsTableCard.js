import React, { useState } from "react";
import styles from "./TimesheetsTableCard.module.scss";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";

function TimesheetTableCard({ openWorkerProfile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <tr>
      <td>
        <span>Cameron Williamson</span>
      </td>
      <td>
        <span>09 AM - 05PM</span>
      </td>
      <td>
        <span>08/12/2023</span>
      </td>
      <td>
        <span>Door Supervisor</span>
      </td>
      <td>
        <span>Manchester City Arena</span>
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
              onClick={openWorkerProfile}
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
                src={process.env.APP_URL + "/images/more-vertical-sm.svg"}
                width={24}
                height={24}
              />
            </DropdownToggle>
            <DropdownMenu className={`py-0 ${styles.dropdown_menu}`}>
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
}

export default TimesheetTableCard;
