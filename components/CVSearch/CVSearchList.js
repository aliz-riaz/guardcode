import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import CVSearchCard from "./CVSearchCard";
import styles from "./CVSearchList.module.scss";

const CVSearchList = (props) => {
  return (
    <div className={`${styles.cv_search_list}`}>
      {props.applicants.map((applicant, indx) => {
        return <CVSearchCard applicant={applicant} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(CVSearchList);
