import { connect } from "react-redux";
import { useEffect, useState } from "react";

import usesiteList from "../../../hooks/Shifts/Sites/useSitesList";
import { setShowCreateSite } from "../../../redux/actions/shiftActions";
import SiteEmpty from "./SiteEmpty";
import SiteList from "./SiteList";
import CreateSite from "./CreateSite";
import SiteShimmer from "./SiteShimmer";

function Site(props) {
  const { data, isLoading, refetch, error } = usesiteList();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="bg-white rounded mt-4">
        <div
          className={`role_header d-flex align-items-center justify-content-between border-bottom border-light flex-wrap`}
        >
          <div className="d-flex px-3 py-3 pb-0 pb-md-3  w-100 w-md-auto ">
            <img
              src={`${process.env.APP_URL}/images/role_icon.svg`}
              width={`20px`}
              height={`20px`}
              className="flex-shrink-0"
            />
            <div className="ml-2">
              <h3 className="mb-0">Sites</h3>
              <p className="mb-0 fs-6 text-black-50">
                Edit or create a new site
              </p>
            </div>
          </div>
          <div className="px-3 pb-3 pt-0 pt-md-3 w-100 w-md-auto">
            <button
              className="btn btn-green btn-md btn-left-icon w-100 w-md-auto"
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
        {isLoading ? (
          <div className="px-4 py-4">
            <div className="row">
              <SiteShimmer />
              <SiteShimmer />
              <SiteShimmer />
            </div>
          </div>
        ) : data && data.length > 0 ? (
          <SiteList data={data} refetch={refetch} />
        ) : (
          <SiteEmpty />
        )}
        {props.show_create_site && <CreateSite refetch={refetch} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Site);
