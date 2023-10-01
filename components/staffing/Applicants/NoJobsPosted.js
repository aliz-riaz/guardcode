import PostAJobButton from "../../JobPost/PostAJobButton";

const NoJobsPosted = ({ styles }) => {
  return (
    <>
      <div className={styles.noApplicantFound}>
        <div>
          <img src={process.env.APP_URL + "/images/noapplicants-img.svg"} />
        </div>
        <h4>You haven’t posted any job yet</h4>
        <p>
          The applicants applied against any job, will reside here.{" "}
          <br className="d-none d-md-block" /> below to start receiving
          applicants
        </p>
        <div className="d-inline-block mb-0">
          <PostAJobButton />
        </div>
      </div>
    </>
  );
};

export default NoJobsPosted;
