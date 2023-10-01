import styles from "./OrganisationChannelListCard.module.scss";
import { isMobile } from "react-device-detect";

const OrganisationChannelListCardShimmer = (props) => {
  return (
    <div className={`cursor-pointer ${styles.channel_card}`}>
      <div className={`${styles.channel_card_inner}`}>
        <div className="d-flex justify-content-between">
          <span className={`${styles.job_name} animated_shimmer mb-0`}>
            Chatting with
          </span>
          <span
            className={`ml-auto ${styles.time} fw-normal animated_shimmer mb-0`}
          >
            00:00
          </span>
        </div>
        <div className={`d-flex ${styles.channel_card_row}`}>
          <div
            className={`flex-shrink-0 ${styles.card_img} animated_shimmer mb-0 rounded-circle`}
          >
            <img
              src={`${process.env.APP_URL}/images/defaultAvatar.png`}
              width="50"
              height="60"
              className="img-fluid"
            />
          </div>
          <div className={`flex-grow-1 ${styles.card_cont}`}>
            <h4 className={`mb-0 d-md-flex d-block animated_shimmer mb-0`}>
              <span>user name</span>
              <span className={`${styles.user_tag}`}>chatted with user</span>
            </h4>
            <p className={`${styles.latest_message} animated_shimmer mb-0`}>
              lorem ipsum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationChannelListCardShimmer;
