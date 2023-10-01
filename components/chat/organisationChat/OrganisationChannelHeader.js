import { connect } from "react-redux";
import moment from "moment";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";
import _ from "lodash";
import styles from "./OrganisationChannelHeader.module.scss";
import { useState } from "react";
import OnlineStatusCheck from "./OrganisationOnlineStatusCheck";
import PreviewSWPProfile from "../../staffing/PreviewSWPProfile/previewSWPProfile";
import { socket } from "../../../lib/SocketProvider";
import { setGlobalChannelOne } from "../../../redux/actions/globalChatAction";
// import Tagging from "../../staffing/Tagging/Tagging";
import Tagging from "./Tagging/Tagging";
const OrganisationChannelHeader = (props) => {
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [showMoreJobs, setShowMoreJobs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDetailDropDown, setShowDetailDropDown] = useState(false);

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };

  const toggleDetailDropDown = () => {
    setShowDetailDropDown((prev) => !prev);
  };

  const handleUserBlock = () => {
    props.setChannelList((prev) =>
      prev.map((channel, indx) => {
        if (channel.group_id == props.chat_group_id) {
          return {
            ...channel,
            group: {
              ...channel.group,
              is_blocked: !props.is_channel_blocked,
            },
          };
        } else {
          return channel;
        }
      })
    );
    if (props.chat_group_id == props.g_chat_one.groupID) {
      props.setGlobalChannelOne({
        ...props.g_chat_one,
        isChannelBlocked: !props.is_channel_blocked,
      });
    }
    socket.emit("blockGroup", {
      group_id: props.chat_group_id,
      block: !props.is_channel_blocked,
    });
    setShowDetailDropDown(false);
  };

  return (
    <>
      <div className={`${styles.channel_header} d-flex`}>
        <div className={`${styles.emp_details} d-flex flex-grow-1`}>
          <div className={`${styles.emp_img} flex-shrink-0`}>
            <img
              src={
                props.userData.picture ||
                `${process.env.APP_URL}/images/defaultAvatar.png`
              }
            />
          </div>
          <div className={`${styles.emp_cont} flex-grow-1`}>
            <h4
              className="mb-0 cursor-pointer d-inline-block"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <span>{`${props.userData.firstname} ${props.userData.lastname}`}</span>
              <span className="ml-1 text-success fw-normal d-none d-md-inline-block">
                View profile
              </span>
              <span
                className={`${styles.profile_view} d-inline-block d-md-none`}
              >
                <img src={`${process.env.APP_URL}/images/ProfileView.svg`} />
              </span>
            </h4>
            <br />
            {props.userJobsList.length > 0 && (
              <span class={`${styles.job_names}`}>{`${
                props.userJobsList[0].title ==
                `Chatting with ${props.company_name}`
                  ? `Chatting with ${props.userData.firstname} ${props.userData.lastname}`
                  : props.userJobsList[0].title
              } ${
                props.userJobsList[0].location != "CV-Search"
                  ? "- " + props.userJobsList[0].location
                  : ""
              }`}</span>
            )}
            {props.userJobsList.length > 1 && (
              <span
                class={`${styles.more_jobs} pl-2`}
                onClick={() => setShowMoreJobs((preState) => !preState)}
              >
                <ButtonDropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className={`${styles.dropdownBtn}`}
                >
                  <DropdownToggle className="border-0 px-0 bg-transparent py-0">
                    {` ${props.userJobsList.length - 1} more`}
                  </DropdownToggle>
                  <DropdownMenu className={`${styles.more_jobs_dropdown}`}>
                    <ul className="p-0 m-0">
                      {props.userJobsList.length > 1 &&
                        props.userJobsList.map((job, indx) => {
                          if (indx > 0) {
                            return (
                              <li>
                                <div className="fw-medium">{job.title}</div>
                                {job.location != "CV-Search" && (
                                  <div className="text-black-50 ">
                                    {job.location}
                                  </div>
                                )}
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </DropdownMenu>
                </ButtonDropdown>
              </span>
            )}
            <span className="d-block" style={{ marginTop: "-4px" }}>
              <OnlineStatusCheck userID={props.userData.id} />
            </span>
            <div className={`${styles.tagging_container}`}>
              <Tagging
                jobSeekerId={props.userData.id}
                tags={{
                  employer: {
                    decision_maker_first_name:
                      props.tagging.decision_maker_first_name,
                    decision_maker_last_name:
                      props.tagging.decision_maker_last_name,
                  },
                  notes: props.tagging.tag_message,
                  tag: {
                    color: props.tagging.color,
                    name: props.tagging.tag_name,
                  },
                  updated_at: props.tagging.created_at,
                }}
                setTagging={props.setTagging}
                tagging={props.tagging}
              />
            </div>
            {/* {props.tagging && Object.keys(props.tagging) != 0 && (
              <OverlayTrigger
                trigger={["hover"]}
                placement="bottom"
                overlay={
                  <Popover
                    id="popover-trigger-hover-focus"
                    className={`${styles.tagPopoverBox}`}
                    title="Popover bottom"
                  >
                    <div
                      className={`${styles.tagNotes} bg-black text-white px-2 py-2 `}
                    >
                      <p className="text-white fs-7 mb-2">
                        {props.tagging.decision_maker_first_name} added this tag
                        on{" "}
                        {moment(props.tagging.created_at)
                          .format("YYYY-MM-DD")
                          .toString()}
                      </p>
                      <p className="mb-0 fs-7 text-white">
                        <strong className="d-block">Notes:</strong>
                        <span>{props.tagging.tag_message}</span>
                      </p>
                    </div>
                  </Popover>
                }
              >
                <div
                  className={`${styles.tagging}  d-inline-block px-2 rounded fw-medium text-uppercase cursor-pointer position-absolute`}
                  style={{ backgroundColor: props.tagging.color }}
                >
                  <span>{props.tagging.tag_name}</span>
                </div>
              </OverlayTrigger>
            )} */}
            {props.organisationFilters.chat.switchValue ===
              "My Conversations" && (
              <ButtonDropdown
                isOpen={showDetailDropDown}
                toggle={toggleDetailDropDown}
                className={`${styles.dropdownBtn}  ${styles.dropdown_emp_act} position-absolute`}
              >
                <DropdownToggle className="border-0 px-0 bg-transparent py-0">
                  <img
                    src={`${process.env.APP_URL}/images/more-vertical-green.svg`}
                  />
                </DropdownToggle>
                <DropdownMenu className={`${styles.dropdown_list}`}>
                  <ul className="p-0 m-0">
                    <li onClick={handleUserBlock}>
                      <div className="fw-medium">
                        <i className="d-inline-block">
                          <img
                            src={`${process.env.APP_URL}/images/block.svg`}
                            alt="block icon"
                          />
                        </i>
                        <span className="ml-2">
                          {props.is_channel_blocked
                            ? "Open conversation"
                            : "End conversation"}
                        </span>
                      </div>
                    </li>
                  </ul>
                </DropdownMenu>
              </ButtonDropdown>
            )}
            {showProfile && (
              <PreviewSWPProfile
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                userID={props.userData.id}
                tag={props.tagging}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
  // }
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  chat_group_id: state.vantage.chatReducer.groupID,
  user_has_done_chat_before: state.vantage.chatReducer.setHasDoneChatBefore,
  socket_connection_status: state.vantage.chatReducer.socketConnectionStatus,
  show_chat_channel: state.vantage.chatReducer.showChannel,
  is_channel_blocked: state.vantage.chatReducer.isChannelBlocked,
  company_name: state.vantage.userDataReducer.user_name,
  organisationFilters: state.vantage.organisationReducer.filter,
  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
});

const mapDispatchToProps = (dispatch) => ({
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
  // resetBookingReducerActionTemp: () => dispatch(resetBookingReducerAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationChannelHeader);
