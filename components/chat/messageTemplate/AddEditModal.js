import React, { useRef, useState, useEffect } from "react";
import styles from "./MessageTemplateContainer.module.scss";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {
  addMessageTemplate,
  deleteMessageTemplate,
  updateMessageTemplate,
} from "../../../redux/actions/globalChatAction";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";

const AddEditModal = (props) => {
  const messageTemplateName = useRef();
  const messageTemplateMessage = useRef();

  const [templateName, setTemplateName] = useState();
  const [templateMessage, setTemplateMessage] = useState();
  const [onSubmit, setOnSubmit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  // const [focusField, setFocusField] = useState(null)

  const handleClose = () => {
    props.setTemplateModal(false);
  };

  const onClickTemplate = (id, title, message) => {
    props.setShowTemplateForm(true); // it will show form
    props.setShowEmptyTemplateForm(false);
    props.setEditTemplateTitle(title);
    props.setEditTemplateMessage(message);
    props.setEditTemplateId(id);
  };

  const showEmptyTemplateHandler = () => {
    props.setShowEmptyTemplateForm(true);
    props.setShowTemplateForm(false);
    if (templateName != "" || templateMessage != "") {
      props.setEditTemplateId("");
      setTemplateName("");
      setTemplateMessage("");
    }
  };

  const addTemplateHandler = async () => {
    setOnSubmit(true);
    const data = await props.addMessageTemplate(props.user_token, {
      name: templateName,
      message: templateMessage,
    });
    if (data.ok) {
      setOnSubmit(false);
      props.setShowTemplateForm(false);
      props.setShowEmptyTemplateForm(false);
    } else {
      setOnSubmit(false);
    }
  };

  const deleteTemplateHandler = async (id) => {
    setOnDelete(true);
    const data = await props.deleteMessageTemplate(props.user_token, id);
    if (data.ok) {
      // setOnSubmit(false)
      setOnDelete(false);
      props.setShowTemplateForm(false);
      props.setShowEmptyTemplateForm(false);
    } else {
      setOnDelete(false);
    }
  };

  const closeTemplateFormHandler = () => {
    props.setShowTemplateForm(false);
    props.setShowEmptyTemplateForm(false);
  };

  const updateMessageTemplateHandler = async (templateId) => {
    setOnSubmit(true);
    const messageData = {
      id: templateId,
      name: props.editTemplateTitle,
      message: props.editTemplateMessage,
    };
    const data = await props.updateMessageTemplate(
      props.user_token,
      messageData
    );
    if (data.ok) {
      setOnSubmit(false);
    } else {
      setOnSubmit(false);
    }
  };

  const insertMyText = (textToInsert) => {
    messageTemplateMessage.current.focus();
    let cursorPosition = messageTemplateMessage.current.selectionStart;
    let textBeforeCursorPosition =
      messageTemplateMessage.current.value.substring(0, cursorPosition);
    let textAfterCursorPosition =
      messageTemplateMessage.current.value.substring(
        cursorPosition,
        messageTemplateMessage.current.value.length
      );
    messageTemplateMessage.current.value =
      textBeforeCursorPosition + textToInsert + textAfterCursorPosition;
    messageTemplateMessage.current.setSelectionRange(
      messageTemplateMessage.current.value.length,
      cursorPosition + textToInsert.length
    );
  };

  return (
    <Modal show={props.templateModal} centered={true} size="lg">
      <div className={`${styles.chat_template_modal}`}>
        <button className={`${styles.closeBtn}`} onClick={handleClose}>
          <img src={`${process.env.APP_URL}/images/cancel.svg`} />
        </button>
        <div className={`${styles.list_view}`}>
          <h2>
            <img src={`${process.env.APP_URL}/images/add_temp.svg`} />
            Add/Edit chat templates
          </h2>
          <div className={`${styles.list_wrapper}`}>
            {props.messageTemplate?.length > 0 &&
              props.messageTemplate.map((templateList, key) => (
                <div
                  key={key}
                  className={`${styles.list}`}
                  onClick={() =>
                    onClickTemplate(
                      templateList.templateId,
                      templateList.templateTitle,
                      templateList.templateMessage
                    )
                  }
                >
                  <span>{templateList.templateTitle}</span>
                  <img
                    src={`${process.env.APP_URL}/images/chevron-right-sm.svg`}
                  />
                </div>
              ))}
          </div>
          <button
            className={`${styles.addlist_btn}`}
            onClick={() => showEmptyTemplateHandler()}
          >
            Add new template{" "}
            <img src={`${process.env.APP_URL}/images/chevron-right-sm.svg`} />
          </button>
        </div>
        {props.showTemplateForm && (
          <div className={`${styles.temp_view}`}>
            <div className={`${styles.input_field}`}>
              <label>Template name</label>
              <input
                type="text"
                maxLength="40"
                value={props.editTemplateTitle}
                ref={messageTemplateName}
                onChange={(e) => props.setEditTemplateTitle(e.target.value)}
                placeholder="Greeting!"
                className="form-control"
              />
            </div>
            <div className={`${styles.input_field}`}>
              <label>Message template</label>
              <textarea
                maxLength="5000"
                onBlur={(e) => props.setEditTemplateMessage(e.target.value)}
                ref={messageTemplateMessage}
                value={props.editTemplateMessage}
                onChange={(e) => props.setEditTemplateMessage(e.target.value)}
                placeholder="Greeting!"
                className="form-control"
              />
            </div>
            <div className={`${styles.input_field}`}>
              <label>Inserts</label>
              <div className={`${styles.insert_opt}`}>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={"tooltip-" + "1"}>
                      Applicant/Jobseeker's first name
                    </Tooltip>
                  }
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|F*NAME|");
                    }}
                  >
                    |F*NAME|
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={"tooltip-" + "2"}>
                      Applicant/Jobseeker's last name
                    </Tooltip>
                  }
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|L*NAME|");
                    }}
                  >
                    |L*NAME|
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={"tooltip-" + "3"}>Your name</Tooltip>}
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|MY*NAME|");
                    }}
                  >
                    |MY*NAME|
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={"tooltip-" + "4"}>Your email address</Tooltip>
                  }
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|MY*EMAIL|");
                    }}
                  >
                    |MY*EMAIL|
                  </span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              {onSubmit === false ? (
                <button
                  className="btn btn-sm btn-green fs-7 fw-medium"
                  onClick={() =>
                    updateMessageTemplateHandler(props.editTemplateId)
                  }
                  disabled={
                    props.editTemplateTitle?.length > 0 &&
                    props.editTemplateMessage?.length > 0
                      ? false
                      : true
                  }
                >
                  Save
                </button>
              ) : (
                <button className="btn btn-sm btn-transparent shadow-none fs-7 fw-medium">
                  <Spinner animation="border" size="sm" variant="primary" />
                </button>
              )}
              {onDelete === false ? (
                <button
                  onClick={() => deleteTemplateHandler(props.editTemplateId)}
                  className="btn px-0 btn-transparent shadow-none fs-7 fw-medium"
                >
                  <img src={`${process.env.APP_URL}/images/trash-ico.svg`} />
                </button>
              ) : (
                <button className="btn px-0 btn-transparent shadow-none fs-7 fw-medium">
                  <Spinner animation="border" size="sm" variant="primary" />
                </button>
              )}
            </div>
          </div>
        )}
        {props.showTemplateForm === false && props.showEmptyTemplateForm && (
          <div className={`${styles.temp_view}`}>
            <div className={`${styles.input_field}`}>
              <label>Template name</label>
              <input
                type="text"
                maxLength="40"
                value={templateName}
                ref={messageTemplateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
                className="form-control"
              />
            </div>
            <div className={`${styles.input_field}`}>
              <label>Message template</label>
              <textarea
                maxLength="5000"
                onBlur={(e) => setTemplateMessage(e.target.value)}
                ref={messageTemplateMessage}
                value={templateMessage}
                onChange={(e) => setTemplateMessage(e.target.value)}
                placeholder="Enter message template"
                className="form-control"
              />
            </div>
            <div className={`${styles.input_field}`}>
              <label>Inserts</label>
              <div className={`${styles.insert_opt}`}>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={"tooltip-" + "1"}>
                      Applicant/Jobseeker's first name
                    </Tooltip>
                  }
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|F*NAME|");
                    }}
                  >
                    |F*NAME|
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={"tooltip-" + "2"}>
                      Applicant/Jobseeker's last name
                    </Tooltip>
                  }
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|L*NAME|");
                    }}
                  >
                    |L*NAME|
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={"tooltip-" + "3"}>Your name</Tooltip>}
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|MY*NAME|");
                    }}
                  >
                    |MY*NAME|
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={"tooltip-" + "4"}>Your email address</Tooltip>
                  }
                >
                  <span
                    onClick={(e) => {
                      insertMyText("|MY*EMAIL|");
                    }}
                  >
                    |MY*EMAIL|
                  </span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              {onSubmit === false ? (
                <button
                  className="btn btn-sm btn-green fs-7 fw-medium"
                  onClick={() => addTemplateHandler()}
                  disabled={
                    templateName?.trim().length > 0 &&
                    templateMessage?.trim().length > 0
                      ? false
                      : true
                  }
                >
                  Save
                </button>
              ) : (
                <button className="btn btn-sm btn-transparent shadow-none fs-7 fw-medium">
                  <Spinner animation="border" size="sm" variant="primary" />
                </button>
              )}
              <button
                onClick={() => closeTemplateFormHandler()}
                className="btn px-0 btn-transparent shadow-none fs-7 fw-medium"
              >
                <img
                  src={`${process.env.APP_URL}/images/trash-ico.svg`}
                  disabled={
                    templateName?.trim().length > 0 &&
                    templateMessage?.trim().length > 0
                      ? false
                      : true
                  }
                />
              </button>
            </div>
          </div>
        )}
        {props.showTemplateForm === false &&
          props.showEmptyTemplateForm === false && (
            <div className={`${styles.empty_state}`}>
              <p className="fs-7 text-center">
                <img src={`${process.env.APP_URL}/images/arrow-left.svg`} />
                Select a template to edit
                <br /> or create a new one
              </p>
            </div>
          )}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  messageTemplate: state.vantage.globalChatReducer.messageTemplate,
  selectedMessageTemplate:
    state.vantage.globalChatReducer.selectedMessageTemplate,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedMessageTemplate: (selectedTemplate) =>
    dispatch(setSelectedMessageTemplate(selectedTemplate)),
  addMessageTemplate: (user_token, template_data) =>
    dispatch(addMessageTemplate(user_token, template_data)),
  deleteMessageTemplate: (user_token, template_id) =>
    dispatch(deleteMessageTemplate(user_token, template_id)),
  updateAction: (templateId, templateTitle, templateMessage) =>
    dispatch(updateAction(templateId, templateTitle, templateMessage)),
  updateMessageTemplate: (user_token, data) =>
    dispatch(updateMessageTemplate(user_token, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
