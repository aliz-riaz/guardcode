import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import ApplicantAwaitingAction from "./ApplicantAwaitingAction/ApplicantAwaitingAction";
import CVSearchStats from "./CVSearchStats/CVSearchStats";
// import RecentChat from "./RecentChat/RecentChat";
import StaffingStats from "./StaffingStats/StaffingStats";
import TrainingStats from "./TrainingStats/TrainingStats";
import UpcomingCourses from "./UpcomingCourses/UpcomingCourses";
import NewsAndUpdate from "./NewsAndUpdate/NewsAndUpdate";
import dynamic from "next/dynamic";
const RecentChat = dynamic(() => import("./RecentChat/RecentChat"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-12 col-md-4">
          <div className="dashboard-card-wrap">
            <StaffingStats />
            <ApplicantAwaitingAction />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="dashboard-card-wrap">
            <TrainingStats />
            <UpcomingCourses />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <CVSearchStats />
          <RecentChat />
        </div>
      </div>
      <NewsAndUpdate />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
