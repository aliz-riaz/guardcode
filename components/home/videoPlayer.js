import ReactPlayer from "react-player";
import { employerVideos } from "../../redux/actions/main";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "./Video.module.scss";

const VideoPlayer = (props) => {
  const [employerVideo, setEmployerVideo] = useState([]);
  const [playingVideoId, setplayingVideoId] = useState(0);

  useEffect(async () => {
    const videosData = await props.employerVideos();
    setEmployerVideo(videosData);
  }, []);

  return (
    <div className={`${styles.videos_container} d-none d-lg-block`}>
      <div className={`${styles.video_row}`}>
        {employerVideo?.map((data, i) => {
          return (
            <>
              <div className={`${styles.video_wrap}`} key={data.id}>
                <ReactPlayer
                  url={data.link}
                  className={`${styles.react_player}`}
                  width="100%"
                  height="100%"
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                  onPlay={() => setplayingVideoId(data.id)}
                  playing={playingVideoId === data.id ? true : false}
                  playIcon={
                    <button onClick={() => setplayingVideoId(data.id)}>
                      <img src={process.env.APP_URL + "/images/play-btn.svg"} />
                    </button>
                  }
                  light={data.thumbnail_url}
                  controls={true}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  employerVideos: () => dispatch(employerVideos()),
});

const memoized = React.memo(VideoPlayer);

export default connect(mapStateToProps, mapDispatchToProps)(memoized);
