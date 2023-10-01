import { connect } from "react-redux";
import styles from "./RoleCard.module.scss";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap/";
import useRoleEdit from "../../../hooks/Shifts/Roles/useRolesEdit";
import useRoleDelete from "../../../hooks/Shifts/Roles/useRoleDelete";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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
import { Spinner } from "reactstrap";
import { SplitButton } from "react-bootstrap";

function RoleCard(props) {
  const [roleId, setRoleId] = useState(props.item.id);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: roleEditLoading,
    refetch: roleEditRefetch,
    error,
  } = useRoleEdit(roleId);
  const { mutate, isLoading: roleDeleteLoading } = useRoleDelete();

  const editRoleHandler = async (id) => {
    setLoading(true);
    setRoleId(id); // Set the roleId to trigger a refetch
    const fetchData = await roleEditRefetch();

    if (fetchData.status == "success") {
      props.setRoleName(fetchData.data.title);
      props.setRoleReference(fetchData.data.reference_no);
      props.setRoleLicense(
        fetchData.data.license.map((v) => v.license_id.toString())
      );
      props.setRoleJobDescription(fetchData.data.job_description);
      props.setRoleUniformType(fetchData.data.uniform);
      props.setRoleUniformDescription(fetchData.data.uniform_description);
      props.setRoleUniformImage({
        file_name: fetchData.data.uniform_picture,
        file_url: fetchData.data.uniform_picture,
        file: null,
        should_upload: 0,
        should_remove: 0,
      });
      props.setRoleSiteType(fetchData.data.all_sites ? "all" : "selectedOnly");
      props.setRoleSiteList(
        !fetchData.data.all_sites &&
          fetchData.data.rolesite?.map((v) => {
            return {
              id: v.site.id,
              name: v.site.title,
            };
          })
      );
      props.setShowCreateRole(true);
      props.setCreateRole({ id: fetchData.data.id, mode: "edit" });
      setLoading(false);
      toggle();
    }
  };
  const deleteRoleHandler = (id) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["shiftRoleList"]);
        toast.success("Role deleted successfully.");
        setDeleteModal(false);
        props.refetch();
      },
    });
  };
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <div className="col-12 col-md-4">
        <div
          className={`${styles.RoleCard} border border-1 border-light rounded my-2`}
        >
          <div className="px-3 py-2">
            <div className="d-flex align-items-center pb-3 pt-2">
              <div>
                <span className="text-black-50">Role Name</span>
                <h5 className="text-dark fw-bold fs-5 mb-0">
                  {props.item.title}
                </h5>
              </div>
              <div className="d-flex align-items-center ml-auto">
                {props.item.reference_no && (
                  <span className="text-dark fw-bold fs-7 mr-1">
                    REF: {props.item.reference_no}
                  </span>
                )}{" "}
                {/* <Dropdown className={`${styles.more_dropdown}`}> */}
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className={`${styles.more_dropdown}`}
                >
                  <DropdownToggle
                    className={`${styles.more_btn} bg-transparent p-0`}
                  >
                    <img src={`${process.env.APP_URL}/images/more_vert.svg`} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <ul className="list-unstyled mb-0">
                      <li
                        className={`px-2 -py-1 d-flex align-items-center ${
                          loading && "pointer-none"
                        }`}
                        onClick={() => editRoleHandler(props.item.id)}
                      >
                        <span style={{ marginTop: "1px" }}>Edit</span>
                        {loading && (
                          <Spinner
                            animation="border"
                            size={`sm`}
                            className="ml-2"
                          />
                        )}
                      </li>
                      <li
                        className={`px-2 -py-1 d-flex align-items-center ${
                          roleDeleteLoading && "pointer-none"
                        }`}
                        onClick={() => setDeleteModal(true)}
                      >
                        <span style={{ marginTop: "1px" }}>Delete</span>
                        {/* {roleDeleteLoading && (
                          <Spinner
                            animation="border"
                            size={`sm`}
                            className="ml-2"
                          />
                        )} */}
                      </li>
                    </ul>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className={`${styles.licensedNames}`}>
              <span className="text-black-50">Licences</span>
              <ul className="list-unstyled d-flex flex-wrap mt-1">
                {props.item.license?.length > 0
                  ? props.item.license.map((val, index) => (
                      <li
                        key={index}
                        className="fw-medium px-2 mb-1 py-1 rounded"
                      >
                        {val.title}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div
            className={`${styles.associate} text-black-50 border-top px-3 py-2`}
          >
            Associate to:
            <span className="text-dark d-block fw-medium">
              {props.item.all_sites
                ? "All Sites"
                : props.item.rolesite?.length > 0
                ? props.item.rolesite.map((sites, i) => {
                    return (
                      <>
                        {sites.site?.title}
                        {props.item.rolesite.length > 1 &&
                          props.item.rolesite.length != i + 1 &&
                          ", "}
                      </>
                    );
                  })
                : null}
            </span>
          </div>
        </div>
      </div>
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        backdrop="static"
        keyboard={false}
        className={`${styles.deleteModal}`}
        centered
      >
        <Modal.Header className={`${styles.modal_header}`} closeButton>
          <Modal.Title className={`${styles.title} fs-6 fw-bold`}>
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="mb-0 fs-6">
              Are you sure want to delete this job role permanently from your
              organisation?{" "}
            </p>
          </div>
          <div className={`${styles.btn_row} d-flex justify-content-end mt-3`}>
            <button
              className="btn btnb-md btn-dark mx-2"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btnb-md btn-danger"
              onClick={() => deleteRoleHandler(props.item.id)}
            >
              <span>Yes, Delete it</span>
              {roleDeleteLoading && (
                <Spinner animation="border" size={`sm`} className="ml-2" />
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({});
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

export default connect(mapStateToProps, mapDispatchToProps)(RoleCard);
