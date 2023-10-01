import { useEffect, useState } from "react";
import { OverlayTrigger, Modal, Spinner, Tooltip } from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import useCurrentTag from "../../../hooks/Tagging/useCurrentTag";
import useRemoveTag from "../../../hooks/Tagging/useRemoveTag";
import moment from "moment";
import styles from "./Tagging.module.scss";
import CreateTag from "./CreateTag";
import AssignTag from "./AssignTag";
const Tagging = (props) => {
  // const [tagAssign, setTagAssign] = useState(false);
  const [tagAssign, setTagAssign] = useState(props.tags ? true : false);
  // assign list create
  const [tagAction, setTagAction] = useState("list");
  const [selectedTag, setSelectedTag] = useState({});
  const [tagingDropdownOpen, setTagingDropdownOpen] = useState(false);

  const { data, isLoading } = useCurrentTag();

  const { mutate } = useRemoveTag();

  const toggleTagingDropdown = () => {
    setTagingDropdownOpen(!tagingDropdownOpen);
    setTagAction("list");
    tagingDropdownOpen && props.tags && setTagAssign(true);
  };

  const removeTagHandler = () => {
    mutate({
      jobseekerId: props.jobSeekerId,
    });
    props.reloadSwpProfile();
    setTagAssign(false);
  };

  return (
    <>
      <div
        className={`${styles.dropdown_for_taging} d-flex justify-content-end`}
      >
        {tagAssign ? (
          <>
            {props.tags ? (
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tag-history">
                    <div className="p-2">
                      <p className="text-white fs-7 text-left mb-2">
                        {props.tags.employer.decision_maker_first_name} added
                        this tag
                        <br /> on{" "}
                        {props.tags &&
                          moment(props.tags.updated_at)
                            .format("YYYY-MM-DD")
                            .toString()}
                      </p>
                      <p className="text-white text-left fs-7 mb-0">
                        <strong className="d-block">Note:</strong>
                        {props.tags && props.tags.notes}
                      </p>
                    </div>
                  </Tooltip>
                }
              >
                <span className={`${styles.applied_tag_box} position-relative`}>
                  <img
                    src={`${process.env.APP_URL}/images/icon_delete_rounded.svg`}
                    className={`${styles.delete_btn} position-absolute cursor-pointer`}
                    onClick={removeTagHandler}
                  />
                  <span
                    className={`${styles.applied_tag}  px-2 py-1 rounded fw-bold text-black text-uppercase cursor-pointer`}
                    style={{ backgroundColor: props.tags?.tag?.color }}
                    onClick={() => {
                      setTagAssign(false);
                      setTagingDropdownOpen(true);
                    }}
                  >
                    {props.tags?.tag?.name}
                  </span>
                </span>
              </OverlayTrigger>
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </>
        ) : (
          <Dropdown
            isOpen={tagingDropdownOpen}
            toggle={toggleTagingDropdown}
            className={`${styles.taging_dropdown}`}
          >
            <DropdownToggle
              className={`${styles.taging_dropdown_btn} btn btn-secondary bg-transparent border-0 px-0 py-0 d-flex align-items-center justify-content-center`}
            >
              <img src={`${process.env.APP_URL}/images/tag1.svg`} />
              <span className="ml-1">Add a tag</span>
            </DropdownToggle>
            <DropdownMenu
              className={`${styles.taging_dropdown_list} px-2 py-2`}
            >
              {/* Listing of tags */}
              {tagAction == "list" && (
                <div className={`${styles.taging_list}`}>
                  {isLoading ? (
                    <Spinner animation="border" size="md" />
                  ) : (
                    data.length > 0 && (
                      <ul className="list-unstyled">
                        {data.map((item) => {
                          return (
                            <>
                              <li
                                className={` px-2 py-1 rounded fw-bold text-black text-uppercase`}
                                style={{ backgroundColor: item.color }}
                                onClick={() => {
                                  setTagAction("assign");
                                  setSelectedTag({
                                    id: item.id,
                                    name: item.name,
                                    color: item.color,
                                  });
                                }}
                              >
                                {item.name}
                              </li>
                              <li></li>
                            </>
                          );
                        })}
                      </ul>
                    )
                  )}
                  <div className="text-center mt-2">
                    <button
                      className={`${styles.save_btn} btn btn-transparent text-decoration-line py-0`}
                      onClick={() => setTagAction("create")}
                    >
                      Create new tag
                    </button>
                  </div>
                </div>
              )}
              {/* Assigning tag */}
              {tagAction == "assign" && (
                <AssignTag
                  jobSeekerId={props.jobSeekerId}
                  selectedTag={selectedTag}
                  setTagAction={setTagAction}
                  setTagAssign={setTagAssign}
                  // reloadSwpProfile={props.reloadSwpProfile}
                  toggleTagingDropdown={toggleTagingDropdown}
                />
              )}
              {/* Creating tag */}
              {tagAction == "create" && (
                <CreateTag
                  setTagAction={setTagAction}
                  // reRenderTaggingList={reRenderTaggingList}
                />
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default Tagging;
