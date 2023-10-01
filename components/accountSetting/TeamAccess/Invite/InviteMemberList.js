import InviteMemberCard from "./InviteMemberCard";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Table } from "reactstrap";
import { sendInvite } from "../../../../redux/actions/teamAccessAction";
import styles from "./InviteMember.module.scss";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const InviteMemberList = (props) => {
  const {
    listTeamMembers,
    setListTeamMembers,
    editTeamMemberHandler,
    deleteTeamMemberHandler,
    setUpdateMember,
    setInviteModal,
    editTeamMember,
  } = props;
  const [inviteLoading, setInviteLoading] = useState(false);
  const submitInvite = async () => {
    setInviteLoading(true);
    if (listTeamMembers.length > 0) {
      const obj = {
        invitation: listTeamMembers.map((item) => {
          //const accessibility = item.accessibility.filter(x => x.status === true)
          const encrptedURL = {
            email: item.email_address,
            companySize: props.organisationSize,
            companyName: props.user_name,
            organisationId: props.organistaionId,
          };
          const encrypt = Buffer.from(JSON.stringify(encrptedURL)).toString(
            "base64"
          );
          return {
            email_address: item.email_address,
            accessibility: item.accessibility,
            // accessibility: accessibility.map(val => {
            //    return { menu: val.menu,
            //             access: item.access}
            // }),
            aes: encrypt,
          };
        }),
        // ,
        // organisation_id: props.organistaionId
      };
      const invite = await props.sendInvite(props.user_token, obj);
      if (invite) {
        setUpdateMember(true);

        setListTeamMembers([]);
        toast.success("Invite sent successfully!");
      }
      // else {
      //     alert('Error while sending')
      // }
    }
    setInviteLoading(false);
    setUpdateMember(false);
    setInviteModal(false);
  };
  return (
    <>
      <div className={`table-responsive ${styles.inviteModalTable}`}>
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Training</th>
              <th>Staffing</th>
              {/* <th>CV Search</th> */}
              <th>Chat</th>
              <th>Shifts</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listTeamMembers.length > 0 ? (
              listTeamMembers?.map((data, i) => {
                return (
                  <InviteMemberCard
                    data={data}
                    index={i}
                    editTeamMemberHandler={editTeamMemberHandler}
                    deleteTeamMemberHandler={deleteTeamMemberHandler}
                  />
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={`8`} className="text-center">
                    No team member added
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </div>
      <div className={`d-flex justify-content-end`}>
        <button
          disabled={
            !listTeamMembers.length > 0 ||
            inviteLoading ||
            (editTeamMember?.status && true)
          }
          className={`btn btn-md btn-green py-2 px-4 w-100 w-md-auto d-md-flex align-items-center ${styles.button}`}
          onClick={submitInvite}
        >
          <span>Submit</span>
          {inviteLoading && (
            <Spinner animation="border" size="sm" className="ml-2" />
          )}
        </button>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  organistaionId: state.vantage.organisationReducer.organistaionId,
  user_name: state.vantage.userDataReducer.user_name,
  organisationSize: state.vantage.organisationReducer.organisationSize,
});

const mapDispatchToProps = (dispatch) => ({
  sendInvite: (userToken, data) => dispatch(sendInvite(userToken, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberList);
