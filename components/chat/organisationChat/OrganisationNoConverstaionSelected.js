import styles from "./OrganisationNoConverstaionSelected.module.scss";

const OrganisationNoConverstaionSelected = (props) => {
  return (
    <div
      className={`text-center ${styles.noConversation} ${
        props.organisationIsFullAccess === true ? styles.with_filters : ""
      } d-none d-md-flex`}
    >
      <div className="text-center">
        <img src={process.env.APP_URL + "/images/no-comments.svg"} />
        <h4 className="fs-4 text-black-50 pt-4">No conversation selected</h4>
        <p className="text-black-50 fs-6 mb-1">
          Please choose a conversation from the panel{" "}
          <br className="d-none d-md-block" /> on left to continue
        </p>
        <p className="text-black-50 fs-6 d-flex align-items-center">
          <img
            src={process.env.APP_URL + "/images/info-outline.svg"}
            className="mr-1"
            height={20}
            width={20}
          />
          Inactive chat history is maintained for 90 days
        </p>
      </div>
    </div>
  );
};

export default OrganisationNoConverstaionSelected;
