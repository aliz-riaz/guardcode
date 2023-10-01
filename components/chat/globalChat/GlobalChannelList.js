import { socket } from "../../../lib/SocketProvider";
import styles from "./GlobalChannelList.module.scss";
import { connect } from "react-redux";
import GloablChannelListHeader from "./GlobalChannelListHeader";
import GlobalChannelListCard from "./GlobalChannelListCard";
import { setShowGlobalChatChannelList } from "../../../redux/actions/globalChatAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "reactstrap";
const ChannelList = (props) => {
  if (!props.channelList && !socket.connected)
    return <Spinner size={"lg"} color={"dark"} />;

  return (
    <div
      className={`${styles.channel_list_container} ${
        !props.show_g_channel_list && styles.minimized
      }`}
    >
      <GloablChannelListHeader
        searchField={props.searchField}
        setSearchField={props.setSearchField}
      />
      <div
        id="globalScrollableDivChannel"
        ref={props.channelDivRef}
        className={`${styles.GlobalChannelList_wrapper}`}
      >
        <InfiniteScroll
          dataLength={props.channelList.length}
          next={props.fetchMoreChannels}
          hasMore={props.hasMore}
          loader={
            props.channelList.length > 0 && (
              <div className="text-center mt-1">
                <Spinner animation="border" size="sm" role="status"></Spinner>
              </div>
            )
          }
          scrollableTarget="globalScrollableDivChannel"
        >
          {props.channelList &&
            props.channelList?.map((data, indx) => {
              return (
                <GlobalChannelListCard
                  data={data}
                  key={indx}
                  currentIndex={indx}
                  setChannelList={props.setChannelList}
                  channelList={props.channelList}
                  searchField={props.searchField}
                  setSearchField={props.setSearchField}
                />
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show_g_channel_list: state.vantage.globalChatReducer.showGlobalChannelList,
});

const mapDispatchToProps = (dispatch) => ({
  setShowGlobalChatChannelList: (status) =>
    dispatch(setShowGlobalChatChannelList(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
