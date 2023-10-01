import styles from "./FeedbackSteps.module.scss";

const StepHeader = ({ text }) => (
  <h3 className={`fs-3 mb-1 ${styles.steps_header}`}>{text}</h3>
);

const Step1Iterator = [
  {
    name: "hiring",
    component: (
      <>
        <div className={`${styles.img_wrap}`}>
          <img src={`${process.env.APP_URL}/images/onboard-1.svg`} />
        </div>
        <span>
          Hiring security <br /> professionals
        </span>
      </>
    ),
    text: null,
  },
  {
    name: "traning",
    component: (
      <>
        <div className={`${styles.img_wrap}`}>
          <img src={`${process.env.APP_URL}/images/onboard-2.svg`} />
        </div>
        <span>
          Booking courses <br /> & staff training
        </span>
      </>
    ),
    text: null,
  },
];

const Step2Iterator = [
  {
    name: "linkedin",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/linkedin-icon.svg`} />
      </>
    ),
    text: <span>LinkedIn</span>,
  },
  {
    name: "indeed",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/indeed-icon.svg`} />
      </>
    ),
    text: <span>Indeed</span>,
  },
  {
    name: "reed",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/reed-icon.svg`} />
      </>
    ),
    text: <span>Reed</span>,
  },
  {
    name: "jobToday",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/job-today-icon.svg`} />
      </>
    ),
    text: <span>Job today</span>,
  },
  {
    name: "others",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/others-icon.svg`} />
      </>
    ),
    text: <span>Others</span>,
  },
];

const Step3Iterator = [
  {
    name: "permenant",
    component: (
      <>
        <span>
          Permanent <br /> jobs
        </span>
      </>
    ),
    text: null,
  },
  {
    name: "temporary",
    component: (
      <>
        <span>
          Temporary <br /> jobs
        </span>
      </>
    ),
    text: null,
  },
  {
    name: "shiftBased",
    component: (
      <>
        <span>
          Shift based <br /> work
        </span>
      </>
    ),
    text: null,
  },
  {
    name: "placement",
    component: (
      <>
        <span>Placement</span>
        <span className={`${styles.fs_14} fw-normal mt-0`}>
          We'll filter candidates <br /> and help you hire fast
        </span>
      </>
    ),
    text: null,
  },
];

const Step4Iterator = [
  {
    name: "corporate",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/onboard-3.svg`} />
      </>
    ),
    text: <span>Corporate</span>,
  },
  {
    name: "retail",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/onboard-4.svg`} />
      </>
    ),
    text: <span>Retail</span>,
  },
  {
    name: "barClub",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/onboard-5.svg`} />
      </>
    ),
    text: <span>Bar/Clubs</span>,
  },
  {
    name: "events",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/onboard-6.svg`} />
      </>
    ),
    text: <span>Events</span>,
  },
  {
    name: "mobile",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/onboard-7.svg`} />
      </>
    ),
    text: <span>Mobile</span>,
  },
  {
    name: "venueOthers",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/others-icon.svg`} />
      </>
    ),
    text: <span>Others</span>,
  },
];

const Step5Iterator = [
  {
    name: "ds",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-1.svg`} />
      </>
    ),
    text: <span>Door Supervisor Training</span>,
  },
  {
    name: "cctv",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-2.svg`} />
      </>
    ),
    text: <span>CCTV Training</span>,
  },
  {
    name: "topUpDS",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-3.svg`} />
      </>
    ),
    text: <span>Top-Up for Door Supervisor</span>,
  },
  {
    name: "cp",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-4.svg`} />
      </>
    ),
    text: <span>Close Protection Training</span>,
  },
  {
    name: "topUpSG",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-3.svg`} />
      </>
    ),
    text: <span>Top up for Security Guarding</span>,
  },
  {
    name: "sg",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-5.svg`} />
      </>
    ),
    text: <span>Security Guard Training</span>,
  },
  {
    name: "efaw",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-6.svg`} />
      </>
    ),
    text: <span>Emergency First Aid at Work</span>,
  },
  {
    name: "aplh",
    component: (
      <>
        <img src={`${process.env.APP_URL}/images/course-ico-7.svg`} />
      </>
    ),
    text: <span>Personal Licence Training (APLH)</span>,
  },
];
export {
  StepHeader,
  Step1Iterator,
  Step2Iterator,
  Step3Iterator,
  Step4Iterator,
  Step5Iterator,
};
