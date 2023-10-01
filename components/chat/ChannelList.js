import { socket } from "../../lib/SocketProvider";
import ChannelListCard from "./ChannelListCard";
import { Spinner } from "reactstrap";
import ChannelListHeader from "./ChannelListHeader";
import styles from "./ChannelList.module.scss";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";

const ChannelList = (props) => {
  if (!props.channelList && !socket.connected)
    return <Spinner size={"lg"} color={"dark"} />;

  return (
    <div
      className={`col-12 col-md-5 left ${styles.channel_list_main} ${
        isMobile && props.show_channel_and_hide_channel_list_on_mobile
          ? "d-none"
          : ""
      }`}
    >
      <div className={`bg-white ${styles.channel_list}`}>
        <ChannelListHeader
          searchField={props.searchField}
          setSearchField={props.setSearchField}
        />
        <div
          className={`${styles.ChannelListCard_wrap} ${styles.with_filters}`}
        >
          {props.channelList &&
            props.channelList?.map((data, indx) => {
              return <ChannelListCard data={data} key={indx} />;
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show_channel_and_hide_channel_list_on_mobile:
    state.vantage.chatReducer.showChannelAndHideChannelListOnMobile,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
