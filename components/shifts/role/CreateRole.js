import { connect } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./CreateRole.module.scss";
import Multiselect from "multiselect-react-dropdown";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup } from "reactstrap";
import { useQueryClient } from "@tanstack/react-query";
import useSaveRole from "../../../hooks/Shifts/Roles/useSaveRole";
import useUpdateRole from "../../../hooks/Shifts/Roles/useUpdateRole";
import useSitesList from "../../../hooks/Shifts/Sites/useSitesList";
import {
  setCreateRole,
  setShowCreateRole,
  setRoleName,
  setRoleReference,
  setRoleLicense,
  setRoleJobDescription,
  setRoleUniformType,
  setRoleUniformDescription,
  setRoleUniformImage,
  setRoleSiteType,
  setRoleSiteList,
} from "../../../redux/actions/shiftActions";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const RoleSchema = Yup.object().shape({
  role_Name: Yup.string()
    .max(100, "The role cannot be more than 40 characters long ")
    .required("Please enter Role Name"),
  license_Name: Yup.array().required().min(1, "Please select one of above"),
  job_Description: Yup.string()
    .max(140, "name cannot be more than 140 characters")
    .required("Please enter job description"),
  uniform_Type: Yup.string().required("Please select one of above"),
  uniform_Description: Yup.string().required(
    "Please enter Uniform description"
  ),
  uniform_Type: Yup.string().required("Please select one of above"),
  site_Type: Yup.string().required("Please select one of above"),
  site_List: Yup.array().when("site_Type", {
    is: "selectedOnly",
    then: Yup.array()
      .required()
      .min(1, "Please select atleast one site of above"),
  }),
  sites_Type: Yup.array().when("sites", {
    is: (val) => val === "selectedOnly",
    then: Yup.array()
      // .max(50, "You cannot enter more than 50 characters of long venue")
      .required("Please select atleast one site"),
    otherwise: Yup.array().notRequired(),
  }),
});
function CreateRole(props) {
  const queryClient = useQueryClient();
  const { mutate: saveRoleMutate, isLoading: saveIsloading } = useSaveRole();
  const { mutate: updateRoleMutate, isLoading: updateIsloading } =
    useUpdateRole();
  const { data, refetch: refetchSiteList } = useSitesList();

  useEffect(() => {
    refetchSiteList();
  }, []);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const imageUrl = URL.createObjectURL(file);

      reader.addEventListener("load", () => {
        const image = reader.result;
        props.setRoleUniformImage({
          file_name: file.name,
          file_url: imageUrl,
          file: file,
          should_upload: 1,
          should_remove: 0,
        });
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const licenseOptionChange = (e) => {
    // e.target.checked
    //   ? props.setRoleLicense((prev) => [...prev, e.target.value])
    //   : props.setRoleLicense((prev) =>
    //       prev.filter((value) => (value == e.target.value ? false : true))
    //     );
    const selectedValue = e.target.value;
    const updatedLicense = props.role_license.includes(selectedValue)
      ? props.role_license.filter((value) => value !== selectedValue)
      : [...props.role_license, selectedValue];

    props.setRoleLicense(updatedLicense);
  };

  const resetFromValues = () => {
    props.setRoleName("");
    props.setRoleReference("");
    props.setRoleLicense([]);
    props.setRoleJobDescription("");
    props.setRoleUniformType("");
    props.setRoleUniformDescription("");
    props.setRoleUniformImage("");
    props.setRoleSiteType("");
    props.setRoleSiteList([]);
    props.setShowCreateRole(false);
    props.setCreateRole({ id: 0, mode: "" });
  };

  return (
    <div
      className={`${styles.createRoleMain} position-fixed ${
        props.show_create_role && styles.show
      }`}
    >
      {/* props.show_create_role */}
      <div
        className={`${
          styles.createRoleContainer
        } bg-white box-shadow position-fixed ${
          props.show_create_role && styles.show
        }`}
      >
        <div
          className={`createRole_header border-bottom border-light py-3 px-3 d-flex justify-content-between`}
        >
          <h4 className="mb-0">
            {props.create_role?.mode == "edit" ? "Update role" : "Add new role"}
          </h4>

          <span
            className="cursor-pointer"
            onClick={() => {
              props.setShowCreateRole(false);
              resetFromValues();
            }}
          >
            <img src={`${process.env.APP_URL}/images/x-circle.svg`} />
          </span>
        </div>
        <div className={`${styles.scroll}`}>
          <div className="px-3 py-4">
            <Formik
              enableReinitialize={true}
              initialValues={{
                role_Name: props.role_name,
                role_Reference: props.role_reference,
                license_Name: props.role_license,
                job_Description: props.role_job_description,
                uniform_Type: props.role_uniform_type,
                uniform_Description: props.role_uniform_description,
                uniform_Image: props.role_uniform_image,
                site_Type: props.role_site_type,
                site_List: props.role_site_list,
              }}
              validationSchema={RoleSchema}
              onSubmit={async (values, actions) => {
                const sitesArray =
                  values.site_List.length > 0
                    ? values.site_List.map((v) => v.id)
                    : [];

                actions.setSubmitting(true);
                if (props.create_role.mode == "edit") {
                  updateRoleMutate(
                    {
                      obj: {
                        title: values.role_Name,
                        reference_no: values.role_Reference,
                        job_description: values.job_Description,
                        license: values.license_Name,
                        uniform: values.uniform_Type,
                        uniform_description: values.uniform_Description,
                        uniform_picture: values.uniform_Image.file,
                        should_upload: values.uniform_Image.should_upload,
                        should_remove: values.uniform_Image.should_remove
                          ? 1
                          : 0,
                        sites: sitesArray,
                      },
                      id: props.create_role.id,
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries(["shiftRoleList"]);
                        toast.success("Role updated successfully.");
                        resetFromValues();
                        actions.setSubmitting(false);
                        actions.resetForm();
                        props.refetch && props.refetch();
                      },
                    }
                  );
                } else {
                  saveRoleMutate(
                    {
                      name: values.role_Name,
                      reference: values.role_Reference, // optional
                      jobDescription: values.job_Description,
                      license: values.license_Name,
                      uniform: values.uniform_Type,
                      uniformDescription: values.uniform_Description, // optional
                      uniformImage: values.uniform_Image.file,
                      sitesList: sitesArray, // optional, empty in case of all sites selection
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries(["shiftRoleList"]);
                        toast.success("Role created successfully.");
                        resetFromValues();
                        actions.setSubmitting(false);
                        actions.resetForm();
                        props.refetch && props.refetch();
                      },
                    }
                  );
                }
              }}
            >
              {({ errors, touched, values, isSubmitting, setFieldValue }) => (
                <Form id="role">
                  <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="role_Name"
                          className="form-control"
                          value={props.role_name}
                          placeholder="Role Name"
                          onChange={(e) => props.setRoleName(e.target.value)}
                        />
                        <label className="fs-7 fw-bold">Role Name</label>
                      </div>
                      {errors.role_Name && touched.role_Name ? (
                        <div className="error text-danger mt-1">
                          {errors.role_Name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="role_Reference"
                          className="form-control"
                          value={props.role_reference}
                          placeholder="Reference"
                          onChange={(e) =>
                            props.setRoleReference(e.target.value)
                          }
                        />
                        <label className="fs-7 fw-bold">
                          Reference (optional)
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Licensed Requirement */}
                  <div className="mb-3">
                    <h5 className="mb-2 mb-md-0">Licensed Requirement</h5>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap mt-2">
                      <div
                        className={`gl-checkbox form-group mb-3 mb-md-0 ${styles.license_checkbox}`}
                      >
                        <label className="mb-0">
                          <input
                            type="checkbox"
                            name="license_Name"
                            className=""
                            value="12"
                            checked={props.role_license.find((x) => {
                              if (x == "12") {
                                return true;
                              }
                              return false;
                            })}
                            onChange={licenseOptionChange}
                          />
                          <span
                            className={`${styles.shortName} d-block fw-bold text-center`}
                          >
                            DS
                          </span>
                          <span>Door Supervisor</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>
                      <div
                        className={`gl-checkbox form-group mb-0 ${styles.license_checkbox} `}
                      >
                        <label className="mb-0">
                          <input
                            type="checkbox"
                            name="license_Name"
                            className=""
                            value="44"
                            checked={props.role_license.find((x) => {
                              if (x == "44") {
                                return true;
                              }
                              return false;
                            })}
                            onChange={licenseOptionChange}
                          />
                          <span
                            className={`${styles.shortName} d-block fw-bold text-center`}
                          >
                            SG
                          </span>
                          <span>Security Guard</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>
                      <div
                        className={`gl-checkbox form-group mb-0 ${styles.license_checkbox} `}
                      >
                        <label className="mb-0">
                          <input
                            type="checkbox"
                            name="license_Name"
                            className=""
                            value="13"
                            checked={props.role_license.find((x) => {
                              if (x == "13") {
                                return true;
                              }
                              return false;
                            })}
                            onChange={licenseOptionChange}
                          />
                          <span
                            className={`${styles.shortName} d-block fw-bold text-center`}
                          >
                            CCTV
                          </span>
                          <span>CCTV Operator</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>
                      <div
                        className={`gl-checkbox form-group mb-0 ${styles.license_checkbox} `}
                      >
                        <label className="mb-0">
                          <input
                            type="checkbox"
                            name="license_Name"
                            className=""
                            value="29"
                            checked={props.role_license.find((x) => {
                              if (x == "29") {
                                return true;
                              }
                              return false;
                            })}
                            onChange={licenseOptionChange}
                          />
                          <span
                            className={`${styles.shortName} d-block fw-bold text-center`}
                          >
                            CP
                          </span>
                          <span>Close Protection</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    {errors.license_Name && touched.license_Name ? (
                      <div className="error text-danger mt-1">
                        {errors.license_Name}
                      </div>
                    ) : null}
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="gl-input-simple form-group mb-0">
                        <label className="fw-bold fs-7">Job Description</label>
                        <Field
                          as="textarea" // Use "textarea" as the component
                          id="description"
                          name="job_Description"
                          value={props.role_job_description}
                          className="form-control"
                          placeholder="Job Description"
                          rows="4" // Set the number of rows
                          onChange={(e) =>
                            props.setRoleJobDescription(e.target.value)
                          } // Use onChange to update state
                        />
                      </div>
                      {errors.job_Description && touched.job_Description ? (
                        <div className="error text-danger mt-1">
                          {errors.job_Description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="fw-bold fs-7">Uniform</label>
                    <div className="d-flex justify-content-between">
                      <div
                        className={`gl-radio form-group mb-0 ${
                          styles.uniform_radio
                        } ${props.role_uniform_type == 3 && "border-success"}`}
                      >
                        <label className="mb-0">
                          <input
                            type="radio"
                            name="uniform_Type"
                            className=""
                            value="Formal"
                            checked={
                              props.role_uniform_type == "Formal" && true
                            }
                            onChange={(e) => {
                              props.setRoleUniformType(e.target.value);
                            }}
                          />

                          <span>Formal</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>

                      <div
                        className={`gl-radio form-group mb-0 ${
                          styles.uniform_radio
                        } ${props.role_uniform_type == 3 && "border-success"}`}
                      >
                        <label className="mb-0">
                          <input
                            type="radio"
                            name="uniform_Type"
                            className=""
                            value="Casual"
                            checked={
                              props.role_uniform_type == "Casual" && true
                            }
                            onChange={(e) => {
                              props.setRoleUniformType(e.target.value);
                            }}
                          />

                          <span>Casual</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>

                      <div
                        className={`gl-radio form-group mb-0 ${
                          styles.uniform_radio
                        } ${props.role_uniform_type == 3 && "border-success"}`}
                      >
                        <label className="mb-0">
                          <input
                            type="radio"
                            name="uniform_Type"
                            className=""
                            value="Other"
                            checked={props.role_uniform_type == "Other" && true}
                            onChange={(e) => {
                              props.setRoleUniformType(e.target.value);
                            }}
                          />

                          <span>Other</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    {errors.uniform_Type && touched.uniform_Type ? (
                      <div className="error text-danger mt-1">
                        {errors.uniform_Type}
                      </div>
                    ) : null}
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="uniform_Description"
                          className="form-control"
                          value={props.role_uniform_description}
                          placeholder="Role Name"
                          onChange={(e) =>
                            props.setRoleUniformDescription(e.target.value)
                          }
                        />
                        <label className="fs-7 fw-bold">
                          Uniform Description
                        </label>
                      </div>
                      {errors.uniform_Description &&
                      touched.uniform_Description ? (
                        <div className="error text-danger mt-1">
                          {errors.uniform_Description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="fs-7 fw-bold mb-1">
                        Upload a uniform image {`(optional)`}
                      </label>
                      <div className="form-group mb-0 ">
                        <label className={styles.uploadButton}>
                          <Field
                            type="file"
                            name="uniformImage"
                            accept="image/*"
                            // onChange={(e) => setUniformImage(e.target.files[0])}
                            onChange={onUploadFile}
                          />
                          <span className="fw-medium">Choose file</span>
                        </label>
                        {props.role_uniform_image?.file_name && (
                          <>
                            <br />

                            <div className="border border-1 border-success d-inline-block fs-7 p-1 d-inline-flex align-items-center position-relative rounded">
                              <img
                                src={props.role_uniform_image?.file_url}
                                style={{ maxHeight: `130px` }}
                              />
                              <span
                                className={`cursor-pointer ${styles.close_img}`}
                              >
                                <img
                                  src={`${process.env.APP_URL}/images/remove.svg`}
                                  width={`18px`}
                                  onClick={() => {
                                    props.setRoleUniformImage({
                                      file_name: null,
                                      file_url: null,
                                      file: null,
                                      should_upload: 0,
                                      should_remove: 1,
                                    });
                                  }}
                                />
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div>
                        <div
                          className={`gl-radio form-group mb-0 ${styles.unifor} `}
                        >
                          <label className="mb-0">
                            <input
                              type="radio"
                              name="site_Type"
                              className=""
                              value="all"
                              checked={props.role_site_type == "all" && true}
                              onChange={(e) => {
                                props.setRoleSiteType(e.target.value);
                                props.setRoleSiteList([]);
                              }}
                            />

                            <span>
                              This role is available across all my sites
                            </span>
                            <span
                              className={`checkmark ${styles.checkmark}`}
                            ></span>
                          </label>
                        </div>

                        <div
                          className={`gl-radio form-group mb-0 ${styles.unifor}`}
                        >
                          <label className="mb-0">
                            <input
                              type="radio"
                              name="site_Type"
                              className=""
                              value="selectedOnly"
                              checked={
                                props.role_site_type == "selectedOnly" && true
                              }
                              onChange={(e) => {
                                props.setRoleSiteType(e.target.value);
                              }}
                            />

                            <span>
                              Associate this role to selected sites only
                            </span>
                            <span
                              className={`checkmark ${styles.checkmark}`}
                            ></span>
                          </label>
                        </div>
                      </div>
                      {errors.site_Type && touched.site_Type ? (
                        <div className="error text-danger mt-0 mb-3">
                          {errors.site_Type}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {props.role_site_type == "selectedOnly" &&
                    data?.length > 0 && (
                      <div className="mb-4">
                        <Multiselect
                          options={data.map((site) => ({
                            id: site.id,
                            name: site.title,
                          }))}
                          selectedValues={props.role_site_list}
                          placeholder={"All Sites"}
                          onSelect={(e) => {
                            props.setRoleSiteList(e);
                            setFieldValue("site_List", e); //Update Formik field value
                          }}
                          onRemove={(e) => {
                            props.setRoleSiteList(e);
                            setFieldValue("site_List", e); //Update Formik field value
                          }}
                          displayValue="name"
                          showArrow={true}
                          customArrow={""}
                        />
                        {errors.site_List && touched.site_List ? (
                          <div className="error text-danger mt-1 ">
                            {errors.site_List}
                          </div>
                        ) : null}
                      </div>
                    )}

                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className={`btn btn-md btn-green d-flex align-items-center`}

                        // disabled={isSubmitting}
                      >
                        <span>
                          {props.create_role?.mode == "edit" ? "Update" : "Add"}{" "}
                          Role
                        </span>
                        {(saveIsloading || updateIsloading) && (
                          <Spinner
                            className="ml-2"
                            animation="border"
                            size="sm"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  show_create_role: state.vantage.shiftReducer.showCreateRole,
  create_role: state.vantage.shiftReducer.createRole,
  user_token: state.vantage.userDataReducer.user_token,
  role_name: state.vantage.shiftReducer.roleName,
  role_reference: state.vantage.shiftReducer.roleReference,
  role_license: state.vantage.shiftReducer.roleLicense,
  role_job_description: state.vantage.shiftReducer.roleJobDescription,
  role_uniform_type: state.vantage.shiftReducer.roleUniformType,
  role_uniform_description: state.vantage.shiftReducer.roleUniformDescription,
  role_uniform_image: state.vantage.shiftReducer.roleUniformImage,
  role_site_type: state.vantage.shiftReducer.roleSiteType,
  role_site_list: state.vantage.shiftReducer.roleSiteList,
});
const mapDispatchToProps = (dispatch) => ({
  setCreateRole: (mode) => dispatch(setCreateRole(mode)),
  setShowCreateRole: (show) => dispatch(setShowCreateRole(show)),
  setRoleName: (name) => dispatch(setRoleName(name)),
  setRoleReference: (reference) => dispatch(setRoleReference(reference)),
  setRoleLicense: (license) => dispatch(setRoleLicense(license)),
  setRoleJobDescription: (description) =>
    dispatch(setRoleJobDescription(description)),
  setRoleUniformType: (type) => dispatch(setRoleUniformType(type)),
  setRoleUniformDescription: (description) =>
    dispatch(setRoleUniformDescription(description)),
  setRoleUniformImage: (image) => dispatch(setRoleUniformImage(image)),
  setRoleSiteType: (type) => dispatch(setRoleSiteType(type)),
  setRoleSiteList: (list) => dispatch(setRoleSiteList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);
