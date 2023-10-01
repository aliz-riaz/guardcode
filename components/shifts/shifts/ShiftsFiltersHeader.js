import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import styles from "./ShiftsFiltersHeader.module.scss";
import CustomOptionsDropdown from "./CustomOptionsDropdown";
import SearchComponent from "./SearchComponent";
import useSitesList from "../../../hooks/Shifts/Sites/useSitesList";
import ShiftSitesDropdown from "./ShiftSitesDropdown";
import ShiftSitesDropdownStyles from "./ShiftSitesDropdown.module.scss";
import ShiftRolesDropdown from "./ShiftRolesDropdown";

const options = {
  shift_type: ["All shifts", "Vacant shifts"],
  view: ["List view", "Calendar view"],
  shift_timing: ["All shifts", "Upcoming shifts", "Past shifts"],
};

function ShiftsFiltersHeader({ query, filters, setFilters }) {
  const router = useRouter();

  const [showFilterBtnOnMobile, setShowFilterBtnOnMobile] = useState(!isMobile);

  const handleOptionChange = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };
    if (key === "site_id") {
      updatedFilters.site_id = value.slug;
      updatedFilters.site_title = value.fullTitle;
    } else if (key === "role_id") {
      updatedFilters.role_id = value.slug;
      updatedFilters.role_title = value.title;
    }
    const updatedQuery = new URLSearchParams(updatedFilters);
    setFilters(updatedFilters);
    if (key === "search" && value.length <= 3) {
      return;
    }
    router.push(`/shifts?${updatedQuery.toString()}`);
  };

  const filterClickHandler = (e) => {
    e.preventDefault();
    setShowFilterBtnOnMobile((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <button
          className={`btn btn-md btn-green btn-left-icon w-100 booking-button mb-2`}
          onClick={filterClickHandler}
        >
          Filters
        </button>
      )}
      {showFilterBtnOnMobile && (
        <div className={`bg-white ${styles.filters_container}`}>
          <div className={styles.right_side}>
            <ShiftSitesDropdown
              placeholder={filters.site_title}
              onSelection={(e) => handleOptionChange("site_id", e)}
              showAllSitesOption
              styles={ShiftSitesDropdownStyles}
            />
            <ShiftRolesDropdown
              placeholder={filters.role_title}
              onSelection={(e) => handleOptionChange("role_id", e)}
              showAllRolesOption
              styles={ShiftSitesDropdownStyles}
              isSiteSelected={true}
            />
            {Object.keys(options).map((key) => (
              <CustomOptionsDropdown
                key={key}
                options={options[key]}
                selectedOption={filters[key]}
                setSelectedOption={(value) => handleOptionChange(key, value)}
              />
            ))}
          </div>
          <SearchComponent
            value={filters.search}
            onChange={(e) => handleOptionChange("search", e.target.value)}
          />
        </div>
      )}
    </>
  );
}

export default ShiftsFiltersHeader;
