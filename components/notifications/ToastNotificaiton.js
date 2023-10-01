import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import styles from "./ToastNotificaiton.module.scss";
import { useRouter } from "next/router";
import { setScreenToShowOnStaffing } from "../../redux/actions/staffingAction";

export const toastConfig = {
  containerId: "Notifications",
  className: `${styles.toast_container_notifications} toast_container_notifications`,
  position: "top-right",
  // autoClose: 5000,
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ToastNotificaiton = (props) => {
  const router = useRouter();

  const getFileName = (file) => {
    return file.substring(file.lastIndexOf("/") + 1);
  };

  const getFileExtension = (file) => {
    return file.split(/\.(?=[^\.]+$)/)[1];
  };

  const renderScreenForToast = (type) => {
    // if(type == "newMessage" && router.pathname == "/chat")
    // {
    //     props.closeToast()
    //     return
    // }
    switch (type) {
      case "newMessage":
        return (
          <div
            className={`${styles.notfication_wrapper}`}
            onClick={() => router.push("/chat")}
          >
            <div className={`${styles.avatar} flex-shrink-0 rounded-circle`}>
              <img
                src={props.data.jobseekerImage}
                className="img-fluid"
                width={50}
              />
            </div>
            <div className={`${styles.info} flex-grow-1 text-dark ml-3`}>
              <div className={`${styles.name} `}>
                {props.data.jobseekerName}
              </div>
              <div className={`${styles.message} fs-7`}>
                {props.data.notificationMessage.length >= 80
                  ? `${props.data.notificationMessage?.slice(0, 80)} ...`
                  : props.data.notificationMessage}
              </div>
            </div>
          </div>
        );

      case "jobApply":
        return (
          <div
            className={`${styles.notfication_wrapper} align-items-center`}
            onClick={() => {
              props.setScreenToShowOnStaffing("jobs");
              if (router.pathname == "/staffing") {
                router.reload();
                return;
              }
              router.push("/staffing");
            }}
          >
            <div className={`${styles.avatar} flex-shrink-0 rounded-circle`}>
              <img
                // src={process.env.APP_URL + "/images/favicon.svg"}
                src={props.data.jobseekerImage}
                className="img-fluid mr-2"
                width={50}
              />
            </div>
            <div className={`${styles.info} flex-grow-1 text-dark ml-3`}>
              <p className="m-0 fs-7 fw-normal">New application received! </p>
              <div className={`${styles.name} display-3 fw-bold`}>
                {props.data.jobseekerName}{" "}
                <span className="fw-normal">
                  Just applied for {props.data.notificationMessage} job{" "}
                </span>
              </div>
              {/* <div className={`${styles.message} fs-7`}>
                Just applied for {props.data.notificationMessage}
              </div> */}
            </div>
          </div>
        );

      case "newMessageAttachment":
        return (
          <div
            className={`${styles.notfication_wrapper}`}
            onClick={() => router.push("/chat")}
          >
            <div className={`${styles.avatar} flex-shrink-0 rounded-circle`}>
              <img
                src={props.data.jobseekerImage}
                className="img-fluid"
                width={50}
              />
            </div>
            <div className={`${styles.info} flex-grow-1 text-dark ml-3`}>
              <div className={`${styles.name}`}>{props.data.jobseekerName}</div>
              <div className={`${styles.message} fs-7 `}>
                <span className={`${styles.filename} fw-medium`}>
                  {getFileName(props.data.notificationMessage)}
                </span>
                <div className={`d-flex align-items-center`}>
                  <img src={`${process.env.APP_URL}/images/document_img.svg`} />
                  <span className={`ml-1`}>
                    {" "}
                    {getFileExtension(
                      props.data.notificationMessage
                    ).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* <div className={`${styles.notfication_wrapper}`}> */}
      {renderScreenForToast(props.data.notificationType)}
      {/* </div> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  // user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotificaiton);
