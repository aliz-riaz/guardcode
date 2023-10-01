import React, { useEffect } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { protectedRoute } from "../../utilites/utility";
import Head from "next/head";
import SelectOrganisation from "../../components/Organisation/SelectOrganisation";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const Organisation = (props) => {
  useEffect(() => {
    Cookies.remove("isOrgSelected");
    Cookies.remove("natprp");
    props.resetStaffingReducer();
    props.resetOrganisationReducer();
    props.resetGlobalChatReducer();
    props.resetShiftReducer();
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>
      <SelectOrganisation />
    </>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  // resting jobs set in account in case org changes
  resetStaffingReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
  resetOrganisationReducer: () =>
    dispatch({ type: "RESET_ORGANISATION_REDUCER" }),
  resetGlobalChatReducer: () => dispatch({ type: "RESET_GLOBAL_CHAT_REDUCER" }),
  resetShiftReducer: () => dispatch({ type: "RESET_SHIFT_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Organisation);
