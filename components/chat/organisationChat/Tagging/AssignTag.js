import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "./Tagging.module.scss";
import useAssignTag from "../../../../hooks/Tagging/useAssignTag";

import { Spinner } from "react-bootstrap";
const AssignTag = (props) => {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const { mutate, isLoading } = useAssignTag();
  const maxLength = 50;

  const submittedAssignTag = (e) => {
    e.preventDefault();
    // if (notes) {
    mutate(
      {
        tagID: props.selectedTag.id,
        notes: notes,
        jobseekerID: props.jobSeekerId,
      },
      {
        onSuccess: () => {
          props.setTagAction("list");
          props.toggleTagingDropdown();
          props.setTagAssign(true);
          setError(null);
          props.setTagging({
            ...props.tagging,
            tag_message: notes,
            tag_name: props.selectedTag.name,
            color: props.selectedTag.color,
          });
          //toast.success("Tag assigned successfully.");
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
  user_token: state.vantage.userDataReducer.user_token,
  swp_profile_cv_search_id: state.vantage.cvSearchReducer.swpProfileId,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AssignTag);
