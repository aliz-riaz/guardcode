import { connect } from "react-redux";
import { setShowCreateRole } from "../../../redux/actions/shiftActions";
function RoleEmpty(props) {
  return (
    <>
      <div
        className={`role_empty d-flex align-items-center justify-content-center h-100`}
      >
        <div className="text-center py-5">
          <img src={`${process.env.APP_URL}/images/role_empty_img.svg`} />
          <p className="my-3 text-black-50">
            You haven’t created any role please add new role!
          </p>
          <button
            className="btn btn-green btn-md btn-left-icon"
            onClick={() => props.setShowCreateRole(true)}
          >
            <i>
              <img
                src={`${process.env.APP_URL}/images/plus.svg`}
                width={`16px`}
                className=""
              />
            </i>
            <span>ADD NEW ROLE</span>
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  show_create_role: state.vantage.shiftReducer.showCreateRole,
});
const mapDispatchToProps = (dispatch) => ({
  setShowCreateRole: (show) => dispatch(setShowCreateRole(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleEmpty);
