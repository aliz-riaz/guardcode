import React, { useState } from "react";
import EmailInvoice from "./EmailInvoice";
import styles from "./BillingHistory.module.scss";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import moment from "moment";

function BillingHistoryCard(props) {
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };

  const downloadBillingHistory = async (url, filename) => {
    window.open(url, "_blank");
  };
  // incomplete p invoice generate nahi ho ge
  const status = {
    incomplete: "Unpaid",
    completed: "Paid",
    payment_failed: "Failed",
    cancelled: "Cancelled",
  };

  return (
    <tr>
      <td className="text-left">
        {props.data.title}
        {props.data.completed_at && (
          <>
            {` - `}
            {moment(props.data.completed_at, "YYYY-MM-DD").format("MMMM YYYY")}
          </>
        )}
      </td>
      <td className="text-center">£{props.data.amount}</td>
      <td className="text-center">
        {props.data.validity_start && props.data.validity_end
          ? `${moment(props.data.validity_start, "YYYY-MM-DD").format(
              "DD MMMM YYYY"
            )} - 
        ${moment(props.data.validity_end, "YYYY-MM-DD").format("DD MMMM YYYY")}`
          : "N/A"}
      </td>
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
          {props.data.is_free == 0 && props.data.status != "incomplete" ? (
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
                  <li
                    className="cursor-pointer d-flex align-items-center"
                    onClick={() =>
                      downloadBillingHistory(
                        props.data.invoice_pdf_url,
                        "pdf-file"
                      )
                    }
                  >
                    <img
                      src={`${process.env.APP_URL}/images/download-icon.svg`}
                      width={"18"}
                      height={"19"}
                    />
                    <span className="pl-2">Download</span>
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
