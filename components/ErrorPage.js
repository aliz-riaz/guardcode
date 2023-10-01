import { connect } from "react-redux";
import { userLogoutAction } from "../redux/actions/login";
import useLogout from "../hooks/Auth/useLogout";

function ErrorPage(props) {
  const { logout } = useLogout(props);

  return (
    <>
      <div className="notfound text-center">
        <img
          src={process.env.APP_URL + "/images/errorScreenImage.svg"}
          alt=""
          className="img-fluid"
        />
        <p className="fw-bold mt-4">
          We’ve added new features! To access them, please{" "}
          <br className="d-none d-md-block" /> logout and login again.
        </p>
        <button className="btn btn-sm btn-green px-5" onClick={logout}>
          Log me out
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
