import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./OrganisationChanneListHeader.module.scss";
import _ from "lodash";

const OrganisationChannelListHeader = (props) => {
  const [dropdownOpen, setDropdownOpenn] = useState(false);

  const searchRef = useRef();

  {
    /* detail btn for future use */
  }
  // const toggle =  () => {
  //     setDropdownOpenn(!dropdownOpen)
  // }

  useEffect(() => {
    searchRef.current.value = props.searchField;
  }, [props.searchField]);

  const setSearch = useCallback((e) =>
    props.setSearchField(e.target.value.trim())
  );

  const removeSearchText = () => {
    props.setSearchField("");
    searchRef.current.value = "";
    searchRef.current.focus();
  };

  return (
    <div className={`${styles.channel_list_header} d-flex align-items-center`}>
      <div className="fs-6 fw-bold">Chat</div>
      <div
        className={`${styles.search} ml-auto ${
          props.searchField != "" ? styles.focus_in : "focus-out"
        }`}
      >
        <input
          type={"text"}
          ref={searchRef}
          onChange={_.debounce(setSearch, 300)}
        />
        {props.searchField != "" ? (
          <div className={`${styles.remove}`} onClick={removeSearchText}>
            <img
              src={process.env.APP_URL + "/images/cancel.svg"}
              width="10px"
            />
          </div>
        ) : null}
        <img
          src={process.env.APP_URL + "/images/zoom.png"}
          width="22px"
          className={`${styles.search_icon}`}
        />
      </div>
      {/* detail btn for future use */}
      {/* <div className={`${styles.dropdown_list}`}>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className={`${styles.dropdownBtn}`}>
                    <DropdownToggle className='bg-trasnparent border-0 px-0'>
                        <img src={process.env.APP_URL+'/images/more-vertical.svg'} />
                    </DropdownToggle>
                    <DropdownMenu className={`py-0 px-3 ${styles.dropdown_menu}`}>
                      <ul className='list-unstyled mb-0'>
                        <li className="cursor-pointer d-flex align-items-center my-2">
                          //<i>
                            //<img src={`${process.env.APP_URL}/images/chat.svg`} width={'18'} height={'19'} />
                          //</i> 
                          <span className="pl-2">Chat</span>
                        </li>
                        
                        
                      </ul>
                    </DropdownMenu>
                </ButtonDropdown>
            </div> */}
    </div>
  );
};

export default OrganisationChannelListHeader;
