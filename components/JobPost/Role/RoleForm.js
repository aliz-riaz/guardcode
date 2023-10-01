import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import {
  setJobTitleValue,
  setTypeOfEmployment,
  setSIALicense,
  fetchJobTitleSuggestions,
  fetchJobDescTemplate,
  setRadio,
  setContract,
  setEditor,
  setVenueType,
  setVenueTypeOtherValue,
  setImmediateHiring,
  setJobRefNumber,
  setShiftSchedule,
  setShiftTiming,
  fetchUserAvalibleConnect,
  setJobDescriptionTitles,
  fetchJobDescriptionTitles,
  setJobDescriptionTemplate,
  setJobTemplate,
  setUpdateJobTemplate,
} from "../../../redux/actions/jobPostAction";
import * as Yup from "yup";
import styles from "./RoleForm.module.scss";
import AutoSuggestionForJobTitle from "./AutoSuggestionForJobTitle";
import { shiftTimings } from "../../../utilites/utility";
import Sticky from "react-sticky-el";

// import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
// const smallPaddingElements = [ 'figcaption', 'li' ];
// function viewToPlainText( viewItem ) {
// 	let text = '';

// 	if ( viewItem.is( 'text' ) || viewItem.is( 'textProxy' ) ) {
// 		// If item is `Text` or `TextProxy` simple take its text data.
// 		text = viewItem.data;
// 	} else if ( viewItem.is( 'img' ) && viewItem.hasAttribute( 'alt' ) ) {
// 		// Special case for images - use alt attribute if it is provided.
// 		text = viewItem.getAttribute( 'alt' );
// 	} else {
// 		// Other elements are document fragments, attribute elements or container elements.
// 		// They don't have their own text value, so convert their children.
// 		let prev = null;

// 		for ( const child of viewItem.getChildren() ) {
// 			const childText = viewToPlainText( child );

// 			// Separate container element children with one or more new-line characters.
// 			if ( prev && ( prev.is( 'containerElement' ) || child.is( 'containerElement' ) ) ) {
// 				if ( smallPaddingElements.includes( prev.name ) || smallPaddingElements.includes( child.name ) ) {
// 					text += '\n';
// 				} else {
// 					text += '\n\n';
// 				}
// 			}

// 			text += childText;
// 			prev = child;
// 		}
// 	}

// 	return text;
// }

const RoleSchema = Yup.object().shape({
  jobTitle: Yup.string()
    .max(100, "The title cannot be more than 100 characters long")
    .required("Please enter job title"),
  typeOfEmployment: Yup.string()
    .nullable()
    .required("Please select employment type"),
  SIALicense: Yup.array().when("radio", {
    is: "yes",
    then: Yup.array().required().min(1, "Please select atleast one of above"),
  }),
  radio: Yup.string().required("Please select one of above"),
  is_immediate: Yup.string().required("Please select one of above"),
  contract: Yup.string().nullable().required("Please select contract type"),
  editor: Yup.string().required("Please enter job description").min(1),
  venueType: Yup.string().required("Please select venue type"),
  venueTypeOtherValue: Yup.string().when("venueType", {
    is: (val) => val === "Other",
    then: Yup.string()
      .nullable()
      .max(50, "You cannot enter more than 50 characters for the venue")
      .required("Please enter other venue type"),
    otherwise: Yup.string().notRequired(),
  }),
  // shift_schedule: Yup.string().required('Please enter shift schedule'),
  // shift_timing: Yup.string().required('Please select one of above'),
});

