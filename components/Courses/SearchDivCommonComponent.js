import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// reactstrap components
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
  pastCourseAction,
  upcomingCourseAction,
} from "../../redux/actions/courseAction";
var _ = require("lodash");

function SearchDivCommonComponent(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [CoursesListObject, setCoursesListObject] = useState([
    { id: 12, value: "Door Supervisor Training" },
    { id: 13, value: "CCTV Training" },
    { id: 44, value: "Security Guarding" },
    { id: 29, value: "Close Protection" },
  ]);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

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
  };

  // useEffect(() => {
  //     if(props.parentComponent == "PastCourseComponent"){
  //       props.pastCourseActionTemp(props.user_token, currentpage, props.showLimit, {}, props.searchFieldValue, props.selectedCourses).then((resp0) => {
  //           if (resp0) {}
  //       });
  //     }else if(props.parentComponent == "UpcomingCourseComponent"){
  //       props.upcomingCourseActionTemp(props.user_token, currentpage, props.showLimit, {}, props.searchFieldValue, props.selectedCourses).then((resp0) => {
  //           if (resp0) {}
  //       });
  //     }
  // }, [props.selectedCourses]);

  const searchChange = (event) => {
    props.setSearchFieldValue(event.target.value);
  };

  useEffect(() => {
    if (!props.searchFieldValue) {
      if (props.parentComponent == "PastCourseComponent") {
        props
          .pastCourseActionTemp(
            props.user_token,
            currentpage,
            props.showLimit,
            {},
            props.searchFieldValue,
            props.selectedCourses
          )
          .then((resp0) => {
            if (resp0) {
            }
          });
      } else if (props.parentComponent == "UpcomingCourseComponent") {
        props
          .upcomingCourseActionTemp(
            props.user_token,
            currentpage,
            props.showLimit,
            {},
            props.searchFieldValue,
            props.selectedCourses
          )
          .then((resp0) => {
            if (resp0) {
            }
          });
      }
    }
  }, [props.searchFieldValue]);

  const searchButton = (event) => {
    event.preventDefault();
    if (props.parentComponent == "PastCourseComponent") {
      props
        .pastCourseActionTemp(
          props.user_token,
          currentpage,
          props.showLimit,
          {},
          props.searchFieldValue,
          props.selectedCourses
        )
        .then((resp0) => {
          if (resp0) {
          }
        });
    } else if (props.parentComponent == "UpcomingCourseComponent") {
      props
        .upcomingCourseActionTemp(
          props.user_token,
          currentpage,
          props.showLimit,
          {},
          props.searchFieldValue,
          props.selectedCourses
        )
        .then((resp0) => {
          if (resp0) {
          }
        });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (props.parentComponent == "PastCourseComponent") {
        // props.setSelectedCourses([]);
        props
          .pastCourseActionTemp(
            props.user_token,
            currentpage,
            props.showLimit,
            {},
            props.searchFieldValue,
            []
          )
          .then((resp0) => {
            if (resp0) {
            }
          });
      } else if (props.parentComponent == "UpcomingCourseComponent") {
        // props.setSelectedCourses([]);
        props
          .upcomingCourseActionTemp(
            props.user_token,
            currentpage,
            props.showLimit,
            {},
            props.searchFieldValue,
            []
          )
          .then((resp0) => {
            if (resp0) {
            }
          });
      }
    }
  };

  return (
    <>
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
              placeholder="Search"
              value={props.searchFieldValue}
              onChange={searchChange}
              onKeyPress={handleKeyPress}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  courses: state.vantage.coursesReducer.courses,
  courses_pagination_links:
    state.vantage.coursesReducer.courses_pagination_links,
  is_request_loader: state.vantage.commonReducer.is_request_loader,
});

const mapDispatchToProps = (dispatch) => ({
  pastCourseAction: pastCourseAction,
  pastCourseActionTemp: (
    data,
    booking_id,
    limit,
    field,
    sorting,
    searchFieldValue,
    course_ids
  ) =>
    dispatch(
      pastCourseAction(
        data,
        booking_id,
        limit,
        field,
        sorting,
        searchFieldValue,
        course_ids
      )
    ),

  upcomingCourseAction: upcomingCourseAction,
  upcomingCourseActionTemp: (
    token,
    pageNumber,
    limit,
    sorting,
    searchFieldValue,
    course_ids
  ) =>
    dispatch(
      upcomingCourseAction(
        token,
        pageNumber,
        limit,
        sorting,
        searchFieldValue,
        course_ids
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDivCommonComponent);
