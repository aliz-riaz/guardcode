import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import usePayCalculate from "../../../../hooks/Shifts/ShiftPosting/usePayCalculate";
import {
  setShowCreateRole,
  setShowCreateSite,
  setShiftSelectSite,
  setShiftSelectRole,
  setShiftSelectVenueType,
  setShiftExternalCharges,
  setShiftCal,
} from "../../../../redux/actions/shiftActions";
import CreateRole from "../../role/CreateRole";
import CreateSite from "../../Site/CreateSite";
import ShiftRolesDropdown from "../../shifts/ShiftRolesDropdown";
import NextBackBtn from "../GlobalComponents/NextBackBtn";
import ShiftSitesDropdown from "../../shifts/ShiftSitesDropdown";
import VenueEnvType from "./VenueEnvType";
import AddShiftList from "./AddShiftList";
import SiteDetails from "../Step02/SiteDetails";
import RoleDetails from "../Step02/RoleDetails";
import styles from "./AddShiftForm.module.scss";
import SiteRoleDropdown from "./SiteRoleDropdown.module.scss";

const AddShiftSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  site: Yup.string().required("Site is required"),
  venue_type: Yup.string().required("Please select venue type"),
  shifts: Yup.array().of(
    Yup.object().shape({
      date_start: Yup.string().required("Date is required"),
      time_start: Yup.string().required("Start time is required"),
      // time_end: Yup.string().required("End time is required"),
      time_end: Yup.string()
        .required("End time is required")
        .test(
          "is-not-same",
          "End time must be different from start time",
          function (value) {
            const startTime = this.parent.time_start;
            return value !== startTime;
          }
        ),
      paid_break: Yup.number()
        .required("Paid break is required")
        .integer("special characters not allowed")
        .min(0, "Negative numbers not allowed")
        .max(500, "Limit exceeded"),
      workers_required: Yup.number()
        .required("Required workers is required")
        .min(1, "Atleast 1 worker is required")
        .max(500, "Limit exceeded"),
      pay_rate: Yup.number()
        .required("Pay rate is required")
        .min(1, "Pay rate is required")
        .max(1000, "Pay rate is too high"),
    })
  ),
});

