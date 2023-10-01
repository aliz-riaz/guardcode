import styles from "./PendingClaimScreen.module.scss";
import { useIntercom } from "react-use-intercom";

const RejectedClaimScreen = () => {
  const { show } = useIntercom();

  const showChat = () => {
    show();
    // $crisp.push(["do", "chat:toggle"])
  };

  return (
    <div
      className={`${styles.pending_alert} ${styles.rejected} d-flex align-items-center  py-2 px-3`}
    >
      <img src={`${process.env.APP_URL}/images/o-warning-white.svg`} />
      <span className="text-white fs-6 fw-bold pl-2">
        There is a conflict in some of your details. Please contact{" "}
        <span
          className="text-white text-decoration-line cursor-pointer"
          onClick={showChat}
        >
          help center
        </span>{" "}
        to resolve issue
      </span>
    </div>
  );
};

export default RejectedClaimScreen;
