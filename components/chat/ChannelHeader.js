import { connect } from "react-redux";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import _ from "lodash";
import styles from "./ChannelHeader.module.scss";
import { useState } from "react";
import OnlineStatusCheck from "./OnlineStatusCheck";
import PreviewSWPProfile from "../staffing/PreviewSWPProfile/previewSWPProfile";
import { socket } from "../../lib/SocketProvider";

const ChannelHeader = (props) => {
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

            <PreviewSWPProfile
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              userID={props.userData.id}
            />
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
});

const mapDispatchToProps = (dispatch) => ({
  // resetBookingReducerActionTemp: () => dispatch(resetBookingReducerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelHeader);
