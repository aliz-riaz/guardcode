import React, { useState, useRef, useEffect } from "react";
import useRolesList from "../../../hooks/Shifts/Roles/useRolesList";

const ALL_ROLES = {
  id: "all",
  slug: "all",
  title: "All roles",
  address: "",
  address2: "",
  city: "",
  postcode: "",
  fullTitle: "All roles",
};

function ShiftRolesDropdown({
  placeholder,
  button,
  label,
  onSelection,
  showAllRolesOption,
  showAddNewRoleOptionText,
  showAddNewRoleOption,
  onAddNewRoleSelection,
  styles,
  isSiteSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const dropdownRef = useRef(null);

  const { data, isLoading, refetch } = useRolesList();

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
    // disable && setIsOpen(!isOpen);
    if (isSiteSelected) {
      setIsOpen(!isOpen);
    }
  };

  const renderOption = (option, index) => (
    <div
      className={`${styles.option}`}
      key={index}
      onClick={() => handleSelection(option)}
    >
      <span>{option.title}</span>
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
              ["Door Supervisor", "Door Supervisor", "Door Supervisor"].map(
                (data) => {
                  return (
                    <div
                      className={`${styles.option} animated_shimmer py-0 mb-1`}
                    >
                      <span>{data}</span>
                    </div>
                  );
                }
              )
            ) : (
              <>
                {showAllRolesOption && (
                  <div
                    className={`${styles.option}`}
                    onClick={() => handleSelection(ALL_ROLES)}
                  >
                    <span>{ALL_ROLES.title}</span>
                  </div>
                )}
                {data?.map(renderOption)}
              </>
            )}
            {showAddNewRoleOption && (
              // <button onClick={(e) => onAddNewRoleSelection(e)}>
              <span
                onClick={onAddNewRoleSelection}
                className={`${styles.addNewButton}`}
              >
                <img
                  src={`${process.env.APP_URL}/images/addshift-icon.svg`}
                  alt="addshift-icon"
                />
                {showAddNewRoleOptionText}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ShiftRolesDropdown;
