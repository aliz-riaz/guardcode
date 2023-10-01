import { socket } from "../../../lib/SocketProvider";
import ChannelListCard from "./OrganisationChannelListCard";
import { Spinner } from "reactstrap";
import ChannelListHeader from "./OrganisationChannelListHeader";
import styles from "./OrganisationChannelList.module.scss";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
const OrganisationChannelList = (props) => {
  if (!props.channelList && !socket.connected)
    return <Spinner size={"lg"} color={"dark"} />;

  return (
    <div
      className={`col-12 col-md-5 left ${styles.channel_list_main} ${
        isMobile && props.showChannel ? "d-none" : ""
      }`}
    >
      <div className={`bg-white ${styles.channel_list}`}>
        <ChannelListHeader
          searchField={props.searchField}
          setSearchField={props.setSearchField}
        />
        <div
          id="scrollableDivChannel"
          ref={props.channelDivRef}
          className={`${styles.ChannelListCard_wrap} ${
            props.userMenusAccess.find(
              (element) =>
                element.title == "Chat" && element.access_level == "FULL"
            ) && props.organisationMembers?.length > 0
              ? styles.with_filters
              : ""
          } ${
            props.organisationFilters.chat.switchValue === "My Conversations"
              ? styles.with_allChat
              : ""
          }`}
        >
          <InfiniteScroll
            dataLength={props.channelList.length}
            next={props.fetchMoreChannels}
            hasMore={props.hasMore}
            loader={
              props.channelList.length > 0 &&
              props.searchField == "" && (
                <div className="text-center mt-1">
                  <Spinner animation="border" size="sm" role="status"></Spinner>
                </div>
              )
            }
            scrollableTarget="scrollableDivChannel"
          >
            {props.channelList &&
              props.channelList?.map((data, indx) => {
                return (
                  <ChannelListCard
                    channelList={props.channelList}
                    setChannelList={props.setChannelList}
                    currentIndex={indx}
                    data={data}
                    key={indx}
                  />
                );
              })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showChannel: state.vantage.chatReducer.showChannel,
  organisationIsFullAccess: state.vantage.organisationReducer.isFullAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationChannelList);
