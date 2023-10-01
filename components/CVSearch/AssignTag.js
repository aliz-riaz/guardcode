import { useState } from "react";
import styles from "./Tagging.module.scss";
import useAssignTag from "../../hooks/Tagging/useAssignTag";
import { Spinner } from "react-bootstrap";
const AssignTag = (props) => {
  const [notes, setNotes] = useState("");
  const { mutate, isLoading } = useAssignTag();

  const submittedAssignTag = () => {
    mutate({
      tagID: props.selectedTag.id,
      notes: notes,
      jobseekerID: props.jobSeekerId,
    });
    props.setTagAction("list");
    props.setReloadSwpProfile(true);
    props.toggleTagingDropdown();
    props.setTagAssign(true);
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
        placeholder="Notes optional"
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <div className="text-center mt-2">
        <button
          className={`${styles.save_btn} btn btn-transparent text-decoration-line py-0`}
          onClick={submittedAssignTag}
        >
          Save
          {isLoading && <Spinner size="sm" />}
        </button>
      </div>
    </div>
  );
};
export default AssignTag;
