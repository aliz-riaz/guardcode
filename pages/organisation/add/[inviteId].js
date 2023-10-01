import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import VerificationInput from "react-verification-input";
import {
  setIsOrganisationSelected,
  acceptOrganisationInvitation,
} from "../../../redux/actions/organisationAction";
import LoginCarousel from "../../../components/Common/LoginCarousel";
import { protectedRoute } from "../../../utilites/utility";
import Head from "next/head";
import { Modal } from "react-bootstrap";
import SelectOrganisation from "../../../components/Organisation/SelectOrganisation";
import { toast } from "react-toastify";

// export const getServerSideProps = async function (context) {
//   const { inviteId } = context.query;
//   const userProps = (await protectedRoute(context)).props;
//   return {
//     props: {
//       ...userProps,
//       inviteId,
//     },
//   };
// };

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const AutoAddOrganisationWithLink = (props) => {
  const router = useRouter();
  const { inviteId } = props.query;
  useEffect(async () => {
    window.history.pushState(null, null, window.location.href);
    // window.onpopstate = function () {
    //     window.history.go(1);
    // };
    const { data, request_status } = await props.acceptOrganisationInvitation(
      props.user_token,
      inviteId
    );
    router.push("/organisation");
  }, []);

  return (
    <>
      <div>Loading...</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  acceptOrganisationInvitation: (userToken, inviteCode) =>
    dispatch(acceptOrganisationInvitation(userToken, inviteCode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoAddOrganisationWithLink);
