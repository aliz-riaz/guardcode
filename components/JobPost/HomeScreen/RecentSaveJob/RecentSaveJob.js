import React, { useEffect, useState } from "react";
import styles from "./RecentSaveJob.module.scss";
import {
  fetchJobTemplate,
  deleteJobTemplate,
  fetchSpecificJobTemplate,
  setDataIntoJobPostingForm,
  setUserInJobPostingFlow,
  setActiveStep,
  setJobTemplate,
  setFromJobTemplate,
  setTemplateIdForJobUpdate,
  setIsJobDraft,
} from "../../../../redux/actions/jobPostAction";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import ConfirmationModal from "../ConfirmationModal";

function RecentSaveJob(props) {
  const [modalData, setModalData] = useState({
    templateStatus: false,
    templateId: 0,
    is_draft: null,
  });
  const toggle = (tempId, is_draft) => {
    setModalData({
      templateStatus: !modalData.templateStatus,
      templateId: tempId,
      is_draft: is_draft,
    });
  };

  const [jobTemplateList, setJobTemplateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getTemplateStatus, setGetTemplateStatus] = useState({
    data: [],
    loading: false,
    templateId: 0,
  });

  useEffect(async () => {
    const listOfTemplate = await props.fetchJobTemplate(props.user_token);
    setJobTemplateList(listOfTemplate);
    setLoading(false);
  }, []);

  const onTemplateClickHandler = async (templateId) => {
    setGetTemplateStatus({ loading: true, templateId });
    const data = await props.fetchSpecificJobTemplate(
      props.user_token,
      templateId
    );
    await props.setDataIntoJobPostingForm(data);
    props.setUserInJobPostingFlow(true);
    props.setFromJobTemplate(true);
    props.setTemplateIdForJobUpdate(data.id);
    if (data.is_drafted) {
      props.setActiveStep(1);
    } else {
      props.setActiveStep(4);
    }
    props.setJobTemplate({
      ...props.jobTemplate,
      name: data.name,
      ownerId: data.owner_id,
    });
    props.setIsJobDraft(Boolean(data.is_drafted));
  };

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div className={`${styles.card}`}>
              <div>
                <div className={`${styles.inner_card}`}>
                  <div className={`${styles.top_wrap}`}>
                    <h3 className="animated_shimmer mb-0">job title</h3>
                  </div>
                  <p className="animated_shimmer mb-1">London, Uk</p>
                  <p className="animated_shimmer mb-0">£0.00</p>
                </div>
                <div className={`${styles.card_footer}`}>
                  <h2 className="w-100 animated_shimmer mb-0">template Name</h2>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  if (jobTemplateList.length == 0) {
    return (
      <div className={`${styles.empty_state}`}>
        <img src={`${process.env.APP_URL}/images/no_saved_jobs.svg`} />
        <p>
          You haven't saved any
          <br className="d-lg-block d-none" /> job templates yet. You can
          <br className="d-lg-block d-none" />
          save a template whishlist
          <br className="d-lg-block d-none" /> posting a job
        </p>
      </div>
    );
  }

  return (
    <>
      {getTemplateStatus.loading && (
        <div className={`${styles.spinner}`}>
          <Spinner />
        </div>
      )}
      {jobTemplateList.length > 0 &&
        jobTemplateList.map((templates) => (
          <div className={`${styles.card}`}>
            {templates.owner_id === props.user_id && (
              <button
                onClick={() => {
                  toggle(templates.id, templates.is_drafted);
                }}
              >
                <img src={`${process.env.APP_URL}/images/bin-icon.svg`} />
              </button>
            )}
            <div
              onClick={() => {
                onTemplateClickHandler(templates.id);
              }}
            >
              <div className={`${styles.inner_card}`}>
                <div className={`${styles.top_wrap}`}>
                  <h3>
                    {templates.job_title} {templates?.ref_number}
                  </h3>
                </div>
                <p>{`${templates.city}, ${templates.postal_code}`}</p>
                {templates.salary_type === "Range" && (
                  <p>
                    £
                    {`${templates.salary_min} - £${templates.salary_max} per hour`}
                  </p>
                )}
                {templates.salary_type === "Fixed Rate" && (
                  <p>£{`${templates.salary} ${templates.pay_frequency}`}</p>
                )}
              </div>
              <div className={`${styles.card_footer}`}>
                <h2 className={templates.is_drafted !== 1 && "w-100"}>
                  {templates.name}
                </h2>

                {templates.is_drafted == 1 && (
                  <span className={styles.drafted}>Draft Job</span>
                )}
              </div>
            </div>
          </div>
        ))}
      <ConfirmationModal
        modalData={modalData}
        toggle={toggle}
        jobTemplateList={jobTemplateList}
        setJobTemplateList={setJobTemplateList}
        setModalData={setModalData}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    user_id: state.vantage.userDataReducer.user_id,
    jobTemplate: state.vantage.jobPostReducer.jobTemplate,
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
    fetchJobTemplate: (userToken) => dispatch(fetchJobTemplate(userToken)),
    deleteJobTemplate: (userToken, templateId) =>
      dispatch(deleteJobTemplate(userToken, templateId)),
    fetchSpecificJobTemplate: (userToken, templateId) =>
      dispatch(fetchSpecificJobTemplate(userToken, templateId)),
    setDataIntoJobPostingForm: (data) =>
      dispatch(setDataIntoJobPostingForm(data)),
    setUserInJobPostingFlow: (step) => dispatch(setUserInJobPostingFlow(step)),
    setActiveStep: (step) => dispatch(setActiveStep(step)),
    setJobTemplate: (value) => dispatch(setJobTemplate(value)),
    setFromJobTemplate: (value) => dispatch(setFromJobTemplate(value)),
    setTemplateIdForJobUpdate: (value) =>
      dispatch(setTemplateIdForJobUpdate(value)),
    setIsJobDraft: (value) => dispatch(setIsJobDraft(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentSaveJob);
