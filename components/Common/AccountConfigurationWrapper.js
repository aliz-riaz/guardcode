import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getUsersAccountConfiguration,
  setIsCVSearchAvaliable,
} from "../../redux/actions/userAction";
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
  setDecisionMakerFirstName,
  setDecisionMakerLastName,
  setUserEmail,
  setUserMobileNumber,
  setUserAddressOne,
  setUserAddressTwo,
  setUserCity,
  setUserPostCode,
  setUserId,
  setIsOnboardingFeedbackDone,
} from "../../redux/actions/userAction";
import {
  setIsCustomPlanAvailable,
  setIsPaymentFailed,
} from "../../redux/actions/billingAction";
import { userLogoutAction } from "../../redux/actions/login";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import _ from "lodash";
import { socket } from "../../lib/SocketProvider";
import Cookies from "js-cookie";
import useLogout from "../../hooks/Auth/useLogout";
const AccountConfigurationWrapper = (props) => {
  if (_.isEmpty(socket)) {
    return props.children;
  }

  const { logout } = useLogout(props);
  const router = useRouter();

  const changeForceLogoutValue = () => {
    socket.emit("forceLogoutAndRedirection", {
      actionType: "setForceLogout",
      value: false,
    });
    socket.emit("forceLogoutAndRedirection", {
      actionType: "setRedirectionStatus",
      value: false,
    });
  };

  const changeForceRedirectionValue = () => {
    socket.emit("forceLogoutAndRedirection", {
      actionType: "setRedirectionStatus",
      value: false,
    });
  };

  const handleOrganisaitonClickAutomation = async (
    selectedOrganizaiton,
    userToken
  ) => {
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
    props.setOrganisationName(title);
    props.setIsDiscountEnabled(is_discount_enabled);
    props.setIsDiscountOnCourseBooking(discount);
    props.setNoOfSeatsToAvailDiscount(bookings_to_avail_discount);
    props.setIsBankTransferAvaliable(is_bank_transfer_enabled);
    props.setIsNewsModalDisabled(is_news_modal_disabled);
    props.setExternalLink(is_external_link);
    props.setShiftRequestStatus(shift_requested_status);

    props.setIsOrganisationSelected(true);
    // props.setOrganisationId(id);
    props.setOrganisationMembers(
      members.map((member) => ({
        id: member.id,
        firstName: member.decision_maker_first_name,
        lastName: member.decision_maker_last_name,
      }))
    );
    props.setIsAccountOrganisationOwner(is_account_owner);
    props.setActiveOrganisationMembers(active_organisation_id);
    // props.setUserMenusAcces(menus);
    // props.setIsFullAccess(is_full_access);
    props.setOrganisationSize(company_size);
    props.setIsOrganisationApproved(is_account_approved);
    Cookies.set(
      "natprp",
      Buffer.from(is_account_approved.toString()).toString("base64"),
      {
        path: "/",
      }
    );
    props.setHasOwnerCongratulatedForApproval(has_congratulated);
    props.setOrganisationAccountOwnerId(account_owner.id);
  };

  const handleEmployersPersonalInfoUpdate = (
    employer,
    selectedOrganizaiton
  ) => {
    const {
      id,
      decision_maker_first_name,
      decision_maker_last_name,
      mobile_number,
      email,
      // address1,
      // address2,
      // city,
      // postcode,
    } = employer;

    const { address1, address2, city, postcode } = selectedOrganizaiton;

    props.setUserId(id);
    props.setDecisionMakerFirstName(decision_maker_first_name);
    props.setDecisionMakerLastName(decision_maker_last_name);
    props.setUserMobileNumber(mobile_number);
    props.setUserEmail(email);
    props.setUserAddressOne(address1);
    props.setUserAddressTwo(address2);
    props.setUserCity(city);
    props.setUserPostCode(postcode);
    // address1 && setUserAddressOne(address1);
    // address2 && setUserAddressTwo(address2);
    // city && setUserCity(city);
    // postcode && setUserPostCode(postcode);
  };

  const updateAccountAndOrganisationData = (
    selectedOrganizaiton,
    userToken,
    employer
  ) => {
    handleEmployersPersonalInfoUpdate(employer, selectedOrganizaiton);
    handleOrganisaitonClickAutomation(selectedOrganizaiton, userToken);
  };

  const updateAccountInBackground = async () => {
    const { data, request_status } = await props.getUsersAccountConfiguration(
      props.user_token
    );
    if (request_status) {
      const selectedOrganizaiton = data.organisations.find(
        (org) => org.id == props.organistaionId
      );
      const employer = data.employer;
      if (!employer.is_onboard_feedback_given) {
        props.setIsOnboardingFeedbackDone(false);
      }
      props.setIsCustomPlanAvailable(data.billing.is_custom_plan_available);
      props.setIsPaymentFailed(data.billing.is_payment_failed);
      props.setAllOrganisations(
        data.organisations?.map((organisation) => ({
          id: organisation.id,
          title: organisation.title,
          menus: organisation.menus,
          role: organisation.is_account_owner,
          allowedExternalLink: organisation.is_external_link,
        }))
      );
      updateAccountAndOrganisationData(
        selectedOrganizaiton,
        props.user_token,
        employer
      );
    }
  };

  useEffect(() => {
    socket.emit("forceLogoutAndRedirection", {
      actionType: "getForceLogoutAndRedirectionStatus",
    });

    socket.on("isUserLogoutAndRedirectionStatus", (data, error) => {
      if (data.requestStatus == "success") {
        if (data.data.isLogout && props.is_user_login) {
          changeForceLogoutValue();
          logout();
        } else if (
          data.data.redirectionStatus &&
          props.is_user_login &&
          router.pathname != "/organisation"
        ) {
          // check for redirect
          // redirection login
          // changeForceRedirectionValue()
          // router.push("/organisation")
          updateAccountInBackground();
        }
      } else {
        console.error("Something went wrong in isUserLogout event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });

    return () => {
      socket.removeAllListeners("isUserLogoutAndRedirectionStatus");
    };
  }, [router.pathname]);

  useEffect(async () => {
    if (
      props.is_user_login &&
      props.organistaionId &&
      props.user_token &&
      router.pathname != "/login" &&
      router.pathname != "/signup" &&
      router.pathname != "/organisation" &&
      !router.pathname.includes("/organisation/add/")
    ) {
      updateAccountInBackground();
    }
  }, [router.pathname]);

  return props.children;
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_user_login: state.vantage.userDataReducer.is_user_login,
  employers_user_id: state.vantage.userDataReducer.user_id,
  is_cv_search_avalible: state.vantage.userDataReducer.is_cv_search_avalible,
  organistaionId: state.vantage.organisationReducer.organistaionId,
  organisationReducer: state.vantage.organisationReducer,
  userDataReducer: state.vantage.userDataReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersAccountConfiguration: (userToken) =>
    dispatch(getUsersAccountConfiguration(userToken)),
  // setIsCVSearchAvaliable: (status) => dispatch(setIsCVSearchAvaliable(status)),

  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),

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

  setDecisionMakerFirstName: (firstName) =>
    dispatch(setDecisionMakerFirstName(firstName)),
  setDecisionMakerLastName: (lastName) =>
    dispatch(setDecisionMakerLastName(lastName)),
  setUserEmail: (userEmail) => dispatch(setUserEmail(userEmail)),
  setUserMobileNumber: (mobileNumber) =>
    dispatch(setUserMobileNumber(mobileNumber)),
  setUserAddressOne: (addressOne) => dispatch(setUserAddressOne(addressOne)),
  setUserAddressTwo: (addressTwo) => dispatch(setUserAddressTwo(addressTwo)),
  setUserCity: (city) => dispatch(setUserCity(city)),
  setUserPostCode: (postcode) => dispatch(setUserPostCode(postcode)),
  setUserId: (userId) => dispatch(setUserId(userId)),
  setIsOnboardingFeedbackDone: (status) =>
    dispatch(setIsOnboardingFeedbackDone(status)),
  //billing
  setIsCustomPlanAvailable: (userId) =>
    dispatch(setIsCustomPlanAvailable(userId)),
  setIsPaymentFailed: (userId) => dispatch(setIsPaymentFailed(userId)),
  setExternalLink: (isLinkAllowed) => dispatch(setExternalLink(isLinkAllowed)),
  setShiftRequestStatus: (status) => dispatch(setShiftRequestStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountConfigurationWrapper);
