import React, { useState, useEffect } from "react";
import { Table, Spinner } from "reactstrap";

import Link from "next/link";
import { connect } from "react-redux";
import { setDashboardPastCourses } from "../../redux/actions/courseAction";
// import PaginationComponent from "../Common/PaginationComponent";
// import SearchDivCommonComponent from "./SearchDivCommonComponent";
var _ = require("lodash");

function DashboardPastCourseComponent(props) {
  useEffect(() => {
    if (props.switchValue == props.rightText) {
      props.dashboardPastCourses(
        props.user_token,
        props.seletedTeamMembers.length > 0
          ? props.seletedTeamMembers.map((member) => member.id)
          : [
              ...props.organisationMembers.map((member) => member.id),
              props.user_id,
            ],
        "all"
      );
    } else {
      props.dashboardPastCourses(props.user_token, [], "self");
    }
  }, [props.switchValue, props.seletedTeamMembers]);

  const CoursesList = () => {
    let Courses = <> </>;
    if (!_.isEmpty(props.dashborad_past_courses)) {
      let status_class = "";
      Courses = props.dashborad_past_courses.map((course, key) => {
        if (course.result == "Awaiting Result") {
          status_class = "warning";
        } else if (course.result == "Pass") {
          status_class = "success";
        } else if (course.result == "Fail") {
          status_class = "danger";
        }
        return (
          <tr key={course.id}>
            <td>
              <div className="d-flex align-items-center">
                <span className="name_avatar">
                  {course.name.charAt(0).toUpperCase() +
                    course.lname.charAt(0).toUpperCase()}
                </span>
                <span>
                  {course.name.charAt(0).toUpperCase() +
                    course.name.slice(1) +
                    " " +
                    course.lname.charAt(0).toUpperCase() +
                    course.lname.slice(1)}
                  {props.switchValue == props.rightText && (
                    <p>
                      Booked by
                      <em>{`${course.employer_first_name} ${
                        course.employer_last_name
                      } ${
                        course.employer_id == props.organisationAccountOwnerId
                          ? "(Admin)"
                          : ""
                      }`}</em>
                    </p>
                  )}
                </span>
              </div>
            </td>
            <td>{course.id}</td>
            <td>
              <span className={"status " + status_class}>
                {course.result == "Awaiting Result"
                  ? !course.attendance
                    ? "Pending"
                    : course.attendance
                  : course.result}
              </span>
            </td>
            <td>
              <span className="course_badge">{course.course_name}</span>
            </td>
            <td>{course.course_start_date}</td>
            <td>{course.venue_name == null ? "Virtual" : course.venue_name}</td>
          </tr>
        );
      });
    } else {
      Courses = (
        <tr className="text-center mt-5">
          <td colSpan="6" className="no_record">
            No Record Found
          </td>
        </tr>
      );
    }
    return <>{Courses}</>;
  };

  return (
    <>
      <div className="table-card box-shadow">
        <h4>Past Courses</h4>
        <div className="table-wrap">
          <div className="table-responsive courses-table">
            <Table>
              <thead>
                <tr>
                  <th className="name">Name</th>
                  <th className="ref">Booking Ref.</th>
                  <th className="ref">Status</th>
                  <th className="course">Course</th>
                  <th className="date">Start date</th>
                  <th className="location">Location</th>
                </tr>
              </thead>
              <tbody>
                {props.is_request_loader == true ? (
                  <>
                    {[1, 2, 3, 4, 5].map((item) => {
                      return (
                        <tr className="text-left">
                          {[1, 2, 3, 4, 5, 6].map((item) => {
                            return (
                              <td>
                                <span className="animated_shimmer mb-0 w-50 d-block">
                                  Name
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  CoursesList()
                )}
              </tbody>
            </Table>
            {!props.is_request_loader ? (
              !_.isEmpty(props.dashborad_past_courses) ? (
                <div className="view_all">
                  <Link href="/past-course">View all</Link>
                </div>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    dashborad_past_courses: state.vantage.coursesReducer.dashborad_past_courses,
    // dashborad_past_courses: [],
    courses_pagination_links:
      state.vantage.coursesReducer.courses_pagination_links,
    is_request_loader: state.vantage.commonReducer.is_request_loader,
    user_id: state.vantage.userDataReducer.user_id,
    organisationMembers: state.vantage.organisationReducer.organisationMembers,
    isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
    organisationAccountOwnerId:
      state.vantage.organisationReducer.organisationAccountOwnerId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dashboardPastCourses: (user_token, members, listType) =>
    dispatch(setDashboardPastCourses(user_token, members, listType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPastCourseComponent);
