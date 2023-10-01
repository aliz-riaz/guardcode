import { connect } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Tagging.module.scss";
import useAssignTag from "../../../hooks/Tagging/useAssignTag";
import { fetchUserSWPProfile } from "../../../redux/actions/staffingAction";
import { Spinner } from "react-bootstrap";
const AssignTag = (props) => {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const { mutate, isLoading } = useAssignTag();
  const maxLength = 50;
  const submittedAssignTag = () => {
    // if (notes) {
    mutate(
      {
        tagID: props.selectedTag.id,
        notes: notes,
        jobseekerID: props.jobSeekerId,
      },
      {
        onSuccess: () => {
          //toast.success("Tag assigned successfully");
          props.setTagAction("list");
          // props.reloadSwpProfile();
          !isLoading &&
            props.fetchUserSWPProfile(
              props.user_token,
              props.latest_job_id_for_applicant_tab,
              props.job_applicants_for_applicants_tab[props.swp_profile_index]
                .slug
            );
          props.toggleTagingDropdown();
          props.setTagAssign(true);
          setError(null);
        },
      }
    );
    // } else {
    //   setError("Required field");
    // }
  };
  const handleTextChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setNotes(e.target.value);
      setError(null);
    } else {
      setError("Your input exceeded the maximum length!");
    }
  };

  return (
    <div className={`${styles.selected_tag_box} `}>
      <span
        className={` px-2 py-1 rounded fw-bold text-black text-uppercase`}
        style={{ backgroundColor: props.selectedTag.color }}
      >
        {props.selectedTag.name}
      </span>
      <textarea
        className="form-control mt-3"
        maxLength={maxLength}
        placeholder="Notes optional"
        onChange={handleTextChange}
      ></textarea>
      <p className="fs-7 text-right mb-0">
        {maxLength - notes.length} characters left
      </p>
      {error && <div className="text-danger fs-7">{error}</div>}
      <div className="text-center mt-2">
        <button
          className={`${styles.save_btn} btn btn-transparent text-decoration-line py-0`}
          onClick={submittedAssignTag}
        >
          Save
          {isLoading && <Spinner size="sm" className="ml-1" />}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
  swp_profile_index: state.vantage.staffingReducer.swpProfileIndex,
  user_token: state.vantage.userDataReducer.user_token,
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignTag);
