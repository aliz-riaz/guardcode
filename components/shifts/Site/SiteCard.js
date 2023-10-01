import { connect } from "react-redux";
import styles from "./SiteCard.module.scss";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap/";
import useSiteEdit from "../../../hooks/Shifts/Sites/useSiteEdit";
import useSiteDelete from "../../../hooks/Shifts/Sites/useSiteDelete";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import {
  setCreateSite,
  setShowCreateSite,
  setSiteName,
  setSiteReference,
  setSiteAddress1,
  setSiteAddress2,
  setSitePostcode,
  setSiteCity,
  setSiteAccessInstruction,
  setSiteLableColor,
  setSiteContactPerson,
  setSiteContactNumber,
  setSiteUseMyDetail,
} from "../../../redux/actions/shiftActions";
import { Spinner } from "reactstrap";

function RoleCard(props) {
  const [siteId, setSiteId] = useState(props.item.id);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: roleEditLoading,
    refetch: siteEditRefetch,
    error,
  } = useSiteEdit(siteId);
  const { mutate, isLoading: siteDeleteLoading } = useSiteDelete();

  const editSiteHandler = async (id) => {
    setLoading(true);
    const fetchData = await siteEditRefetch();
    if (fetchData.status == "success") {
      props.setSiteName(fetchData.data.title),
        props.setSiteReference(fetchData.data.reference_no),
        props.setSiteAddress1(fetchData.data.address),
        props.setSiteAddress2(fetchData.data.addres2),
        props.setSitePostcode(fetchData.data.postcode),
        props.setSiteCity(fetchData.data.city),
        props.setSiteAccessInstruction(fetchData.data.access_instructions),
        props.setSiteLableColor(fetchData.data.colour_calendar),
        props.setSiteContactPerson(fetchData.data.contact_person),
        props.setSiteContactNumber(fetchData.data.contact_number),
        props.setSiteUseMyDetail(fetchData.data.same_contact_details),
        props.setShowCreateSite(true);
      props.setCreateSite({ id: fetchData.data.id, mode: "edit" });
      setLoading(false);
      toggle();
    }
  };
  const deleteRoleHandler = (id) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["shiftSiteList"]);
        toast.success("Site deleted successfully.");
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
          className={`${styles.SiteCard} border border-1 border-light rounded my-2`}
        >
          <div className="px-3 py-2">
            <div className="d-flex align-items-center pb-3 pt-2">
              <div>
                <span className="text-black-50">Site Name</span>
                <h5 className="text-dark fw-bold fs-5 mb-0">
                  {props.item.title}
                </h5>
              </div>
              <div className="d-flex align-items-center ml-auto">
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
                        onClick={() => editSiteHandler(props.item.id)}
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
                        className={`px-2 -py-1 d-flex align-items-center`}
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
          </div>
          <div
            className={`${styles.associate} text-black-50 border-top px-3 py-2`}
          >
            Reference Number:
            <span className="text-dark d-block fw-medium ">
              {props.item.reference_no ? props.item.reference_no : "-"}
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
              <span>Yes, Delete it </span>
              {siteDeleteLoading && (
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
  setCreateSite: (mode) => dispatch(setCreateSite(mode)),
  setShowCreateSite: (show) => dispatch(setShowCreateSite(show)),
  setSiteName: (name) => dispatch(setSiteName(name)),
  setSiteReference: (ref) => dispatch(setSiteReference(ref)),
  setSiteAddress1: (val) => dispatch(setSiteAddress1(val)),
  setSiteAddress2: (val) => dispatch(setSiteAddress2(val)),
  setSitePostcode: (data) => dispatch(setSitePostcode(data)),
  setSiteCity: (code) => dispatch(setSiteCity(code)),
  setSiteAccessInstruction: (val) => dispatch(setSiteAccessInstruction(val)),
  setSiteLableColor: (val) => dispatch(setSiteLableColor(val)),
  setSiteContactPerson: (val) => dispatch(setSiteContactPerson(val)),
  setSiteContactNumber: (val) => dispatch(setSiteContactNumber(val)),
  setSiteUseMyDetail: (val) => dispatch(setSiteUseMyDetail(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleCard);
