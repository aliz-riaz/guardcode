import React, { useEffect, useState } from "react";
import styles from "./JobDescriptionTemplateList.module.scss";
import {
  fetchJobDescriptionTitles,
  setJobDescriptionTemplate,
  setJobDescriptionTitles,
  fetchJobDescTemplate,
} from "../../../../redux/actions/jobPostAction";
import { connect } from "react-redux";
import JobDescriptionModal from "../JobDescriptionModal";
import { Spinner } from "reactstrap";

function JobDescriptionTemplateList(props) {
  const [loading, setLoading] = useState(true);
  const [showJobDescription, setShowJobDescription] = useState(false);

  useEffect(async () => {
    const fetchAllTitles = await props.fetchJobDescriptionTitles();
    props.setJobDescriptionTitles(fetchAllTitles);
    setLoading(false);
  }, []);

  const openJobDescriptionHandler = async (slug) => {
    const template = await props.fetchJobDescTemplate(slug);
    props.setJobDescriptionTemplate(template);
    setShowJobDescription(true);
  };

  if (loading) {
    return (
      <>
        <div className={`${styles.jobDescWrap}`}>
          <div className={`${styles.heading_wrap} mb-4`}>
            <img src={`${process.env.APP_URL}/images/add-file.svg`} />
            <h3>Start with a job description template</h3>
          </div>
          <div className={`${styles.temp_list}`}>
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4].map((item) => {
              return (
                <div className={`${styles.temp_card}`}>
                  <h4 className="animated_shimmer mb-0">Title</h4>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return props.jobDescTitles && props.jobDescTitles.length > 0 ? (
    <>
      <div className={`${styles.jobDescWrap}`}>
        <div className={`${styles.heading_wrap} mb-4`}>
          <img src={`${process.env.APP_URL}/images/add-file.svg`} />
          <h3>Start with a job description template</h3>
        </div>
        <div className={`${styles.temp_list}`}>
          {props.jobDescTitles.map((item, key) => (
            <div
              className={`${styles.temp_card}`}
              key={key}
              onClick={() => openJobDescriptionHandler(item.slug)}
            >
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
      <JobDescriptionModal
        setShowJobDescription={setShowJobDescription}
        showJobDescription={showJobDescription}
        jobDescTitles={props.jobDescTitles}
      />
    </>
  ) : (
    "No template found"
  );
}

const mapStateToProps = (state) => {
  return {
    jobDescTitles: state.vantage.jobPostReducer.jobDescTitles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobDescriptionTitles: () => dispatch(fetchJobDescriptionTitles()),
    setJobDescriptionTemplate: (temp) =>
      dispatch(setJobDescriptionTemplate(temp)),
    setJobDescriptionTitles: (titles) =>
      dispatch(setJobDescriptionTitles(titles)),
    fetchJobDescTemplate: (slug) => dispatch(fetchJobDescTemplate(slug)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDescriptionTemplateList);
