import ChannelListHeader from "./OrganisationChannelListHeader";
import styles from "./OrganisationChannelList.module.scss";
import { isMobile } from "react-device-detect";
import OrganisationChannelListCardShimmer from "./OrganisationChannelListCardShimmer";

const OrganisationChannelListShimmer = (props) => {
  return (
    <div
      className={`col-12 col-md-5 left ${styles.channel_list_main} ${
        isMobile ? "d-none" : ""
      }`}
    >
      <div className={`bg-white ${styles.channel_list}`}>
        <div
          className={`${styles.channel_list_header} px-4 py-4 d-flex align-items-center`}
        >
          <div className="fs-6 fw-bold">Chat</div>
          <div className={`${styles.search} ml-auto`}>
            <img
              src={process.env.APP_URL + "/images/zoom.png"}
              width="22px"
              className={`${styles.search_icon}`}
            />
          </div>
        </div>
        <div className={`${styles.ChannelListCard_wrap}`}>
          {[1, 2, 3, 4, 5, 6].map((indx) => {
            return <OrganisationChannelListCardShimmer key={indx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default OrganisationChannelListShimmer;
