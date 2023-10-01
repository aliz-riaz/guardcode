import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import UpcomingCoursesEmptyState from "./UpcomingCoursesEmptyState";
import { setDashboardUpcomingCourses } from "../../../redux/actions/courseAction";
import styles from "./UpcomingCourses.module.scss";
import { Spinner } from "react-bootstrap";

const UpcomingCourses = (props) => {
  const [loading, setLoading] = useState(false);
  const [accessLevel, setAccessLevel] = useState(
    props.userMenusAccess.find((element) => element.title == "Training")
  );
  useEffect(async () => {
    setLoading(true);
    const courses = await props.setDashboardUpcomingCourses(
      props.user_token,
      accessLevel.access_level == "FULL"
        ? [
            ...props.organisationMembers.map((member) => member.id),
            props.user_id,
          ]
        : [],
      accessLevel.access_level == "FULL" ? "all" : "self"
    );
    setLoading(false);
  }, []);
  return (
    <div className={`${styles.upcoming_courses}`}>
      {props.dashborad_upcoming_courses.length > 0 && (
        <h4 className={`${styles.heading} px-3`}>Upcoming Courses</h4>
      )}
      <div>
        <div className={`${styles.card}`}>
          {loading ? (
            <>
              <div className={`${styles.card_head} animated_shimmer mb-0`}>
                <div className={`${styles.column}`}>
                  <h5>Trainee Name</h5>
                </div>
                <div className={`${styles.column}`}>
                  <h5>Start date</h5>
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((item) => {
                return (
                  <div className={`${styles.card_list} p-1`}>
                    <div
                      className={`${styles.column} animated_shimmer py-3 mb-0`}
                    >
                      <span>Username</span>
                    </div>
                    <div
                      className={`${styles.column} animated_shimmer py-3 mb-0`}
                    >
                      <p>10 june 2023</p>
                    </div>
                  </div>
                );
              })}
              <div className="text-center">
                <a
                  href="#"
                  className={`${styles.button_style} animated_shimmer mb-0`}
                >
                  View all courses
                </a>
              </div>
            </>
          ) : props.dashborad_upcoming_courses.length > 0 ? (
            // false ?
            <>
              <div className={`${styles.card_head}`}>
                <div className={styles.column}>
                  <h5>Trainee Name</h5>
                </div>
                <div className={styles.column}>
                  <h5>Start date</h5>
                </div>
              </div>
              {props.dashborad_upcoming_courses.map((item) => {
                return (
                  <div className={`${styles.card_list}`}>
                    <div className={styles.column}>
                      {/* <span className={style.badge}>{item.course_name}</span> */}
                      <span>{`${item.name} ${item.lname}`}</span>
                    </div>
                    <div className={styles.column}>
                      <p>{item.course_start_date}</p>
                    </div>
                  </div>
                );
              })}
              {props.dashborad_upcoming_courses &&
                props.dashborad_upcoming_courses.length >= 5 && (
                  <div className="text-center">
                    <a
                      href={`${process.env.APP_URL}/all-courses`}
                      className={styles.button_style}
                    >
                      View all courses
                    </a>
                  </div>
                )}
            </>
          ) : (
            <UpcomingCoursesEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  user_id: state.vantage.userDataReducer.user_id,
  dashborad_upcoming_courses:
    state.vantage.coursesReducer.dashborad_upcoming_courses,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
});

const mapDispatchToProps = (dispatch) => ({
  setDashboardUpcomingCourses: (userToken, member, listType) =>
    dispatch(setDashboardUpcomingCourses(userToken, member, listType)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingCourses);
