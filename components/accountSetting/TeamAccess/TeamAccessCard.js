import { useEffect, useState } from "react";
import styles from "./TeamAccess.module.scss";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const TeamAccessCard = (props) => {
  const { email_address, info, access_unserialised, status, id, invited_link } =
    props.data;
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [copyLinkStaus, setCopyLinkStaus] = useState(false);
  // const [acess, setAccess] = useState(access_unserialised.every(val => val.access == "FULL") ? "FULL" : "LIMITED");
  //const [acess, setAccess] = useState(full_access);

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };
  const copyLink = () => {
    setCopyLinkStaus(true);
    navigator.clipboard.writeText(invited_link);
    setTimeout(() => {
      setCopyLinkStaus(false);
    }, 1000);
  };

  return (
    <>
      <tr>
        {status == "ACCEPTED" ? (
          <td>{`${info.decision_maker_first_name} ${info.decision_maker_last_name}`}</td>
        ) : (
          <td style={{ textAlign: "left" }}>Pending Invite</td>
        )}
        <td>{email_address}</td>
        {access_unserialised.map((item) => {
          return (
            <>
              {item.menu == "CV Search" ? null : (
                <td>
                  <span
                    className={`${
                      item.access == "FULL"
                        ? styles.full_badge
                        : styles.limited_badge
                    }`}
                  >
                    {item.access == "FULL" ? "Full " : "Limited "}
                    Access
                  </span>
                </td>
              )}
            </>
          );
        })}
        <td>
          {
            status == "ACCEPTED" ? (
              <div className={`${styles.dropdown_list}`}>
                <ButtonDropdown
                  direction="end"
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className={`${styles.dropdownBtn}`}
                >
                  <DropdownToggle className="bg-transparent border-0 px-0">
                    <img
                      src={process.env.APP_URL + "/images/more-vertical.svg"}
                    />
                  </DropdownToggle>
                  <DropdownMenu className={`py-0 ${styles.dropdown_menu}`}>
                    <ul className="list-unstyled mb-0">
                      <li
                        className="cursor-pointer d-flex align-items-center"
                        onClick={() => props.editTeamMemberHandler(props.index)}
                      >
                        <img
                          src={`${process.env.APP_URL}/images/edit-2.svg`}
                          width={"18"}
                          height={"19"}
                        />
                        <span className="pl-2">Edit</span>
                      </li>
                      <li className="cursor-pointer d-flex align-items-center">
                        <img
                          src={`${process.env.APP_URL}/images/trash.svg`}
                          width={"18"}
                          height={"19"}
                        />
                        <span
                          className="pl-2"
                          onClick={() =>
                            props.openDeleteMemberModal(id, info.name)
                          }
                        >
                          Delete
                        </span>
                      </li>
                    </ul>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            ) : (
              <>
                <div className={`${styles.dropdown_list}`}>
                  <ButtonDropdown
                    direction="end"
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    className={`${styles.dropdownBtn}`}
                  >
                    <DropdownToggle className="bg-transparent border-0 px-0">
                      <img
                        src={process.env.APP_URL + "/images/more-vertical.svg"}
                      />
                    </DropdownToggle>
                    <DropdownMenu className={`py-0 ${styles.dropdown_menu}`}>
                      <ul className="list-unstyled mb-0">
                        <li
                          className="cursor-pointer d-flex align-items-center"
                          onClick={() => props.reinviteHandler(id)}
                        >
                          <img
                            src={`${process.env.APP_URL}/images/user_plus_icon.svg`}
                            width={"18"}
                            height={"19"}
                          />
                          <span className="pl-2">Reinvite</span>
                        </li>
                        <li className="cursor-pointer d-flex align-items-center position-relative">
                          <img
                            src={`${process.env.APP_URL}/images/copy_icon1.svg`}
                            width={"18"}
                            height={"19"}
                          />
                          <span className="pl-2" onClick={copyLink}>
                            Copy Invite
                          </span>
                          {copyLinkStaus && (
                            <span
                              className="bg-dark position-absolute text-white w-50"
                              style={{
                                top: "-10px",
                                left: 0,
                                right: 0,
                                margin: "0 auto",
                              }}
                            >
                              Copied
                            </span>
                          )}
                        </li>
                      </ul>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </>
            )
            // <p className="mb-0 fs-7 badge-warning">Pending</p>
          }
        </td>
      </tr>
    </>
  );
};

export default TeamAccessCard;
