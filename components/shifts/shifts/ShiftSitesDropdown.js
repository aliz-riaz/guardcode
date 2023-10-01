import React, { useState, useRef, useEffect } from "react";
import useSitesList from "../../../hooks/Shifts/Sites/useSitesList";

const ALL_SITES = {
  id: "all",
  slug: "all",
  title: "All sites",
  address: "",
  address2: "",
  city: "",
  postcode: "",
  fullTitle: "All sites",
};

function ShiftSitesDropdown({
  label,
  placeholder,
  onSelection,
  showAllSitesOption,
  showAddNewSiteOption,
  onAddNewSiteSelection,
  showAddNewSiteOptionText,
  styles,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const dropdownRef = useRef(null);

  const { data, isLoading, refetch } = useSitesList();

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleSelection = (option) => {
    onSelection(option);
    setIsOpen(false);
    setSelectedOption(option.title);
  };

  const toggleOptions = () => {
    refetch();
    setIsOpen(!isOpen);
  };

  const renderOption = (option, index) => (
    <div
      className={`${styles.option}`}
      key={index}
      onClick={() =>
        handleSelection({
          ...option,
          fullTitle: `${option.title}, ${option.address}${
            option.address2 ? `, ${option.address2}` : ""
          }, ${option.city}, ${option.postcode}`,
        })
      }
    >
      <span className="fw-bold">{option.title}</span>
      {option.id !== "all" && (
        <span>
          {`, ${option.address}${
            option.address2 ? `, ${option.address2}` : ""
          }, ${option.city}, ${option.postcode}`}
        </span>
      )}
    </div>
  );

  return (
    <>
      <h5 className="fs-6">{label && label}</h5>
      <div
        className={`${styles.shift_dropdown_container} ${
          isOpen ? styles.open : ""
        } ali_don`}
        ref={dropdownRef}
      >
        <div
          className={`${styles.selected_option}`}
          onClick={() => toggleOptions()}
        >
          <span>{selectedOption}</span>
          <i>
            <img
              src={`${process.env.APP_URL}/images/arrow-down.svg`}
              alt="Arrow down"
            />
          </i>
        </div>
        {isOpen && (
          <div className={`${styles.options}`}>
            {isLoading ? (
              [
                "Construction London Site, Flat no. 11, London",
                "Construction London Site, Flat no. 11, London",
                "Construction London Site, Flat no. 11, London",
              ].map((data) => {
                return (
                  <div
                    className={`${styles.option} animated_shimmer py-0 mb-1`}
                  >
                    <span className="fw-bold">{data}</span>
                  </div>
                );
              })
            ) : (
              <>
                {showAllSitesOption && (
                  <div
                    className={`${styles.option}`}
                    onClick={() => handleSelection(ALL_SITES)}
                  >
                    <span className="fw-bold">{ALL_SITES.title}</span>
                  </div>
                )}
                {data.map(renderOption)}
              </>
            )}
            {showAddNewSiteOption && (
              // <button onClick={(e) => onAddNewRoleSelection(e)}>
              <div
                className={`${styles.addNewButton}`}
                onClick={onAddNewSiteSelection}
              >
                <img
                  src={`${process.env.APP_URL}/images/addshift-icon.svg`}
                  alt="addshift-icon"
                />
                {showAddNewSiteOptionText}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ShiftSitesDropdown;
