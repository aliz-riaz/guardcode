import styles from "./TourConstants.module.scss";

const CUSTOM_STYLES = {
  options: {
    zIndex: 9999,
    padding: 0,
    margin: 0,
    fontFamily: "Roboto",
  },
  tooltipContainer: {
    padding: 0,
    fontFamily: "Roboto",
  },
  tooltipContent: {
    padding: "0px 10px",
  },
  tooltipFooter: {
    alignItems: "center",
    display: "flex",
    marginTop: "25px",
    justifyContent: "space-between",
  },
  buttonNext: {
    backgroundColor: "#3BD55A",
    borderRadius: 4,
    fontWeight: 600,
    color: "#242429",
    marginTop: 0,
    marginRight: 0,
    padding: "12px 30px",
    outline: 0,
    fontFamily: "Roboto",
  },
  buttonSkip: {
    backgroundColor: "transparent",
    borderRadius: 4,
    marginTop: 0,
    marginRight: 0,
    padding: "0 10px",
    color: "#A4A4A4",
    outline: 0,
    fontFamily: "Roboto",
  },
};

const BUTTON_TEXTS = {
  last: "Got it!",
  next: "Next",
  skip: "Skip",
};

const commonSettings = {
  disableBeacon: true,
  hideCloseButton: true,
  showSkipButton: true,
  hideBackButton: true,
  styles: {
    options: {
      zIndex: 1000,
    },
  },
};

const STEPS = [
  {
    target: "#dashboardTab",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>Quickly access the latest updates</h2>
        <p className="fs-6 m-0">
          Your dashboard is where you'll see the latest updates on your jobs,
          bookings, chats and more!
        </p>
      </div>
    ),
    placement: "right",
    ...commonSettings,
  },
  {
    target: "#trainingTab",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>Book training courses and view progress</h2>
        <p className="fs-6 m-0">
          Book your staff on training courses and view their progress from the
          training section.
        </p>
      </div>
    ),
    placement: "right",
    ...commonSettings,
  },
  {
    target: "#staffingTab",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>Post jobs and hire security professionals</h2>
        <p className="fs-6 m-0">
          Use the staffing section to post your jobs, and view applicant
          profiles.
        </p>
      </div>
    ),
    placement: "right",
    ...commonSettings,
  },
  {
    target: "#cvSearchTab",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>Search from 1000s of security professionals</h2>
        <p className="fs-6 m-0">
          Use the CV Search section to connect with security professionals
          nationally
        </p>
      </div>
    ),
    placement: "right",
    ...commonSettings,
  },
  {
    target: "#chatTab",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>Chat with security professionals</h2>
        <p className="fs-6 m-0">
          You can chat with applicants and security professionals from your
          account - all your chats reside here
        </p>
      </div>
    ),
    placement: "right",
    ...commonSettings,
  },
  {
    target: "#accountSettingTab",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>Manage your account and invite your team</h2>
        <p className="fs-6 m-0">
          Make account changes and give access to your team
        </p>
      </div>
    ),
    placement: "right",
    ...commonSettings,
  },
  {
    target: "#chatWithUs",
    content: (
      <div className={`text-left ${styles.tour_content}`}>
        <h2>We're here to help</h2>
        <p className="fs-6 m-0">Chat with a member of our team using this</p>
      </div>
    ),
    placement: "bottom",
    ...commonSettings,
  },
];
export { CUSTOM_STYLES, BUTTON_TEXTS, STEPS };
