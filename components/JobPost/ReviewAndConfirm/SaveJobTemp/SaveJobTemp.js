import React, { useEffect, useRef, useState } from "react";
import styles from "./SaveJobTemp.module.scss";
import { connect } from "react-redux";
import {
  setAvailableForTeam,
  setSaveJobAsTemplate,
  setJobTemplate,
  setUpdateJobTemplate,
} from "../../../../redux/actions/jobPostAction";

const SaveJobTemp = (props) => {
  const saveThisJobInput = useRef();

  const setAvailableForTeamHandler = (value) => {
    props.setAvailableForTeam(value);
  };

  if (props.fromJobTemplate && props.updateJobTemplate === false) {
    return <div></div>;
  }

  const onClickHandler = (value) => {
    if (props.fromJobTemplate && props.jobTemplate?.ownerId == props.user_id) {
      props.setUpdateJobTemplate(Number(value.target.checked));
      props.jobTemplate.name === "" &&
        props.setJobTemplate({
          ...props.jobTemplate,
          error: value.target.checked,
        });
    } else {
      props.setSaveJobAsTemplate(Number(value.target.checked));
      props.jobTemplate.name === "" &&
        props.setJobTemplate({
          ...props.jobTemplate,
          error: value.target.checked,
        });
    }
  };

  const draftSaveAsDraftHandler = (value) => {
    props.setSaveJobAsTemplate(Number(value.target.checked));
    props.jobTemplate.name === "" &&
      props.setJobTemplate({
        ...props.jobTemplate,
        error: value.target.checked,
      });
  };

  const templateNameHandler = (e) => {
    // const re = /^[a-zA-Z0-9 ]+$/;
    // if (re.test(e.target.value)) {
    if (e.target.value) {
      props.setJobTemplate({
        ...props.jobTemplate,
        name: e.target.value,
        error: false,
        errorMessage: "",
      });
    } else if (e.target.value === "") {
      props.setJobTemplate({
        ...props.jobTemplate,
        name: e.target.value,
        error: saveThisJobInput.current.checked ? true : false,
        errorMessage: saveThisJobInput.current.checked
          ? "Template name is required"
          : "",
      });
    }
  };

  if (props.is_job_draft) {
    return (
      <div className={`${styles.saveJobTemp}`}>
        <div className={`gl-checkbox form-group ${styles.gl_checkbox}`}>
          <label>
            <input
              name="servicesChecked"
              type="checkbox"
              ref={saveThisJobInput}
              onChange={(e) => draftSaveAsDraftHandler(e)}
              checked={props.saveJobAsTemplate}
            />
            <span className="fs-6">Save this draft as a template</span>
            <span className="checkmark"></span>
            <p>Save this draft to save for the next time you post the job.</p>
          </label>
        </div>
        <div
          className={`gl-input position-relative mb-4 ${styles.others_input}`}
        >
          <input
            type="text"
            name="templateName"
            className="form-control"
            value={props.jobTemplate?.name}
            onChange={(e) => templateNameHandler(e)}
            placeholder="Template name"
            maxLength={100}
          />
          <label>Template name</label>
          {props.jobTemplate?.error && (
            <div className="text-danger mt-2">
              {props.jobTemplate?.errorMessage}
            </div>
          )}
        </div>

        <div className={`${styles.card_footer}`}>
          <h3 className={`fs-6 fw-medium mb-3`}>
            Select who can use this template
          </h3>
          <div className={`${styles.input_wrap}`}>
            <div className={`gl-radio ${styles.gl_radio}`}>
              <label className="mb-0">
                <input
                  type="radio"
                  name="whoCanUse"
                  value="onlyMe"
                  onChange={() => setAvailableForTeamHandler(0)}
                  checked={props.isAvailableForTeam === 0 && true}
                />
                <span className="fw-normal">Only me</span>
                <span className="checkmark"></span>
              </label>
            </div>
            <div className={`gl-radio ${styles.gl_radio}`}>
              <label className="mb-0">
                <input
                  type="radio"
                  name="whoCanUse"
                  value="everyone"
                  onChange={() => setAvailableForTeamHandler(1)}
                  checked={props.isAvailableForTeam === 1 && true}
                />
                <span className="fw-normal">Everyone in my organisation</span>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.saveJobTemp}`}>
      <div className={`gl-checkbox form-group ${styles.gl_checkbox}`}>
        <label>
          {props.fromJobTemplate &&
          props.jobTemplate?.ownerId == props.user_id ? (
            <input
              name="servicesChecked"
              type="checkbox"
              ref={saveThisJobInput}
              onChange={(e) => onClickHandler(e)}
              checked={props.updateJobTemplate}
            />
          ) : (
            <input
              name="servicesChecked"
              type="checkbox"
              ref={saveThisJobInput}
              onChange={(e) => onClickHandler(e)}
              checked={props.saveJobAsTemplate}
            />
          )}
          <span className="fs-6">
            {props.fromJobTemplate &&
            props.jobTemplate?.ownerId == props.user_id
              ? "Update"
              : "Save"}{" "}
            this job as a template
          </span>
          <span className="checkmark"></span>
          <p>
            {props.fromJobTemplate &&
            props.jobTemplate?.ownerId == props.user_id
              ? "Update"
              : "Save"}{" "}
            this template to save for the next time you post the job.
          </p>
        </label>
      </div>
      <div className={`gl-input position-relative mb-4 ${styles.others_input}`}>
        <input
          type="text"
          name="templateName"
          className="form-control"
          value={props.jobTemplate?.name}
          onChange={(e) => templateNameHandler(e)}
          placeholder="Template name"
          maxLength={100}
        />
        <label>Template name</label>
        {props.jobTemplate?.error && (
          <div className="text-danger mt-2">
            {props.jobTemplate?.errorMessage}
          </div>
        )}
      </div>

      <div className={`${styles.card_footer}`}>
        <h3 className={`fs-6 fw-medium mb-3`}>
          Select who can use this template
        </h3>
        <div className={`${styles.input_wrap}`}>
          <div className={`gl-radio ${styles.gl_radio}`}>
            <label className="mb-0">
              <input
                type="radio"
                name="whoCanUse"
                value="onlyMe"
                onChange={() => setAvailableForTeamHandler(0)}
                checked={props.isAvailableForTeam === 0 && true}
              />
              <span className="fw-normal">Only me</span>
              <span className="checkmark"></span>
            </label>
          </div>
          <div className={`gl-radio ${styles.gl_radio}`}>
            <label className="mb-0">
              <input
                type="radio"
                name="whoCanUse"
                value="everyone"
                onChange={() => setAvailableForTeamHandler(1)}
                checked={props.isAvailableForTeam === 1 && true}
              />
              <span className="fw-normal">Everyone in my organisation</span>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    user_id: state.vantage.userDataReducer.user_id,
    jobTitle: state.vantage.jobPostReducer.jobTitle,
    jobTemplate: state.vantage.jobPostReducer.jobTemplate,
    saveJobAsTemplate: state.vantage.jobPostReducer.saveJobAsTemplate,
    isAvailableForTeam: state.vantage.jobPostReducer.isAvailableForTeam,
    fromJobTemplate: state.vantage.jobPostReducer.fromJobTemplate,
    updateJobTemplate: state.vantage.jobPostReducer.updateJobTemplate,
    is_job_draft: state.vantage.jobPostReducer.is_job_draft,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAvailableForTeam: (status) => dispatch(setAvailableForTeam(status)),
    setSaveJobAsTemplate: (status) => dispatch(setSaveJobAsTemplate(status)),
    setJobTemplate: (value) => dispatch(setJobTemplate(value)),
    setUpdateJobTemplate: (value) => dispatch(setUpdateJobTemplate(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveJobTemp);
