import React from "react";
import { connect } from "react-redux";
import styles from "./UpcomingCourses.module.scss";
import { useRouter } from "next/router";

const UpcomingCoursesEmptyState = () => {
  const router = useRouter();
  return (
    <>
      <div className={`${styles.empty_card}`}>
        <img src={`${process.env.APP_URL}/images/empty_course.svg`} alt="" />
        <h3 className="fw-bold my-3">No trainings booked</h3>
        <p className="fs-6 fw-normal mb-4">
          Your reserved trainees would show up here.
        </p>
      </div>
    </>
  );
};

export default UpcomingCoursesEmptyState;
