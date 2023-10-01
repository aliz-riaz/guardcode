import { connect } from "react-redux";
import {
  Col,
  Container,
  Modal,
  Row,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./SelectOrganisation.module.scss";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  getListOfUsersAllOrganisation,
  setOrganisationId,
  setOrganisationMembers,
  setOrganisationSize,
  setIsOrganisationSelected,
  setIsAccountOrganisationOwner,
  setActiveOrganisationMembers,
  markSelectedOrganisationAsDefault,
  setUserMenusAcces,
  setIsFullAccess,
  setIsOrganisationApproved,
  setHasOwnerCongratulatedForApproval,
  setAllOrganisations,
  setOrganisationAccountOwnerId,
  setExternalLink,
  setShiftRequestStatus,
} from "../../redux/actions/organisationAction";
import {
  setOrganisationName,
  setIsDiscountEnabled,
  setIsDiscountOnCourseBooking,
  setNoOfSeatsToAvailDiscount,
  setIsBankTransferAvaliable,
  setIsNewsModalDisabled,
} from "../../redux/actions/userAction";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { socket } from "../../lib/SocketProvider";
import { userLogoutAction } from "../../redux/actions/login";
import _ from "lodash";
import Cookies from "js-cookie";
import useLogout from "../../hooks/Auth/useLogout";