const AddShiftForm = (props) => {
  const queryClient = useQueryClient();

  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  //generate multiple license list
  const license = props.selectedRole?.license?.map((lic, i) => {
    return (
      <li className="mb-2  list-unstyled">
        <span className={`${styles.license} fw-medium py-1 px-2 rounded`}>
          {lic.title}
        </span>
      </li>
    );
  });

  const { mutate } = usePayCalculate();

  //pay calculation
  const calculations = props?.shiftPostingArray?.map((item) => {
    const start_time = item.time_start;
    const end_time = item.time_end;

    const startDate = new Date(`1970-01-01T${start_time}`);
    const endDate = new Date(`1970-01-01T${end_time}`);

    // Check if end time is earlier than start time and add a day to end time
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    const duration = endDate - startDate;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const working_hour_to_number =
      hours + "." + (minutes < 10 ? "0" : "") + minutes;
    const pay_rate = parseFloat(item.pay_rate);
    const working_hour = parseFloat(working_hour_to_number);

    return { working_hour, pay_rate };
  });

  const obj = {
    slots: calculations,
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          role: props.selectedRole.title,
          site: props.selectedSite.fullTitle,
          venue_type: props.selectedVenue,
          shifts: props.shiftPostingArray,
        }}
        validationSchema={AddShiftSchema}
        onSubmit={(values) => {
          //sending payload and forwarding step if api success
          mutate(obj, {
            onSuccess: (data) => {
              props.setShiftCal(calculations);
              //api response
              props.setShiftExternalCharges(data);
              props.setPostShiftActiveStep(2);
            },
          });
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <div className="main-content">
              <div className={`main-inner-content`}>
                <div className={styles.wrapper}>
                  <h4>Add Shift Details</h4>
                  <div className={`bg-white px-4 py-5`}>
                    {/* shiftSite Dropdown component */}
                    <ShiftSitesDropdown
                      label="Select site"
                      placeholder={
                        props.selectedSite.fullTitle
                          ? props.selectedSite.fullTitle
                          : "Select or add Site"
                      }
                      onSelection={(site) => {
                        setSelectedSite(site);
                        props.setShiftSelectSite(site);
                        setFieldValue("site", site.title);
                      }}
                      styles={SiteRoleDropdown}
                      showAddNewSiteOption={true}
                      showAddNewSiteOptionText="Add new site"
                      onAddNewSiteSelection={(e) =>
                        props.setShowCreateSite(true)
                      }
                    />
                    {props.selectedSite.title && <SiteDetails />}
                    <ErrorMessage
                      component="h6"
                      className="text-danger fw-normal  "
                      name={`site`}
                    />

                    {/* shiftRole Dropdown component */}
                    <ShiftRolesDropdown
                      label={
                        props.selectedSite.fullTitle ? (
                          "Select Role"
                        ) : (
                          <span className="fw-lighter  ">
                            Select Role{" "}
                            <span className="fw-semibold  text-danger ">
                              ( Select site first to enable role list )
                            </span>
                          </span>
                        )
                      }
                      placeholder={
                        props.selectedRole.title
                          ? props.selectedRole.title
                          : "Select or add Role"
                      }
                      onSelection={(role) => {
                        setSelectedRole(role);
                        props.setShiftSelectRole(role);
                        setFieldValue("role", role.title);
                      }}
                      styles={SiteRoleDropdown}
                      showAddNewRoleOptionText="Add new role"
                      showAddNewRoleOption={true}
                      onAddNewRoleSelection={() =>
                        props.setShowCreateRole(true)
                      }
                      isSiteSelected={props.selectedSite.fullTitle}
                    />
                    {props.selectedRole.title && (
                      <RoleDetails license={license} />
                    )}
                    <ErrorMessage
                      component="h6"
                      className="text-danger fw-normal  "
                      name={`role`}
                    />
                    {/* Venue or Environment type component */}
                    <VenueEnvType
                      error={errors.venue_type}
                      setFieldValue={setFieldValue}
                      values={values}
                      venueTypeHandler={(value) => {
                        if (props.selectedVenue == value) {
                          props.setShiftSelectVenueType("");
                          setFieldValue("venue_type", "");
                        } else {
                          props.setShiftSelectVenueType(value);
                          setFieldValue("venue_type", value);
                        }
                      }}
                    />

                    {/* Add Shifts list component */}
                    <FieldArray
                      name="shifts"
                      render={(arrayHelpers) => (
                        <AddShiftList
                          setPostShiftActiveStep={props.setPostShiftActiveStep}
                          postShiftActiveStep={props.postShiftActiveStep}
                          values={values.shifts}
                          arrayHelpers={arrayHelpers}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <NextBackBtn
              postShiftActiveStep={props.postShiftActiveStep}
              setPostShiftActiveStep={props.setPostShiftActiveStep}
            />
          </Form>
        )}
      </Formik>
      {props.showCreateRole && <CreateRole />}
      {props.showCreateSite && <CreateSite />}
    </>
  );
};

const mapStateToProps = (state) => ({
  showCreateRole: state.vantage.shiftReducer.showCreateRole,
  showCreateSite: state.vantage.shiftReducer.showCreateSite,
  user_token: state.vantage.userDataReducer.user_token,
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  selectedVenue: state.vantage.shiftReducer.selectedVenue,
  selectedSite: state.vantage.shiftReducer.selectedSite,
  selectedRole: state.vantage.shiftReducer.selectedRole,
  calculations: state.vantage.shiftReducer.calculations,
  shiftExternalCharge: state.vantage.shiftReducer.shiftExternalCharge,
});
const mapDispatchToProps = (dispatch) => ({
  setShowCreateRole: (show) => dispatch(setShowCreateRole(show)),
  setShowCreateSite: (show) => dispatch(setShowCreateSite(show)),

  setShiftPostingArray: (data) => dispatch(setShiftPostingArray(data)),
  setShiftPostingDeleteArray: (index) =>
    dispatch(setShiftPostingDeleteArray(index)),
  setShiftSelectSite: (site) => dispatch(setShiftSelectSite(site)),
  setShiftSelectRole: (role) => dispatch(setShiftSelectRole(role)),
  setShiftSelectVenueType: (venue) => dispatch(setShiftSelectVenueType(venue)),
  setShiftExternalCharges: (data) => dispatch(setShiftExternalCharges(data)),
  setShiftCal: (data) => dispatch(setShiftCal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShiftForm);
