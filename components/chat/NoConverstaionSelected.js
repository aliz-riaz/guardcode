import styles from "./NoConverstaionSelected.module.scss";
const NoConverstaionSelected = () => {
  return (
    <div
      className={`text-center ${styles.noConversation} ${styles.with_filters} d-none d-md-flex`}
    >
      <div className="text-center">
        <img src={process.env.APP_URL + "/images/no-comments.svg"} />
        <h4 className="fs-4 text-black-50 pt-4">No conversation selected</h4>
        <p className="text-black-50 fs-6">
          Please choose a conversation from the panel{" "}
          <br className="d-none d-md-block" /> on left to continue
        </p>
      </div>
    </div>
  );
};

export default NoConverstaionSelected;
