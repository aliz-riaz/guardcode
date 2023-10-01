import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./JobDescriptionModal.module.scss";
import {
  fetchJobDescTemplate,
  setEditor,
  setUserInJobPostingFlow,
} from "../../../redux/actions/jobPostAction";

export const JobDescriptionModal = (props) => {
  const applyTemplate = () => {
    props.setEditor(props.jobDescTemplate?.description);
    props.setShowJobDescription(false);
    props.setUserInJobPostingFlow(true);
    // setShowJobDescription(false)
    // router.push(`${process.env.APP_URL}/jobpost#editor`)
  };

  return (
    <div
      className={`${styles.jobDescTemp_overlay} ${
        props.showJobDescription && styles.show
      }`}
    >
      <div
        className={`${styles.jobDescTemp} ${
          props.showJobDescription && styles.show
        } bg-white`}
      >
        <span
          class={`${styles.close_preview}`}
          onClick={() => {
            props.setShowJobDescription(false);
          }}
        >
          <img src={`${process.env.APP_URL}/images/x-circle.svg`} />
        </span>
        <h4 className="text-black-50">Job description template</h4>
        {props.jobDescTemplate?.description && (
          <>
            <div className="d-flex flex-wrap justify-content-between align-items-center pt-2">
              <h3 className="mb-0 order-2 order-md-1 mt-3 mt-md-0">
                {props.jobDescTemplate?.title}
              </h3>
              <button
                className="btn btn-green btn-md py-2 order-1 order-md-2 w-100 w-md-auto"
                onClick={() => {
                  applyTemplate();
                }}
              >
                Use this template
              </button>
            </div>
            <div className={`${styles.scroll} mt-4`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${props.jobDescTemplate?.description}`,
                }}
                className={`${styles.custom_temp}`}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jobDescTemplate: state.vantage.jobPostReducer.jobDescTemplate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobDescTemplate: (slug) => dispatch(fetchJobDescTemplate(slug)),
    setEditor: (editor) => dispatch(setEditor(editor)),
    setUserInJobPostingFlow: (status) =>
      dispatch(setUserInJobPostingFlow(status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDescriptionModal);
