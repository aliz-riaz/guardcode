import React, { useState, useEffect } from "react";
import { Table, Spinner } from "reactstrap";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { connect } from "react-redux";
import {
  upcomingCourseAction,
  setUpcomingCurrentPage,
  upcomingCoursesSetState,
  setUpcomingSelectedCourses,
} from "../../redux/actions/courseAction";
import PaginationComponent from "../Common/PaginationComponent";
var _ = require("lodash");

function UpcomingCourseComponent(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [CoursesListObject, setCoursesListObject] = useState([
    { id: 12, value: "Door Supervisor Training" },
    { id: 13, value: "CCTV Training" },
    { id: 44, value: "Security Guard Training" },
    { id: 29, value: "Close Protection Training" },
    { id: 119, value: "Top-Up for Door Supervisors" },
    { id: 120, value: "Top-Up for Security Guards" },
    { id: 61, value: "Emergency First Aid At Work (EFAW)" },
    { id: 33, value: "Personal Licence Training (APLH)" },
  ]);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const loadUpcomingCoursesWithReduxData = () => {
    if (props.switchValue == props.rightText) {
      props.upcomingCourseAction(
        props.user_token,
        props.currentpage,
        {
          [props.searchFilterField]: props.searchFilterOrder,
        },
        props.searchFieldValue,
        props.selectedCourses,
        props.seletedTeamMembers.length > 0
          ? props.seletedTeamMembers.map((member) => member.id)
          : [
              ...props.organisationMembers.map((member) => member.id),
              props.user_id,
            ],
        "all"
      );
    } else {
      props.upcomingCourseAction(
        props.user_token,
        props.currentpage,
        {
          [props.searchFilterField]: props.searchFilterOrder,
        },
        props.searchFieldValue,
        props.selectedCourses,
        [],
        "self"
      );
    }
  };

  useEffect(() => {
    loadUpcomingCoursesWithReduxData();
  }, [
    props.currentpage,
    props.searchFilterField,
    props.searchFilterOrder,
    props.selectedCourses,
    props.switchValue,
    props.seletedTeamMembers,
  ]);

  const handleAllChecked = (event) => {
    let this_value = event.target.value;
    if (!props.selectedCourses.includes(this_value))
      props.setSelectedCourses([...props.selectedCourses, this_value]);

    if (!event.target.checked) {
      if (props.selectedCourses.includes(this_value)) {
        let index = props.selectedCourses.indexOf(this_value);
        if (index > -1) {
          props.selectedCourses.splice(index, 1);
          props.setSelectedCourses([...props.selectedCourses]);
        }
      }
    }
    props.setCurrentPage(1);
  };
  const searchChange = (event) => {
    if (event.target.value == "") {
      if (props.switchValue == props.rightText) {
        props.upcomingCourseAction(
          props.user_token,
          1,
          {
            [props.searchFilterField]: props.searchFilterOrder,
          },
          "",
          props.selectedCourses,
          props.seletedTeamMembers.length > 0
            ? props.seletedTeamMembers.map((member) => member.id)
            : [
                ...props.organisationMembers.map((member) => member.id),
                props.user_id,
              ],
          "all"
        );
      } else {
        props.upcomingCourseAction(
          props.user_token,
          1,
          {
            [props.searchFilterField]: props.searchFilterOrder,
          },
          "",
          props.selectedCourses,
          [],
          "self"
        );
      }
    }
    props.setUpcomingCoursesState({
      upcoming_courses_currentpage: 1,
      upcoming_courses_searchFilterField: props.searchFilterField,
      upcoming_courses_searchFilterOrder: props.searchFilterOrder,
      upcoming_courses_searchFieldValue: event.target.value,
    });
  };

  const searchButton = (event) => {
    event.preventDefault();
    props.setCurrentPage(1);
    loadUpcomingCoursesWithReduxData();
  };

  const moment = require("moment");

  const searchFilterFunction = (field, order) => {
    if (props.searchFilterField != field) {
      props.setUpcomingCoursesState({
        upcoming_courses_currentpage: 1,
        upcoming_courses_searchFilterField: field,
        upcoming_courses_searchFilterOrder: "ASC",
        upcoming_courses_searchFieldValue: props.searchFieldValue,
      });
    } else {
      if (props.searchFilterOrder == "ASC") {
        props.setUpcomingCoursesState({
          upcoming_courses_currentpage: 1,
          upcoming_courses_searchFilterField: props.searchFilterField,
          upcoming_courses_searchFilterOrder: "DESC",
          upcoming_courses_searchFieldValue: props.searchFieldValue,
        });
      } else if (props.searchFilterOrder == "DESC") {
        props.setUpcomingCoursesState({
          upcoming_courses_currentpage: 1,
          upcoming_courses_searchFilterField: props.searchFilterField,
          upcoming_courses_searchFilterOrder: "ASC",
          upcoming_courses_searchFieldValue: props.searchFieldValue,
        });
      }
    }
  };

  const UpcomingCoursesList = () => {
    let UpcommingCourses = <></>;
    if (!_.isEmpty(props.upcomming_courses)) {
      UpcommingCourses = props.upcomming_courses.map((course, key) => {
        let status_class = "";
        if (course.payment_status == "Paid") {
          status_class = "success";
        } else if (course.payment_status == "Unpaid") {
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
                      Booked by{" "}
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
              <span className={`course_badge status ${status_class}`}>
                {course.payment_status}
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
      return <>{UpcommingCourses}</>;
    } else {
      UpcommingCourses = (
        <tr className="text-center mt-5">
          <td colSpan="6" className="no_record">
            No Record Found
          </td>
        </tr>
      );
      return <>{UpcommingCourses}</>;
    }
  };

  return (
    <>
      <div className="table-card box-shadow">
        <h4>Upcoming Courses</h4>
        <div className="table_filters">
          <div className="filter_dropdown">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                  >
                    <g fill="none" fillRule="evenodd" strokeLinecap="square">
                      <g stroke="#3BD55A" strokeWidth="2">
                        <g>
                          <g>
                            <path
                              d="M13 6.5L21 6.5M4 6.5L7 6.5M8 4H11V8H8zM13 18.5L21 18.5M4 18.5L7 18.5M8 17H11V21H8zM19 12.5L21 12.5M4 12.5L14 12.5M14 11H17V15H14z"
                              transform="translate(-316.000000, -236.000000) translate(289.000000, 173.000000) translate(27.000000, 63.000000)"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </i>
                <span className="d-none d-md-block">Filter</span>
              </DropdownToggle>
              <DropdownMenu className="box-shadow">
                {CoursesListObject.map((item, key) => {
                  let is_Checked_temp = false;
                  if (!_.isEmpty(props.selectedCourses)) {
                    is_Checked_temp = props.selectedCourses.includes(
                      item.id.toString()
                    );
                  }
                  return (
                    <div className="dropdown-item" key={item.id}>
                      <FormGroup check className="gl-checkbox">
                        <Label>
                          <span className="">{item.value}</span>
                          <Input
                            type="checkbox"
                            name="all"
                            value={item.id}
                            onClick={handleAllChecked}
                            // checked={}
                            defaultChecked={is_Checked_temp ? true : false}
                          />
                          <span className="checkmark"></span>
                        </Label>
                      </FormGroup>
                    </div>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="search_bar">
            <Form>
              <input
                className="form-control"
                placeholder="Name, Booking Ref, Location"
                value={props.searchFieldValue}
                onChange={searchChange}
              />
              <button onClick={searchButton}>
                {" "}
                <img
                  src={process.env.APP_URL + "/images/search-btn.svg"}
                  width="25px"
                  height="25px"
                  className="d-none d-md-block"
                />{" "}
              </button>
            </Form>
          </div>
        </div>
        <div className="table-wrap">
          <div className="table-responsive courses-table">
            <Table>
              <thead>
                <tr>
                  <th
                    onClick={() => searchFilterFunction("name", "ASC")}
                    className="name"
                  >
                    Name{" "}
                    <span className="ml-2">
                      <img
                        src={
                          props.searchFilterField == "name" &&
                          props.searchFilterOrder == "ASC"
                            ? process.env.APP_URL +
                              "/images/filter_sort_btn_aesc.svg"
                            : process.env.APP_URL +
                              "/images/filter_sort_btn_desc.svg"
                        }
                        height="16px"
                        alt="sort"
                      />{" "}
                    </span>
                  </th>
                  <th
                    onClick={() => searchFilterFunction("result", "ASC")}
                    className="ref"
                  >
                    Booking Ref.
                    <span className="ml-2">
                      <img
                        src={
                          props.searchFilterField == "result" &&
                          props.searchFilterOrder == "ASC"
                            ? process.env.APP_URL +
                              "/images/filter_sort_btn_aesc.svg"
                            : process.env.APP_URL +
                              "/images/filter_sort_btn_desc.svg"
                        }
                        height="16px"
                        alt="sort"
                      />
                    </span>
                  </th>
                  <th
                    onClick={() =>
                      searchFilterFunction("payment_status", "ASC")
                    }
                    className="course"
                  >
                    Status
                    <span className="ml-2">
                      <img
                        src={
                          props.searchFilterField == "payment_status" &&
                          props.searchFilterOrder == "ASC"
                            ? process.env.APP_URL +
                              "/images/filter_sort_btn_aesc.svg"
                            : process.env.APP_URL +
                              "/images/filter_sort_btn_desc.svg"
                        }
                        height="16px"
                        alt="sort"
                      />
                    </span>
                  </th>
                  <th
                    onClick={() => searchFilterFunction("course_name", "ASC")}
                    className="course"
                  >
                    Course
                    <span className="ml-2">
                      <img
                        src={
                          props.searchFilterField == "course_name" &&
                          props.searchFilterOrder == "ASC"
                            ? process.env.APP_URL +
                              "/images/filter_sort_btn_aesc.svg"
                            : process.env.APP_URL +
                              "/images/filter_sort_btn_desc.svg"
                        }
                        height="16px"
                        alt="sort"
                      />
                    </span>
                  </th>

                  <th
                    onClick={() =>
                      searchFilterFunction("course_start_date", "ASC")
                    }
                    className="date"
                  >
                    Start date
                    <span className="ml-2">
                      <img
                        src={
                          props.searchFilterField == "course_start_date" &&
                          props.searchFilterOrder == "ASC"
                            ? process.env.APP_URL +
                              "/images/filter_sort_btn_aesc.svg"
                            : process.env.APP_URL +
                              "/images/filter_sort_btn_desc.svg"
                        }
                        height="16px"
                        alt="sort"
                      />
                    </span>
                  </th>
                  <th
                    onClick={() => searchFilterFunction("venue_name", "ASC")}
                    className="location"
                  >
                    Location
                    <span className="ml-2">
                      <img
                        src={
                          props.searchFilterField == "venue_name" &&
                          props.searchFilterOrder == "ASC"
                            ? process.env.APP_URL +
                              "/images/filter_sort_btn_aesc.svg"
                            : process.env.APP_URL +
                              "/images/filter_sort_btn_desc.svg"
                        }
                        height="16px"
                        alt="sort"
                      />{" "}
                    </span>
                  </th>
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
                  UpcomingCoursesList()
                )}
              </tbody>
            </Table>
          </div>
          {props.is_request_loader == false ? (
            !_.isEmpty(props.upcomming_courses) ? (
              props.totalPages <= 1 ? null : (
                <PaginationComponent
                  currentpage={props.currentpage}
                  setCurrentpage={(set_current_page) =>
                    props.setCurrentPage(set_current_page)
                  }
                  contentDataLinks={props.upcomming_courses_pagination_links}
                ></PaginationComponent>
              )
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    upcomming_courses: state.vantage.coursesReducer.upcomming_courses,
    upcomming_courses_pagination_links:
      state.vantage.coursesReducer.upcomming_courses_pagination_links,
    is_request_loader: state.vantage.commonReducer.is_request_loader,
    currentpage: state.vantage.coursesReducer.upcoming_courses_currentpage,
    searchFilterField:
      state.vantage.coursesReducer.upcoming_courses_searchFilterField,
    searchFilterOrder:
      state.vantage.coursesReducer.upcoming_courses_searchFilterOrder,
    searchFieldValue:
      state.vantage.coursesReducer.upcoming_courses_searchFieldValue,
    selectedCourses:
      state.vantage.coursesReducer.upcoming_courses_selectedCourses,
    totalPages: state.vantage.coursesReducer.upcoming_records_last_page_number,
    user_id: state.vantage.userDataReducer.user_id,
    organisationMembers: state.vantage.organisationReducer.organisationMembers,
    isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
    organisationAccountOwnerId:
      state.vantage.organisationReducer.organisationAccountOwnerId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  upcomingCourseAction: (
    token,
    pageNumber,
    sorting,
    searchFieldValue,
    course_ids,
    members,
    listType
  ) =>
    dispatch(
      upcomingCourseAction(
        token,
        pageNumber,
        sorting,
        searchFieldValue,
        course_ids,
        members,
        listType
      )
    ),
  setUpcomingCoursesState: (current_state) =>
    dispatch(upcomingCoursesSetState(current_state)),
  setSelectedCourses: (upcoming_selected_courses) =>
    dispatch(setUpcomingSelectedCourses(upcoming_selected_courses)),
  setCurrentPage: (current_page) =>
    dispatch(setUpcomingCurrentPage(current_page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingCourseComponent);
