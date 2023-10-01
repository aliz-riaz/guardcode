import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomOptionsDropdown.module.scss"; // Import your CSS file with the custom styles

function CustomOptionsDropdown({
  options,
  selectedOption,
  setSelectedOption,
  key,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.custom_select} ${isOpen ? styles.open : ""}`}
      ref={dropdownRef}
    >
      <div className={` ${styles.selected_option}`} onClick={toggleOptions}>
        <span>{selectedOption}</span>
        <i>
          <img src={process.env.APP_URL + "/images/arrow-down.svg"} />
        </i>
      </div>
      <div className={`${styles.options}`}>
        {isOpen &&
          options.map((option, index) => (
            <div
              className={`${styles.option}`}
              key={index}
              onClick={() => handleOptionClick(option, key)}
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomOptionsDropdown;
