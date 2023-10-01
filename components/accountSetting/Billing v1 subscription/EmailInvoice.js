import React, { useEffect, useState } from "react";

import { Modal, Spinner } from "react-bootstrap";

import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

import styles from "./EmailInvoice.module.scss";
import useSendInvoice from "../../../hooks/Billing/useSendInvoice";

function EmailInvoice(props) {
  const [email, setEmail] = useState([]);
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(false);
  const { mutate, isLoading } = useSendInvoice();

  const sendInvoice = () => {
    // const emailArray = emails.split(",");
    if (emails.length > 0) {
      setError(false);
      mutate({
        id: props.history_id,
        emails: emails,
      });
      !isLoading && props.setOpenEmailModal(false);
      setEmails([]);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    return () => {
      setEmails([]);
    };
  }, []);

  const handleEmailsChange = (_emails) => {
    setEmails(_emails);
  };
  const getEmailLabel = (email, index, removeEmail) => {
    return (
      <div data-tag key={index}>
        {email}
        <span data-tag-handle onClick={() => removeEmail(index)}>
          ×
        </span>
      </div>
    );
  };
  return (
    <>
      {/* <Modal isOpen={true} toggle={toggle}> */}
      <Modal show={props.openEmailModal} centered>
        <div className={`${styles.email_invoice_modal}`}>
          {/* <ModalHeader toggle={toggle}>Email Invoice</ModalHeader> */}
          <div className={`${styles.modal_header}`}>
            <h2>Email Invoice </h2>
            <button
              onClick={() => {
                props.setOpenEmailModal(false);
                setEmails([]);
              }}
            >
              <img src={process.env.APP_URL + "/images/cancel.svg"} />
            </button>
          </div>
          <Modal.Body className="">
            <div className={`${styles.input_field}`}>
              <label>
                Email <span>(Separate your emails with comma)</span>
              </label>
              <ReactMultiEmail
                placeholder="Emails"
                emails={emails}
                onChange={handleEmailsChange}
                getLabel={getEmailLabel}
              />
            </div>
            {error && (
              <p className="text-danger">At least one email is required</p>
            )}
            <div className="text-right mt-3">
              <button className={`${styles.send_button}`} onClick={sendInvoice}>
                <span>Send Email</span>
                {isLoading && (
                  <Spinner className="ml-2" animation="border" size={`sm`} />
                )}
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default EmailInvoice;
