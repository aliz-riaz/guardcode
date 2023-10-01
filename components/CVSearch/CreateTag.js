import { useState } from "react";
import useCreateTag from "../../hooks/Tagging/useCreateTag";
import styles from "./Tagging.module.scss";
const CreateTag = (props) => {
  const [tagColor, setTagColor] = useState("#ffa700");
  const [tagName, setTagName] = useState("");
  const [tagNameError, setTagNameError] = useState(false);
  const { mutate, isLoading } = useCreateTag();

  const submitedTag = () => {
    if (tagName.length > 0) {
      setTagNameError(false);
      mutate({
        name: tagName,
        color: tagColor,
      });
      props.setTagAction("list");
    } else {
      setTagNameError(true);
    }
  };

  return (
    <div className={`${styles.create_tag_box} `}>
      <div className={`${styles.select_tag_color}`}>
        <h6 className="font-roboto fw-normal fs-7 mb-1">Select colour</h6>
        <ul className="text-left pl-0 mb-0">
          <li
            className={`${styles.yellow} ${
              tagColor === "#ffa700" && styles.active
            } d-inline-block rounded-circle cursor-pointer`}
            onClick={() => {
              setTagColor("#ffa700");
            }}
          ></li>
          <li
            className={`${styles.green} ${
              tagColor === "#00cf2e" && styles.active
            } d-inline-block rounded-circle cursor-pointer ml-2`}
            onClick={() => {
              setTagColor("#00cf2e");
            }}
          ></li>
          <li
            className={`${styles.red} ${
              tagColor === "#ff7473" && styles.active
            } d-inline-block rounded-circle cursor-pointer ml-2`}
            onClick={() => {
              setTagColor("#ff7473");
            }}
          ></li>
        </ul>
      </div>
      <div className={`${styles.tag_val} mt-2`}>
        <label className="font-roboto fw-normal fs-7 mb-1">Tag Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTagName(e.target.value)}
        />
        {tagNameError && <div className="text-danger fs-7">Required field</div>}
      </div>
      <div className="text-center mt-1">
        <button
          className={`${styles.save_btn} btn btn-transparent text-decoration-line py-0`}
          onClick={submitedTag}
        >
          Save
        </button>
        <button
          className={`${styles.save_btn} btn btn-transparent text-decoration-line py-0`}
          onClick={() => props.setTagAction("list")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateTag;
