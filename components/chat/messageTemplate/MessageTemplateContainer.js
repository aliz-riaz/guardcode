import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styles from "./MessageTemplateContainer.module.scss";
import {
  setSelectedMessageTemplate,
  getMessageTemplate,
} from "../../../redux/actions/globalChatAction";
import AddEditModal from "./AddEditModal";
import TemplateInfoModal from "./TemplateInfoModal";

const MessageTemplateContainer = (props) => {
  const [templateModal, setTemplateModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const [editTemplateTitle, setEditTemplateTitle] = useState(); // this is title input in AddEditModal
  const [editTemplateMessage, setEditTemplateMessage] = useState(); // this is message input in AddEditModal
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showEmptyTemplateForm, setShowEmptyTemplateForm] = useState(false);
  const [editTemplateId, setEditTemplateId] = useState();

  useEffect(async () => {
    props.setSelectedMessageTemplate({}); // it will clear message input box
    await props.getMessageTemplate(props.user_token);
  }, []);

  const handleSelectedMessage = (id, title, message) => {
    props.setSelectedMessageTemplate({
      templateId: id,
      templateTitle: title,
      templateMessage: message,
    });
  };

  const editTemplateHandler = (id, title, message) => {
    setEditTemplateTitle(title);
    setEditTemplateMessage(message);
    setTemplateModal(true);
    setShowTemplateForm(true);
    setEditTemplateId(id);
  };

  const addViewTemplateButtonHandler = () => {
    setShowTemplateForm(false);
    setTemplateModal(true);
    setShowEmptyTemplateForm(false);
  };

  return (
    <>
      {
        <>
          <div className={`${styles.add_template}`}>
            <span onClick={() => setInfoModal(true)} className="cursor-pointer">
              <img
                src={process.env.APP_URL + "/images/info-icon.svg"}
                alt="icon"
              />
            </span>
            <h2 className="fw-normal">
              <img
                src={process.env.APP_URL + "/images/temp-icon.svg"}
                alt="icon"
              />
              Use a template
            </h2>
            {props.messageTemplate?.length > 0 ? (
              <ul>
                {props.messageTemplate.map((templateList, key) => (
                  <li key={key}>
                    <span
                      onClick={() =>
                        handleSelectedMessage(
                          templateList.templateId,
                          templateList.templateTitle,
                          templateList.templateMessage
                        )
                      }
                    >
                      {templateList.templateTitle}
                    </span>
                    <button>
                      <img
                        onClick={() =>
                          editTemplateHandler(
                            templateList.templateId,
                            templateList.templateTitle,
                            templateList.templateMessage
                          )
                        }
                        src={process.env.APP_URL + "/images/edit-icon.svg"}
                        alt="icon"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={`${styles.empty_state} text-center`}>
                {/* <img src={process.env.APP_URL + '/images/no_template_icon.svg'} alt="icon" /> */}
                <h2>Create your own custom chat templates</h2>
              </div>
            )}
            <button onClick={() => addViewTemplateButtonHandler()}>
              View/Add templates
            </button>
          </div>
          <TemplateInfoModal
            setInfoModal={setInfoModal}
            infoModal={infoModal}
          />
        </>
      }
      <AddEditModal
        editTemplateTitle={editTemplateTitle}
        editTemplateMessage={editTemplateMessage}
        setEditTemplateTitle={setEditTemplateTitle}
        setEditTemplateMessage={setEditTemplateMessage}
        setTemplateModal={setTemplateModal}
        templateModal={templateModal}
        showTemplateForm={showTemplateForm}
        setShowTemplateForm={setShowTemplateForm}
        showEmptyTemplateForm={showEmptyTemplateForm}
        setShowEmptyTemplateForm={setShowEmptyTemplateForm}
        editTemplateId={editTemplateId}
        setEditTemplateId={setEditTemplateId}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  messageTemplate: state.vantage.globalChatReducer.messageTemplate,
});

const mapDispatchToProps = (dispatch) => ({
  setMessageTemplate: (template) => dispatch(setMessageTemplate(template)),
  setSelectedMessageTemplate: (selectedTemplate) =>
    dispatch(setSelectedMessageTemplate(selectedTemplate)),
  getMessageTemplate: (user_token) => dispatch(getMessageTemplate(user_token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageTemplateContainer);