const Role = (props) => {
  const editorRef = useRef();
  const router = useRouter();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [customTem, setCustomTem] = useState(false);
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [shiftToggle, setShiftToggle] = useState(false);
  const [shiftTiming, setShiftTiming] = useState("");

  const [jobDescriptionTitleLoader, setJobDescriptionTitleLoader] =
    useState(false);
  const [openJobDescriptionList, setOpenJobDescriptionList] = useState(false);

  useEffect(() => {
    props.fetchUserAvalibleConnect(props.user_token);
  }, []);

  const scrolOnEditor = () => {
    //editorRef.current.scrollIntoView()
    //window.scrollTo({ behavior: 'smooth', top: editorRef.current.offsetTop })
    //editorRef.current?.scrollIntoView({behavior: 'smooth'});
  };
  // const [cursor, setCursor] = useState(0);
  // const [value,setValue] = useState("")

  // useEffect(() => {
  //     props.setJobTitleValue(suggestions[cursor]);
  //     setValue(suggestions[cursor])
  // },[cursor])

  // const handleKeyDown=(e) =>{
  //     if(e.key === 'Enter') {
  //         if (suggestions.length == 1) {
  //             props.setJobTitleValue(suggestions[0]);
  //             setSuggestions([])
  //         }else
  //         {
  //             props.setJobTitleValue(value);
  //             setSuggestions([])
  //         }
  //         setCursor(0);
  //     }
  //
  //     // arrow up/down button should select next/previous list element
  //     if (e.keyCode === 38) {
  //         if(cursor >=1 || cursor <= suggestions.length ) {
  //             if(cursor <= 0)
  //             {
  //                 setCursor(0);
  //             }else {
  //                 setCursor(cursor-1);
  //             }
  //         }
  //     } else if (e.keyCode === 40) {
  //         if(cursor <=0 || cursor <= suggestions.length - 1 ) {
  //             if(cursor >= (suggestions.length-1) ) {
  //                 setCursor(suggestions.length-1);
  //             }else {
  //                 setCursor(cursor + 1);
  //             }
  //         }
  //     }
  // }

  useEffect(() => {
    if (
      process.browser &&
      CKEditor == undefined &&
      ClassicEditor == undefined
    ) {
      editorRef.current = {
        CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
        ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      };
      const timeoutId = setTimeout(() => {
        setEditorLoaded(true);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [props.job_title_suggestions]);

  // constst [suggestions,setSuggestions] = useState([])
  const onTextChange = (e) => {
    const value = e.target.value;
    // let suggestion = [];suggestion
    // if(value.length > 0) {
    //     const regex = new RegExp(`^${value}`,'i');
    //     suggestion = props.jobTitleSuggestions.sort().filter(v=>regex.test(v));
    // }
    // setSuggestions(suggestion)
    props.setJobTitleValue(value);
    // setValue(value);
  };
  // const setInputValue = (value) => {
  //     setValue(value);
  //     props.setJobTitleValue(value);
  // setSuggestions([])
  // }

  // const renderSuggestions = (cursor) => {
  //     if(suggestions.length === 0 ) {
  //         return null;
  //     }
  //     return (
  //         <div className={`${styles.title_suggestion}`}>
  //             <ul className="pl-0 mb-0">
  //                 {suggestions.map((item,key) => <li key={key} className={key===cursor ? styles.hover_background : null} onClick={()=>setInputValue(item)}>{item}</li>)}
  //             </ul>
  //         </div>
  //     )
  // }

  //const fetchJobDescTemplate = (id) => props.fetchJobDescTemplate(props.user_token, id);

  const applyTemplate = () => {
    //props.setEditor(props.jobDescTemplate?.description)
    props.setEditor(props.jobDescTemplate?.description);
    setShowJobDescription(false);
    router.push(`${process.env.APP_URL}/jobpost#editor`);
    if (isMobile) {
      props.setJobDescriptionTemplate("");
      props.setJobDescriptionTitles([]);
    }
  };

  const fetchJobDescriptionTitlesHandler = async () => {
    const fetchAllTitles = await props.fetchJobDescriptionTitles();
    props.setJobDescriptionTitles(fetchAllTitles);
    setOpenJobDescriptionList(true);
  };

  const openJobDescriptionHandler = async (slug) => {
    const template = await props.fetchJobDescTemplate(slug);
    props.setJobDescriptionTemplate(template);
    setShowJobDescription(true);
  };

  const onSearchTitle = (e) => {
    setSearchField(e.target.value);
    const filterTitles = props.jobDescTitles.filter((titles) => {
      return titles.title.toLowerCase().includes(searchField.toLowerCase());
    });
    setSearchData(filterTitles);
  };

  const venueTypeHandler = (value) => {
    if (props.venue_type == value) {
      props.setVenueType("");
    } else {
      props.setVenueType(value);
    }
    props.setVenueTypeOtherValue("");
  };
  const suggestions = [
    {
      name: "C",
      year: 1972,
    },
    {
      name: "Elm",
      year: 2012,
    },
  ];

  const shiftTimingsOptions = {
    1: "Day & Night",
    2: "Night only",
    3: "Day only",
  };

  return (
    <>
      <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
        <div className="col">
          <h3 className="text-center text-sm-uppercase font-sm-12">Role</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="bg-white py-4 px-4 rounded">
            <Formik
              enableReinitialize={true}
              initialValues={{
                jobTitle: props.job_title,
                refNumber: props.job_ref_number,
                typeOfEmployment: props.type_of_employment,
                SIALicense: props.sia_license,
                radio: props.radio,
                contract: props.contract,
                editor: props.editor,
                venueType: props.venue_type,
                venueTypeOtherValue: props.venue_type_other_value,
                is_immediate: props.is_immediate,
                shift_schedule: props.shift_schedule,
                shift_timing: props.shift_timing,
              }}
              validationSchema={RoleSchema}
              onSubmit={(values) => {
                // alert(JSON.stringify(values));
                props.setJobTemplate({
                  ...props.jobTemplate,
                  name: props.job_title,
                  errorMessage: "",
                  error: false,
                });
                props.goToNext(1);
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form id="role">
                  <div className={`${styles.role_col}`}>
                    <Row>
                      <Col md="7">
                        {/* <Field name="jobTitle" placeholder="Job title" value={props.job_title} autoComplete="off" className="form-control" onChange={onTextChange}/> */}
                        <AutoSuggestionForJobTitle
                          jobValue={props.job_title}
                          setJobTitleValue={props.setJobTitleValue}
                          job_title_suggestions={props.job_title_suggestions}
                          errors={errors}
                          //getJobDescTemplate={fetchJobDescTemplate}
                          touched={touched}
                        />
                        {/* <Label>Job title</Label> */}
                        {/* {errors.jobTitle && touched.jobTitle ? (
                        <div className="text-danger">{errors.jobTitle}</div>
                      ) : null} */}
                        {/*{renderSuggestions(cursor)}*/}
                      </Col>
                      <Col md="5">
                        <FormGroup
                          className={`gl-input position-relative ${styles.per_hour}`}
                        >
                          <Field
                            type="text"
                            name="refNumber"
                            className="form-control"
                            placeholder="Salary Value"
                            onChange={(e) => {
                              props.setJobRefNumber(e.target.value);
                            }}
                          />
                          <label>Ref Number (Optional)</label>

                          {errors.refNumber && touched.refNumber ? (
                            <div className="text-danger mt-2">
                              {errors.refNumber}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="gl-input-simple form-group mb-0">
                          <Field
                            className="form-control"
                            as="select"
                            name="typeOfEmployment"
                            onChange={(e) => {
                              props.setTypeOfEmployment(e.target.value);
                            }}
                          >
                            <option value="">Employment type</option>
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                          </Field>
                          {errors.typeOfEmployment &&
                          touched.typeOfEmployment ? (
                            <div className="text-danger">
                              {errors.typeOfEmployment}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className={`${styles.role_col} pb-2 pb-md-3`}>
                    <Row>
                      <Col>
                        <FormGroup className="gl-radio mb-0">
                          <label>
                            <Field
                              type="radio"
                              name="radio"
                              className=""
                              value="no"
                              onChange={(e) => {
                                props.setRadio(e.target.value);
                                props.setSIALicense([]);
                              }}
                            />
                            <span>SIA Licence is not required</span>
                            <span className="checkmark"></span>
                          </label>
                        </FormGroup>
                        <FormGroup className="gl-radio mb-0">
                          <label className="mb-0">
                            <Field
                              type="radio"
                              name="radio"
                              className=""
                              value="yes"
                              onChange={(e) => {
                                props.setRadio(e.target.value);
                              }}
                            />
                            <span>SIA Licence is required</span>
                            <span className="checkmark"></span>
                          </label>
                          {errors.radio && touched.radio ? (
                            <div className="text-danger">{errors.radio}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {values.radio == "yes" ? (
                    <div className="ali">
                      <h4 className="mb-3">
                        Which SIA Licence is required for this role?
                      </h4>
                      <FormGroup className="gl-checkbox form-check mb-1">
                        <label className="form-check-label">
                          <Field
                            type="checkbox"
                            className="form-check-input"
                            name="SIALicense"
                            value="12"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSIALicense([
                                    ...values.SIALicense,
                                    e.target.value,
                                  ])
                                : props.setSIALicense(
                                    values.SIALicense.filter((value) =>
                                      value == "12" ? false : true
                                    )
                                  );
                            }}
                          />
                          <span>Door Supervisor Licence</span>
                          <span className="checkmark"></span>
                        </label>
                      </FormGroup>
                      <FormGroup className="gl-checkbox  mb-1">
                        <label className="form-check-label">
                          <Field
                            type="checkbox"
                            className="form-check-input"
                            name="SIALicense"
                            value="13"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSIALicense([
                                    ...values.SIALicense,
                                    e.target.value,
                                  ])
                                : props.setSIALicense(
                                    values.SIALicense.filter((value) =>
                                      value == "13" ? false : true
                                    )
                                  );
                            }}
                          />
                          <span>CCTV Licence</span>
                          <span className="checkmark"></span>
                        </label>
                      </FormGroup>
                      <FormGroup className="gl-checkbox  mb-1">
                        <label className="form-check-label">
                          <Field
                            type="checkbox"
                            className="form-check-input"
                            name="SIALicense"
                            value="44"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSIALicense([
                                    ...values.SIALicense,
                                    e.target.value,
                                  ])
                                : props.setSIALicense(
                                    values.SIALicense.filter((value) =>
                                      value == "44" ? false : true
                                    )
                                  );
                            }}
                          />
                          <span>Security Guarding Licence</span>
                          <span className="checkmark"></span>
                        </label>
                      </FormGroup>
                      <FormGroup className="gl-checkbox">
                        <label className="form-check-label">
                          <Field
                            type="checkbox"
                            className="form-check-input"
                            name="SIALicense"
                            value="29"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSIALicense([
                                    ...values.SIALicense,
                                    e.target.value,
                                  ])
                                : props.setSIALicense(
                                    values.SIALicense.filter((value) =>
                                      value == "29" ? false : true
                                    )
                                  );
                            }}
                          />
                          <span>Close Protection Licence</span>
                          <span className="checkmark"></span>
                        </label>
                      </FormGroup>
                      {errors.SIALicense && touched.SIALicense ? (
                        <div className="text-danger">{errors.SIALicense}</div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className={`${styles.role_col}`}>
                    <h4>What contract type is it?</h4>
                    <div className="gl-input-simple form-group mb-0">
                      <Field
                        as="select"
                        className="form-control"
                        name="contract"
                        onChange={(e) => {
                          props.setContract(e.target.value);
                        }}
                      >
                        <option value="">Contract type</option>
                        <option value="Permanent">Permanent</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        {/* <option value="Internship">Internship</option>
                      <option value="Commission">Commission</option>
                      <option value="Volunteer">Volunteer</option> */}
                        {/* <option value="Apprenticeship">Apprenticeship</option> */}
                      </Field>
                      {errors.contract && touched.contract ? (
                        <div className="text-danger">{errors.contract}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className={`${styles.role_col}`}>
                    <h4>Shift schedule (Optional)</h4>
                    <FormGroup
                      className={`gl-input position-relative ${styles.per_hour}`}
                    >
                      <Field
                        type="text"
                        name="shift_schedule"
                        className="form-control"
                        placeholder="e.g. Monday-Friday, 9AM-4PM"
                        onChange={(e) => {
                          props.setShiftSchedule(e.target.value);
                        }}
                      />
                      <label>e.g. Monday-Friday, 9AM-4PM</label>

                      {/* {errors.shift_schedule && touched.shift_schedule ? (
                            <div className="text-danger mt-2">{errors.shift_schedule}</div>
                          ) : null}  */}
                    </FormGroup>
                    <h4>Shift timing (Optional)</h4>
                    <div className={`${styles.shift_timing_container}`}>
                      <div
                        className={`${styles.shift_timing_box} ${
                          shiftToggle ? styles.open : ""
                        } cursor-pointer`}
                        onClick={() => setShiftToggle(!shiftToggle)}
                      >
                        <span>
                          {props.shift_timing == 0
                            ? "Select option"
                            : shiftTimingsOptions[props.shift_timing]}
                        </span>
                        <span className={`${styles.arrow}`}>
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/chevron-down-bl.png"
                            }
                            width="22px"
                          />
                        </span>
                      </div>
                      {shiftToggle && (
                        <div
                          className={`${styles.shift_timing_list} box-shadow rounded px-2`}
                        >
                          <div className="border-light border-bottom">
                            <FormGroup className="gl-radio mb-0 ">
                              <label className="mb-0 d-block py">
                                <Field
                                  type="radio"
                                  name="shift_timing"
                                  className=""
                                  value="1"
                                  onChange={(e) => {
                                    props.setShiftTiming(e.target.value);
                                    setShiftTiming(
                                      shiftTimings.filter(
                                        (x) => x.value == e.target.value
                                      )[0].label
                                    );
                                  }}
                                  onClick={(e) => setShiftToggle(!shiftToggle)}
                                />
                                <span>Day & Night</span>
                                <span className="checkmark"></span>
                              </label>
                            </FormGroup>
                          </div>
                          <div className="border-light border-bottom">
                            <FormGroup className="gl-radio mb-0 ">
                              <label className="mb-0 d-block">
                                <Field
                                  type="radio"
                                  name="shift_timing"
                                  className=""
                                  value="2"
                                  onChange={(e) => {
                                    props.setShiftTiming(e.target.value);
                                    setShiftTiming(
                                      shiftTimings.filter(
                                        (x) => x.value == e.target.value
                                      )[0].label
                                    );
                                  }}
                                  onClick={(e) => setShiftToggle(!shiftToggle)}
                                />
                                <span>Night only</span>
                                <span className="checkmark"></span>
                              </label>
                            </FormGroup>
                          </div>
                          <div className="">
                            <FormGroup className="gl-radio mb-0">
                              <label className="mb-0 d-block">
                                <Field
                                  type="radio"
                                  name="shift_timing"
                                  className=""
                                  value="3"
                                  onChange={(e) => {
                                    props.setShiftTiming(e.target.value);
                                    setShiftTiming(
                                      shiftTimings.filter(
                                        (x) => x.value == e.target.value
                                      )[0].label
                                    );
                                  }}
                                  onClick={(e) => setShiftToggle(!shiftToggle)}
                                />
                                <span>Day only</span>
                                <span className="checkmark"></span>
                              </label>
                            </FormGroup>
                          </div>
                        </div>
                      )}
                      {/* {errors.shift_timing && touched.shift_timing ? (
                      <div className="text-danger mt-2">{errors.shift_timing}</div>
                    ) : null}                              */}
                    </div>
                  </div>

                  <div className={`${styles.role_col}`}>
                    <h4 className="mt-4">Venue or Environment type</h4>
                    <div
                      className={`${styles.venue_wrap} row mb-0 mt-3 justify-content-center justify-content-md-between`}
                    >
                      <div className="col">
                        <Field
                          type="text"
                          name="venueType"
                          hidden
                          value={props.venue_type}
                        />
                        <div
                          className={`${styles.venue_box} ${
                            props.venue_type == "Retail" ? styles.selected : ""
                          } cursor-pointer`}
                          onClick={() => venueTypeHandler("Retail")}
                        >
                          <span className={`${styles.select_icon}`}></span>
                          <i className={`${styles.venue_icon}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="22"
                              viewBox="0 0 24 22"
                            >
                              <g
                                stroke="#212121"
                                strokeWidth="2"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <path
                                  strokeLinecap="square"
                                  d="M4 12v9h16v-9M4 1 1 6a2.992 2.992 0 0 0 5.667 1.347 2.977 2.977 0 0 0 5.333 0 2.977 2.977 0 0 0 5.333 0A2.992 2.992 0 0 0 23 6l-3-5H4z"
                                />
                                <path d="M10 21v-6h4v6" />
                              </g>
                            </svg>
                          </i>
                          <span className={`${styles.venu_name}`}>Retail</span>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className={`${styles.venue_box} ${
                            props.venue_type == "Corporate"
                              ? styles.selected
                              : ""
                          } cursor-pointer`}
                          onClick={() => venueTypeHandler("Corporate")}
                        >
                          <span className={`${styles.select_icon}`}></span>
                          <i className={`${styles.venue_icon}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g
                                stroke="#212121"
                                strokeWidth="2"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="square"
                              >
                                <path d="M5 23H1V13h4M9 16h2M9 19h2M9 13h2M13 6V2l10 3v18H5V9h10v14M19 19V9" />
                              </g>
                            </svg>
                          </i>
                          <span className={`${styles.venu_name}`}>
                            Corporate
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className={`${styles.venue_box} ${
                            props.venue_type == "Bar/Club"
                              ? styles.selected
                              : ""
                          } cursor-pointer`}
                          onClick={() => venueTypeHandler("Bar/Club")}
                        >
                          <span className={`${styles.select_icon}`}></span>
                          <i className={`${styles.venue_icon}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="25"
                              viewBox="0 0 21 25"
                            >
                              <g
                                stroke="#212121"
                                strokeWidth="2"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <path d="M1 7.133h7.6v6.134c0 2.258-1.701 4.089-3.8 4.089-2.099 0-3.8-1.831-3.8-4.09V7.134z" />
                                <path
                                  strokeLinecap="square"
                                  d="M4.8 17.356v6.133M1.95 23.489h5.7"
                                />
                                <path d="M12.4 7.133H20v6.134c0 2.258-1.701 4.089-3.8 4.089-2.099 0-3.8-1.831-3.8-4.09V7.134z" />
                                <path
                                  strokeLinecap="square"
                                  d="M16.2 17.356v6.133M13.35 23.489h5.7M10.5 1v2.044M6.7 4.067l-.95-1.023M14.3 4.067l.95-1.023M1 11.222h7.6M12.4 11.222H20"
                                />
                              </g>
                            </svg>
                          </i>
                          <span className={`${styles.venu_name}`}>
                            Bar/Club
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className={`${styles.venue_box} ${
                            props.venue_type == "Event" ? styles.selected : ""
                          } cursor-pointer`}
                          onClick={() => venueTypeHandler("Event")}
                        >
                          <span className={`${styles.select_icon}`}></span>
                          <i className={`${styles.venue_icon}`}>
                            <svg
                              width="23"
                              height="18"
                              viewBox="0 0 23 18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                stroke="#212121"
                                stroke-width="2"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="square"
                              >
                                <path d="M19.136 9c0-1.657 1.282-3 2.864-3V1H1v5c1.582 0 2.864 1.343 2.864 3S2.582 12 1 12v5h21v-5c-1.582 0-2.864-1.343-2.864-3zM7.682 7h7.636M7.682 11h7.636" />
                              </g>
                            </svg>
                          </i>
                          <span className={`${styles.venu_name}`}>Event</span>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className={`${styles.venue_box} ${
                            props.venue_type == "Mobile" ? styles.selected : ""
                          } cursor-pointer`}
                          onClick={() => venueTypeHandler("Mobile")}
                        >
                          <span className={`${styles.select_icon}`}></span>
                          <i className={`${styles.venue_icon}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="24"
                              viewBox="0 0 23 24"
                            >
                              <g fill="none" fillRule="evenodd">
                                <path
                                  fill="#212121"
                                  fillRule="nonzero"
                                  d="M8.636 0h5.727v3H8.636z"
                                />
                                <path
                                  stroke="#212121"
                                  strokeWidth="2"
                                  d="m20.09 11-1.908-6H4.818L2.91 11"
                                />
                                <path
                                  stroke="#212121"
                                  strokeWidth="2"
                                  strokeLinecap="square"
                                  d="M6.727 19v4H1.955v-4M21.045 19v4h-4.772v-4M22 19H1v-6l1.91-2h17.18L22 13zM4.818 15h1.909M16.273 15h1.909"
                                />
                              </g>
                            </svg>
                          </i>
                          <span className={`${styles.venu_name}`}>Mobile</span>
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <div
                          className={`${styles.venue_box} ${styles.other_box} ${
                            props.venue_type == "Other" ? styles.selected : ""
                          } cursor-pointer`}
                          onClick={() => venueTypeHandler("Other")}
                        >
                          <span className={`${styles.select_icon}`}></span>
                          <span className={`${styles.venu_name}`}>Other</span>
                        </div>
                        <FormGroup
                          className={`gl-input position-relative mb-0 ${styles.others_input}`}
                        >
                          <Field
                            type="text"
                            name="venueTypeOtherValue"
                            className="form-control"
                            placeholder="Salary Value"
                            onChange={(e) => {
                              props.setVenueTypeOtherValue(e.target.value);
                            }}
                          />
                          <label>e.g Personal Security</label>

                          {errors.refNumber && touched.refNumber ? (
                            <div className="text-danger mt-2">
                              {errors.refNumber}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/* <input type="text" name="venueTypeOtherValue" className="form-control" onChange={(e) => setVenueTypeOtherValue(e.target.value)}/> */}
                        {errors.venueTypeOtherValue &&
                        touched.venueTypeOtherValue ? (
                          <div className="text-danger">
                            {errors.venueTypeOtherValue}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {errors.venueType && touched.venueType ? (
                      <div className="text-danger">{errors.venueType}</div>
                    ) : null}
                  </div>
                  <div className={`${styles.role_col} pb-2 pb-md-4`}>
                    <div className="">
                      <div className="row">
                        <div className="col-md-8">
                          <h4 className="mb-0">
                            Do you want the hired candidate/s to be able to
                            begin employment immediately?
                          </h4>
                          {errors.is_immediate && touched.is_immediate ? (
                            <div className="text-danger">
                              {errors.is_immediate}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex justify-content-md-end">
                            <div className="gl-radio mb-0 form-group pl-4">
                              <label>
                                {/* <input
                              type="radio"
                              value="Yes"
                              checked={props.is_immediate == 1}
                              onClick={() => immediateHiringHandler(1)}
                            /> */}
                                <Field
                                  type="radio"
                                  name="is_immediate"
                                  //checked={props.is_immediate == 1}
                                  onChange={(e) => {
                                    props.setImmediateHiring(e.target.value);
                                  }}
                                  className=""
                                  value="1"
                                  //onClick={() => immediateHiringHandler(1)}
                                />
                                <span>Yes</span>
                                <span class="checkmark"></span>
                              </label>
                            </div>
                            <div className="gl-radio mb-0 form-group pl-4 ml-3">
                              <label>
                                {/* <input
                              type="radio"
                              value="No"
                              checked={props.is_immediate == 0}
                              onClick={() => immediateHiringHandler(0)}
                            /> */}
                                <Field
                                  type="radio"
                                  name="is_immediate"
                                  // checked={props.is_immediate == 0}
                                  className=""
                                  value="0"
                                  onChange={(e) => {
                                    props.setImmediateHiring(e.target.value);
                                  }}
                                  //onClick={() => immediateHiringHandler(0)}
                                />
                                <span>No</span>
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {editorLoaded ? (
                    <>
                      <div
                        className="d-flex flex-wrap justify-content-between mb-2 mt-3 align-items-center"
                        id="editor"
                      >
                        <h4 className="m-0">Job description</h4>
                        <div
                          className="border border-1 rounded fw-bold px-3 py-1 border-dark cursor-pointer fs-7 mt-2 mt-md-0"
                          onClick={fetchJobDescriptionTitlesHandler}
                        >
                          Job description templates
                        </div>
                      </div>
                      {/* {
                          (props.jobDescTemplate !== '' && props?.jobDescTemplate !== null && props?.jobDescTemplate !== undefined) ?
                            (
                              <div className={`border-1 border rounded px-3 py-2 mb-4 mt-1 ${styles.temp_box} ${customTem ? styles.open : null}`} >
                                <div className={`${styles.applyTemplate_header} d-flex align-items-center justify-content-between cursor-pointer`} onClick={() => setCustomTem(!customTem)}>
                                  <div>
                                    <h5 className='text-success mb-0 fs-7'>Add description from template</h5>
                                  </div>
                                  <div className={`${styles.preview_temp}`}>
                                    <span className=''></span>
                                    <span className='text-success fw-bold fs-7'>Preview</span>
                                    <span className='mx-1'>
                                      <img src={process.env.APP_URL + '/images/eye_green.svg'} width={'12'} height={'10'} />
                                    </span>
                                    <span>
                                      <img src={process.env.APP_URL + '/images/chevronDown_green.svg'} width={'10'} height={'6'} className={`${styles.arrow} ${styles.temp_box} ${customTem ? styles.open : null}`} />
                                    </span>
                                  </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: `${props.jobDescTemplate?.description}` }} className={`${styles.custom_temp}`}></div>
                                {/* {customTem &&
                                  <div className='text-right'>
                                    <button type='button' className='text-success border-0 bg-transparent fw-bold fs-7' onClick={() => {
                                      applyTemplate()
                                      setCustomTem(false)
                                    }}>APPLY TEMPLATE</button>
                                  </div>
                                } */}
                      {/* </div>) :
                            (<></>) */}
                      {/* } */}
                      {/* } */}

                      <div className={`${styles.editor}`}>
                        <CKEditor
                          name="editor"
                          data={props.editor}
                          className=""
                          config={{
                            heading: {
                              options: [
                                {
                                  model: "heading3",
                                  view: "h3",
                                  title: "Heading 3",
                                  class: "ck-heading_heading3",
                                },
                                {
                                  model: "heading4",
                                  view: "h4",
                                  title: "Heading 4",
                                  class: "ck-heading_heading4",
                                },
                                {
                                  model: "heading5",
                                  view: "h5",
                                  title: "Heading 5",
                                  class: "ck-heading_heading5",
                                },
                                {
                                  model: "heading6",
                                  view: "h6",
                                  title: "Heading 6",
                                  class: "ck-heading_heading6",
                                },
                              ],
                            },

                            toolbar: [
                              "heading",
                              "|",
                              "selectAll",
                              "numberedList",
                              "bulletedList",
                              "|",
                              "bold",
                              "italic",
                              "blockQuote",
                              "|",
                              "link",
                              "mediaEmbed",
                              "|",
                              "|",
                              "undo",
                              "redo",
                            ],
                          }}
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            // (  viewToPlainText( editor.editing.view.document.getRoot() ));
                            setFieldValue("editor", editor.getData());
                            props.setEditor(editor.getData());
                          }}
                        />
                      </div>
                      <div className="text-danger">
                        <ErrorMessage name="editor" />
                      </div>
                    </>
                  ) : null}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        {openJobDescriptionList &&
          props.jobDescTitles &&
          props.jobDescTitles.length > 0 && (
            <div className={`${styles.temp_title_list}`}>
              <Sticky
                topOffset={0}
                bottomOffset={20}
                className={`${styles.sticky}`}
              >
                <span
                  className={`${styles.close} cursor-pointer`}
                  onClick={() => {
                    props.setJobDescriptionTitles([]);
                    setSearchField("");
                  }}
                >
                  <img src={`${process.env.APP_URL}/images/x-circle.svg`} />
                </span>
                <div
                  className={`d-md-flex justify-content-between align-items-center mb-3`}
                >
                  <h4 className="text-black-50 mb-3 mb-md-0">
                    Select a template
                  </h4>
                  <div className={`${styles.search}`}>
                    <div className="gl-search-location form-group">
                      <input
                        type={`text`}
                        className="form-control"
                        onChange={onSearchTitle}
                        placeholder="Search Template"
                      />
                    </div>
                  </div>
                </div>
                <ul className="d-flex flex-wrap">
                  {searchField != ""
                    ? searchData?.map((item) => {
                        return (
                          <li>
                            <div
                              className={`${styles.title_card} bg-white fw-bold box-shadow px-3 py-3 cursor-pointer`}
                              onClick={() =>
                                openJobDescriptionHandler(item.slug)
                              }
                            >
                              {item.title}
                            </div>
                          </li>
                        );
                      })
                    : props.jobDescTitles?.map((item) => {
                        return (
                          <li>
                            <div
                              className={`${styles.title_card} bg-white fw-bold box-shadow px-3 py-3 cursor-pointer`}
                              onClick={() =>
                                openJobDescriptionHandler(item.slug)
                              }
                            >
                              {item.title}
                            </div>
                          </li>
                        );
                      })}
                </ul>
              </Sticky>
            </div>
          )}
        <div
          className={`${styles.jobDescTemp} ${
            showJobDescription && styles.show
          } bg-white`}
        >
          <span
            class={`${styles.close_preview}`}
            onClick={() => {
              setShowJobDescription(false);
            }}
          >
            <img src={`${process.env.APP_URL}/images/x-circle.svg`} />
          </span>
          <h4 className="text-black-50">Job description template</h4>
          {props.jobDescTemplate?.description && (
            <>
              <div className="d-flex flex-wrap justify-content-between align-items-center pt-2">
                <h3 className="mb-0 order-2 order-md-1 mt-3 mt-md-0">
                  {props.jobDescTemplate?.title}
                </h3>
                <button
                  className="btn btn-green btn-md py-2 order-1 order-md-2 w-100 w-md-auto"
                  onClick={() => {
                    applyTemplate();
                    props.setJobDescriptionTitles([]);
                    setSearchField("");
                  }}
                >
                  Use this template
                </button>
              </div>
              <div className={`${styles.scroll} mt-4`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${props.jobDescTemplate?.description}`,
                  }}
                  className={`${styles.custom_temp}`}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    job_title: state.vantage.jobPostReducer.jobTitle,
    type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
    sia_license: state.vantage.jobPostReducer.SIALicense,
    radio: state.vantage.jobPostReducer.radio,
    user_token: state.vantage.userDataReducer.user_token,
    contract: state.vantage.jobPostReducer.contract,
    // jobTitleSuggestions: state.vantage.jobPostReducer.jobTitleSuggestions,
    editor: state.vantage.jobPostReducer.editor,
    venue_type: state.vantage.jobPostReducer.venueType,
    venue_type_other_value: state.vantage.jobPostReducer.venueTypeOtherValue,
    is_immediate: state.vantage.jobPostReducer.is_immediate,
    shift_schedule: state.vantage.jobPostReducer.shift_schedule,
    shift_timing: state.vantage.jobPostReducer.shift_timing,
    job_title_suggestions: state.vantage.jobPostReducer.jobTitleSuggestions,
    jobDescTemplate: state.vantage.jobPostReducer.jobDescTemplate,
    jobDescTitles: state.vantage.jobPostReducer.jobDescTitles,
    job_ref_number: state.vantage.jobPostReducer.refNumber,
    jobTemplate: state.vantage.jobPostReducer.jobTemplate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJobTitleValue: (jobTitle) => dispatch(setJobTitleValue(jobTitle)),
    fetchJobDescTemplate: (slug) => dispatch(fetchJobDescTemplate(slug)),
    setJobDescriptionTitles: (titles) =>
      dispatch(setJobDescriptionTitles(titles)),
    setTypeOfEmployment: (typeOfEmployment) =>
      dispatch(setTypeOfEmployment(typeOfEmployment)),
    setSIALicense: (sialicense) => dispatch(setSIALicense(sialicense)),
    setRadio: (radio) => dispatch(setRadio(radio)),
    setContract: (contract) => dispatch(setContract(contract)),
    setEditor: (editor) => dispatch(setEditor(editor)),
    setVenueType: (venueType) => dispatch(setVenueType(venueType)),
    setVenueTypeOtherValue: (venueTypeValue) =>
      dispatch(setVenueTypeOtherValue(venueTypeValue)),
    setImmediateHiring: (immediateHiring) =>
      dispatch(setImmediateHiring(immediateHiring)),
    fetchJobTitleSuggestions: (userToken) =>
      dispatch(fetchJobTitleSuggestions(userToken)),
    setJobRefNumber: (refNumber) => dispatch(setJobRefNumber(refNumber)),
    setShiftSchedule: (shift_schedule) =>
      dispatch(setShiftSchedule(shift_schedule)),
    setShiftTiming: (shift_timing) => dispatch(setShiftTiming(shift_timing)),
    fetchUserAvalibleConnect: (user_token) =>
      dispatch(fetchUserAvalibleConnect(user_token)),
    fetchJobDescriptionTitles: () => dispatch(fetchJobDescriptionTitles()),
    setJobDescriptionTemplate: (temp) =>
      dispatch(setJobDescriptionTemplate(temp)),
    setJobTemplate: (value) => dispatch(setJobTemplate(value)),
    setUpdateJobTemplate: (value) => dispatch(setUpdateJobTemplate(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
