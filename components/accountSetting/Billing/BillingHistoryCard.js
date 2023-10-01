import React, { useState } from "react";
import EmailInvoice from "./EmailInvoice";
import styles from "./BillingHistory.module.scss";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import moment from "moment";

import useDownloadInvoice from "../../../hooks/Billing/useDownloadInvoice";
import { Spinner } from "react-bootstrap";

function BillingHistoryCard(props) {
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const { mutate, isLoading } = useDownloadInvoice();

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };

  // const downloadBillingHistory = async (url, filename) => {
  //   window.open(url, "_blank");
  // };
  // incomplete p invoice generate nahi ho ge
  const status = {
    incomplete: "Unpaid",
    completed: "Paid",
    payment_failed: "Failed",
    cancelled: "Cancelled",
  };

  const DownloadInvoice = () => {
    mutate({
      id: props.data.id,
      fileName: props.data.title,
    });
  };

  return (
    <tr>
      <td className="text-left fw-light">
        {props.data.created_at && (
          <>
            {moment(props.data.created_at, "YYYY-MM-DD").format("DD MMMM YYYY")}
          </>
        )}
      </td>
      <td className="text-center">{props.data.title}</td>
      <td className="text-center">£{props.data.amount}</td>
      <td className="text-center">
        <span
          className={`${styles.badge} 
          ${props.data.status == "cancelled" && styles.cancelled}
          ${props.data.status == "payment_failed" && styles.cancelled}
          ${props.data.status == "completed" && styles.completed}
          ${props.data.status == "incomplete" && styles.incomplete}
          `}
        >
          {status[props.data.status]}
        </span>
      </td>
      <td className="text-center">
        <div className={`${styles.dropdown_list}`}>
          {/* if we use packges so below condition will apply before status check */}
          {/* props.data.is_free == 0 && */}
          {props.data.status != "incomplete" ? (
            <ButtonDropdown
              direction="left"
              isOpen={dropdownOpen}
              toggle={toggle}
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
                    {isLoading ? (
                      <span className="d-flex justify-content-center align-items-center w-100">
                        <Spinner animation="border" size="sm" />
                      </span>
                    ) : (
                      <span onClick={() => DownloadInvoice(props.data.id)}>
                        <img
                          src={`${process.env.APP_URL}/images/download-icon.svg`}
                          width={"18"}
                          height={"19"}
                        />
                        <span className="pl-2">Download</span>
                      </span>
                    )}
                  </li>
                  <li
                    className="cursor-pointer d-flex align-items-center"
                    onClick={() => setOpenEmailModal(!openEmailModal)}
                  >
                    <img
                      src={`${process.env.APP_URL}/images/email-outline.svg`}
                      width={"18"}
                      height={"19"}
                    />
                    <span className="pl-2">Send Email</span>
                  </li>
                </ul>
              </DropdownMenu>
            </ButtonDropdown>
          ) : (
            "-"
          )}
          <EmailInvoice
            history_id={props.data.id}
            openEmailModal={openEmailModal}
            setOpenEmailModal={setOpenEmailModal}
          />
        </div>
      </td>
    </tr>
  );
}

export default BillingHistoryCard;
