import { connect } from "react-redux";
import { setShowCreateSite } from "../../../redux/actions/shiftActions";
function SiteEmpty(props) {
  return (
    <>
      <div
        className={`role_empty d-flex align-items-center justify-content-center h-100`}
      >
        <div className="text-center py-5">
          <img src={`${process.env.APP_URL}/images/role_empty_img.svg`} />
          <p className="my-3 text-black-50">
            You haven’t created any site please add new site!
          </p>
          <button
            className="btn btn-green btn-md btn-left-icon"
            onClick={() => props.setShowCreateSite(true)}
          >
            <i>
              <img
                src={`${process.env.APP_URL}/images/plus.svg`}
                width={`16px`}
                className=""
              />
            </i>
            <span>ADD NEW SITE</span>
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  show_create_site: state.vantage.shiftReducer.showCreateSite,
});
const mapDispatchToProps = (dispatch) => ({
  setShowCreateSite: (show) => dispatch(setShowCreateSite(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteEmpty);