const Selectorganisation = (props) => {
  const router = useRouter();
  const { logout } = useLogout(props);
  const { query } = router;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingorganisations, setLoadingorganisations] = useState(false);
  const [activeOrganistion, setActiveOrganistion] = useState(null);

  const [isOrgSelected, setIsOrgSelected] = useCookies(["isOrgSelected"]);
  const [intended, setIntended] = useCookies(["intended"]);

  useEffect(async () => {
    window.history.pushState(null, null, window.location.href);
    // window.onpopstate = function () {
    //     window.history.go(1);
    // };
    setLoadingorganisations(true);
    const { data, request_status } = await props.getListOfUsersAllOrganisation(
      props.user_token
    );
    setData(data.organisations);
    props.setAllOrganisations(
      data.organisations?.map((organisation) => ({
        id: organisation.id,
        title: organisation.title,
        menus: organisation.menus,
        role: organisation.is_account_owner,
        allowedExternalLink: organisation.is_external_link,
      }))
    );
    setLoading(!request_status);
    if (query.organisationid && query.jobid && query.plot && query.appid) {
      const queryString = router.asPath.split("?")[1];
      const selectedOrganisation = data.organisations.find(
        (org) => org.id == query.organisationid
      );
      if (selectedOrganisation) {
        handlerOrganizaitonSelection(
          selectedOrganisation,
          `/staffing?${queryString}`
        );
      } else {
        toast.error("Something went wrong, Please try again!");
        router.push("/organisation");
        setLoadingorganisations(false);
      }
    } else {
      setLoadingorganisations(false);
    }
  }, []);

  const handlerOrganizaitonSelection = async (
    selectedOrganizaiton,
    redirectTo
  ) => {
    // mark organisation as default
    const {
      id,
      members,
      title,
      is_discount_enabled,
      discount,
      is_bank_transfer_enabled,
      is_news_modal_disabled,
      bookings_to_avail_discount,
      is_account_owner,
      active_organisation_id,
      menus,
      is_full_access,
      company_size,
      is_account_approved,
      has_congratulated,
      account_owner,
      is_external_link,
      shift_requested_status,
    } = selectedOrganizaiton;
    setActiveOrganistion(id);

    const { data, request_status } =
      await props.markSelectedOrganisationAsDefault(props.user_token, id);
    if (request_status) {
      // cookies set for organizaiton selection status
      // user and organizaiton reducer set

      props.setOrganisationName(title);
      props.setIsDiscountEnabled(is_discount_enabled);
      props.setIsDiscountOnCourseBooking(discount);
      props.setNoOfSeatsToAvailDiscount(bookings_to_avail_discount);
      props.setIsBankTransferAvaliable(is_bank_transfer_enabled);
      props.setIsNewsModalDisabled(is_news_modal_disabled);

      props.setIsOrganisationSelected(true);
      props.setOrganisationId(id);
      props.setOrganisationMembers(
        members.map((member) => ({
          id: member.id,
          firstName: member.decision_maker_first_name,
          lastName: member.decision_maker_last_name,
        }))
      );
      props.setIsAccountOrganisationOwner(is_account_owner);
      props.setActiveOrganisationMembers(active_organisation_id);
      props.setUserMenusAcces(menus);
      props.setIsFullAccess(is_full_access);
      props.setOrganisationSize(company_size);
      props.setIsOrganisationApproved(is_account_approved);
      props.setHasOwnerCongratulatedForApproval(has_congratulated);
      props.setOrganisationAccountOwnerId(account_owner.id);
      Cookies.set(
        "natprp",
        Buffer.from(is_account_approved.toString()).toString("base64"),
        {
          path: "/",
        }
      );
      setIsOrgSelected("isOrgSelected", true, {
        path: "/",
      });
      props.setExternalLink(is_external_link);
      router.push(redirectTo).then(() => {
        setActiveOrganistion(id);
        setLoadingorganisations(false);
      });
      props.setShiftRequestStatus(shift_requested_status);
    } else {
      setActiveOrganistion(id);
    }
  };

  if (loading) {
    return (
      <Modal className={`${styles.organisation_modal}`} show={true}>
        <Modal.Body className={`${styles.organisation_body}`}>
          <div>Loading....</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className={`${styles.select_organizaiton}`}>
      <Container>
        <Row>
          <Col>
            <div
              className={`${styles.top_navbar} d-flex align-items-center justify-content-between`}
            >
              {/* <a href="#"> */}
              <img
                src={`/employers/images/guardpass-logo-black.svg`}
                className="img-fluid mt-auto"
              />
              {/* </a> */}
              <button
                className="btn btn-green btn-md py-2 px-4"
                onClick={logout}
              >
                Logout
              </button>
            </div>
            <h2 className="text-left pb-2 mt-5 fw-bold">Select Organisation</h2>
            {loadingorganisations ? (
              <div
                className={`${styles.organsation_loader} d-flex justify-content-center align-items-center`}
              >
                <Spinner animation="border" size={"lg"} />
              </div>
            ) : (
              <div
                className={`d-flex flex-wrap justify-content-star mt-3 ${styles.fix_width}`}
              >
                {data &&
                  data.length > 0 &&
                  data.map((organisation, index) => {
                    return (
                      <div
                        onClick={() =>
                          handlerOrganizaitonSelection(
                            organisation,
                            intended.intended ? intended.intended : "/dashboard"
                          )
                        }
                        className={`cursor-pointer ${styles.organisation_box} rounded`}
                      >
                        {activeOrganistion == organisation.id ? (
                          <Spinner animation="border" size={"lg"} />
                        ) : (
                          <>
                            <img
                              src={organisation.brand.logo_url}
                              className="img-fluid"
                            />
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id={"tooltip-" + index}>
                                  {organisation.title}
                                </Tooltip>
                              }
                            >
                              <span className="mt-auto">
                                {organisation.title}
                              </span>
                            </OverlayTrigger>
                          </>
                        )}
                      </div>
                    );
                  })}
                {
                  <Link href="/organisation/add">
                    <div
                      className={`${styles.create} ${styles.organisation_box} cursor-pointer rounded`}
                    >
                      <img
                        src={`${process.env.APP_URL}/images/plus_icon.svg`}
                        className="img-fluid mt-auto"
                      />
                      <span className="mt-auto d-block pb-1">
                        Create Organisation
                      </span>
                    </div>
                  </Link>
                }
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  getListOfUsersAllOrganisation: (userToken) =>
    dispatch(getListOfUsersAllOrganisation(userToken)),
  //user's info

  setOrganisationName: (organisationName) =>
    dispatch(setOrganisationName(organisationName)),
  setIsDiscountEnabled: (discountEnabled) =>
    dispatch(setIsDiscountEnabled(discountEnabled)),
  setIsDiscountOnCourseBooking: (discount) =>
    dispatch(setIsDiscountOnCourseBooking(discount)),
  setNoOfSeatsToAvailDiscount: (availDiscount) =>
    dispatch(setNoOfSeatsToAvailDiscount(availDiscount)),
  setIsBankTransferAvaliable: (status) =>
    dispatch(setIsBankTransferAvaliable(status)),
  setIsNewsModalDisabled: (status) => dispatch(setIsNewsModalDisabled(status)),

  setIsOrganisationSelected: (status) =>
    dispatch(setIsOrganisationSelected(status)),
  setOrganisationId: (organisationId) =>
    dispatch(setOrganisationId(organisationId)),
  setOrganisationMembers: (organisationMembers) =>
    dispatch(setOrganisationMembers(organisationMembers)),
  setIsOrganisationApproved: (status) =>
    dispatch(setIsOrganisationApproved(status)),
  setHasOwnerCongratulatedForApproval: (status) =>
    dispatch(setHasOwnerCongratulatedForApproval(status)),
  setOrganisationAccountOwnerId: (ownerId) =>
    dispatch(setOrganisationAccountOwnerId(ownerId)),

  setIsAccountOrganisationOwner: (status) =>
    dispatch(setIsAccountOrganisationOwner(status)),
  setActiveOrganisationMembers: (activeOrganisation) =>
    dispatch(setActiveOrganisationMembers(activeOrganisation)),
  setUserMenusAcces: (menus) => dispatch(setUserMenusAcces(menus)),
  setIsFullAccess: (menus) => dispatch(setIsFullAccess(menus)),
  setOrganisationSize: (organisationSize) =>
    dispatch(setOrganisationSize(organisationSize)),
  setAllOrganisations: (allOrganisations) =>
    dispatch(setAllOrganisations(allOrganisations)),

  markSelectedOrganisationAsDefault: (userToken, organistationId) =>
    dispatch(markSelectedOrganisationAsDefault(userToken, organistationId)),

  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
  setExternalLink: (isLinkAllowed) => dispatch(setExternalLink(isLinkAllowed)),
  setShiftRequestStatus: (status) => dispatch(setShiftRequestStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectorganisation);
