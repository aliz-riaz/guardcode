import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import ShiftsFiltersForOrganisations from "./ShiftsFiltersForOrganisations";
import ShiftsFiltersHeader from "./ShiftsFiltersHeader";
import ShiftsListView from "./ShiftsListView";
// import data from "./data";
import EmptyStateForShift from "./EmptyStateForShift";
import _ from "lodash";
// import CalendarView from "./calenderView/Calendar";
import dynamic from "next/dynamic";
const CalendarView = dynamic(() => import("./calenderView/Calendar"), {
  ssr: false,
});
const INITIAL_QUERY = {
  site_id: "all",
  role_id: "all",
  view: "List view",
  shift_type: "All shifts",
  shift_timing: "All shifts",
  site_title: "All sites",
  role_title: "All roles",
  search: "",
};
const initialFilters = {
  site_id: "all",
  role_id: "all",
  site_title: "All sites",
  role_title: "All roles",
  shift_type: "All shifts",
  view: "List view",
  shift_timing: "All shifts",
  search: "",
};

function Shifts(props) {
  const router = useRouter();
  const { query } = router;

  const initialFiltersWithQuery = {
    ...initialFilters,
    ...query,
  };
  // const [isLoading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFiltersWithQuery);
  if (
    !(
      query.hasOwnProperty("site_id") &&
      query.hasOwnProperty("role_id") &&
      query.hasOwnProperty("view") &&
      query.hasOwnProperty("shift_type") &&
      query.hasOwnProperty("shift_timing") &&
      query.hasOwnProperty("site_title") &&
      query.hasOwnProperty("role_title") &&
      query.hasOwnProperty("search")
    )
  ) {
    const updatedQuery = new URLSearchParams(INITIAL_QUERY);
    router.push(`/shifts?${updatedQuery.toString()}`);
    return null;
  }
  // const isLoading = false;
  const commonListType =
    props.organisationFilters.shifts.switchValue === "My Shifts"
      ? "self"
      : "all";

  const filterProps = {
    initialFilters: initialFilters,
    filters: filters,
    list_type: commonListType,
  };

  const isCurrentViewCalendarView = query.view == "Calendar view";

  return (
    <div className="main-inner-content">
      <ShiftsFiltersForOrganisations />
      <ShiftsFiltersHeader
        query={query}
        filters={filters}
        setFilters={setFilters}
        // isCurrentViewCalendarView={isCurrentViewCalendarView}
      />
      {/* <button onClick={() => setLoading((prev) => !prev)}>Loading</button> */}
      {/* <JSONDisplay data={filters} /> */}
      {/* {true ?  */}
      {isCurrentViewCalendarView ? (
        <CalendarView {...filterProps} />
      ) : (
        <ShiftsListView {...filterProps} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  organisationFilters: state.vantage.organisationReducer.filter,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Shifts);

const JSONDisplay = ({ data }) => {
  const renderJSON = (obj) => {
    return Object.keys(obj).map((key, index) => (
      <div key={index} className="mb-2">
        <span className="text-danger">{key}</span>:{" "}
        <span className="text-success">{obj[key]}</span>
      </div>
    ));
  };

  return <div>{renderJSON(data)}</div>;
};
