import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import IsRequestLoderComponent from "../../../components/Common/IsRequestLoderComponent";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import VerificationInput from "react-verification-input";
import { setIsOrganisationSelected } from "../../../redux/actions/organisationAction";
import LoginCarousel from "../../../components/Common/LoginCarousel";
import { protectedRoute } from "../../../utilites/utility";
import Head from "next/head";
import { Modal } from "react-bootstrap";
import AddOrganisation from "../../../components/Organisation/AddOrganisation";
import SelectOrganisation from "../../../components/Organisation/SelectOrganisation";

const cancelHandler = () => {
  router.push("/organisation");
};

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const AddOrganisationPage = (props) => {
  const router = useRouter();

  const cancelHandler = () => {
    router.push("/organisation");
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>

      <div className="blur-8">
        <SelectOrganisation />
      </div>

      <AddOrganisation show={true} cancelHandler={cancelHandler} />
    </>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setIsOrganisationSelected: (status) =>
    dispatch(setIsOrganisationSelected(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrganisationPage);
