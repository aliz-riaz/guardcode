import styles from "./InviteMember.module.scss";
const InviteMemberCard = (props) => {
  const { email_address, accessibility, access } = props.data;
  const { editTeamMemberHandler, index, deleteTeamMemberHandler } = props;

  return (
    <>
      <tr>
        <td>{email_address}</td>
        {accessibility.map((item) => {
          return (
            <>
              {item.menu == "CV Search" ? null : (
                <td>
                  <span
                    className={`${
                      item.access ? styles.full_badge : styles.limited_badge
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
          <div className={`d-flex align-items-center justify-content-center`}>
            <button
              onClick={() => editTeamMemberHandler(index)}
              className={`mr-1`}
            >
              <img
                src={`${process.env.APP_URL}/images/edit-2.svg`}
                width={"15"}
                height={"15"}
              />
            </button>
            <button onClick={() => deleteTeamMemberHandler(index)}>
              <img
                src={`${process.env.APP_URL}/images/trash.svg`}
                width={"15"}
                height={"15"}
              />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default InviteMemberCard;
