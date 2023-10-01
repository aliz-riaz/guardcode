import { useState } from "react";
import { connect } from "react-redux";
import InviteMemberForm from "./InviteMemberForm";
import InviteMemberList from "./InviteMemberList";
import Modal from "react-bootstrap/Modal";

import styles from "./InviteMember.module.scss";

const InviteTeamMemberModal = (props) => {
  const { inviteModal, setInviteModal, setUpdateMember } = props;
  const [listTeamMembers, setListTeamMembers] = useState([]);
  const [editTeamMember, setEditTeamMember] = useState("");

  const handleClose = () => {
    setInviteModal(false);
    setListTeamMembers([]);
    setEditTeamMember([]);
  };
  const editTeamMemberHandler = (index) => {
    const data = listTeamMembers[index];
    setEditTeamMember({
      index: index,
      status: true,
      data,
    });
    let array = [...listTeamMembers];
    array.splice(index, 1);
    setListTeamMembers(array);
  };

  const deleteTeamMemberHandler = (index) => {
    let array = [...listTeamMembers];
    array.splice(index, 1);
    setListTeamMembers(array);
  };

  return (
    <>
      <Modal show={inviteModal} size="lg" centered={true}>
        <div className={`${styles.inviteTeamModal}`}>
          <Modal.Header className={`p-4`}>
            <Modal.Title>
              <h2 className={`m-0`}>Invite Team Members</h2>
            </Modal.Title>
            <button className={`${styles.closeBtn}`} onClick={handleClose}>
              {" "}
              <img src={`${process.env.APP_URL}/images/cancel.svg`} />
            </button>
          </Modal.Header>
          <Modal.Body className={`p-4`}>
            <InviteMemberForm
              listTeamMembers={listTeamMembers}
              setListTeamMembers={setListTeamMembers}
              editTeamMember={editTeamMember}
              setEditTeamMember={setEditTeamMember}
            />
            <InviteMemberList
              listTeamMembers={listTeamMembers}
              setListTeamMembers={setListTeamMembers}
              editTeamMemberHandler={editTeamMemberHandler}
              deleteTeamMemberHandler={deleteTeamMemberHandler}
              setUpdateMember={setUpdateMember}
              setInviteModal={setInviteModal}
              editTeamMember={editTeamMember}
            />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default InviteTeamMemberModal;
