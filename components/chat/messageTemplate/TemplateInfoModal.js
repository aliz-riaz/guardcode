import React from "react";
import styles from "./MessageTemplateContainer.module.scss";
import Modal from "react-bootstrap/Modal";

const TemplateInfoModal = (props) => {
  const handleClose = () => {
    props.setInfoModal(false);
  };

  return (
    <Modal show={props.infoModal} centered={true} size="lg">
      <div className={`${styles.template_explainer}`}>
        <button className={`${styles.closeBtn}`} onClick={handleClose}>
          <img src={`${process.env.APP_URL}/images/cancel.svg`} />
        </button>
        <div className="row">
          <div className="col-md-7">
            <h2>
              Save time with <br /> chat templates
            </h2>
            <p>
              Deliver a highly personalised candidate experience at scale, with
              chat message templates designed for different stages of your
              hiring pipeline.
            </p>
            <p>Choose from pre-built templates or create your own</p>
          </div>
          <div className="col-md-5">
            <div>
              <div className={`${styles.edit_temp}`}>
                <h3>
                  <img src={`${process.env.APP_URL}/images/add_temp.svg`} />
                  Edit template
                </h3>
              </div>
              <div className={`${styles.temp_exp}`}>
                <div className={`${styles.input_field}`}>
                  <label>Template name</label>
                  <input
                    type="text"
                    placeholder="Greeting!"
                    disabled
                    value="Greetings!"
                    className="form-control"
                  />
                </div>
                <div className={`${styles.input_field}`}>
                  <label>Message template</label>
                  <div className={`${styles.custom_field}`}>
                    Hello <span>|F*NAME|</span>, thank you for your application.
                    I am reviewing your application and will get back to you
                    here if I have any questions from you{" "}
                  </div>
                </div>
                <div className={`${styles.input_field} mb-0`}>
                  <label>Inserts</label>
                  <div className={`${styles.insert_opt}`}>
                    <span>|F*NAME|</span>
                    <span>|L*NAME|</span>
                    <span>|MY*NAME|</span>
                    <span>|MY*EMAIL|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TemplateInfoModal;
