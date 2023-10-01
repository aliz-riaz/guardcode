import { connect } from "react-redux";
import { useEffect, useState } from "react";
import CreateRole from "./CreateRole";
import RoleEmpty from "./RoleEmpty";
import RoleList from "./RoleList";
import useRoleList from "../../../hooks/Shifts/Roles/useRolesList";
import { setShowCreateRole } from "../../../redux/actions/shiftActions";
import { Spinner } from "react-bootstrap";
import RoleShimmer from "./RoleShimmer";

function Role(props) {
  const { data, isLoading, refetch, error } = useRoleList();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="bg-white rounded mt-4">
        <div
          className={`role_header d-flex align-items-center justify-content-between border-bottom border-light flex-wrap`}
        >
          <div className="d-flex px-3 py-3 pb-0 pb-md-3  w-100 w-md-auto">
            <img
              src={`${process.env.APP_URL}/images/role_icon.svg`}
              width={`20px`}
              height={`20px`}
              className="flex-shrink-0"
            />
            <div className="ml-2">
              <h3 className="mb-0">Roles</h3>
              <p className="mb-0 fs-6 text-black-50">
                Edit or create a new role
              </p>
            </div>
          </div>
          <div className="px-3 pb-3 pt-0 pt-md-3 w-100 w-md-auto">
            <button
              className="btn btn-green btn-md btn-left-icon w-100 w-md-auto"
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
        {isLoading ? (
          <div className="px-4 py-4">
            <div className="row">
              <RoleShimmer />
              <RoleShimmer />
              <RoleShimmer />
            </div>
          </div>
        ) : data && data.length > 0 ? (
          <RoleList data={data} refetch={refetch} />
        ) : (
          <RoleEmpty />
        )}
        <CreateRole refetch={refetch} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Role);
