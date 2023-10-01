import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";

import Styles from "./CVSearchNoViewsModal.module.scss";

const CVSearchNoViewsModal = (props) => {
  return (
    <>
      <div>Modal No of view limit exceed</div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CVSearchNoViewsModal);
