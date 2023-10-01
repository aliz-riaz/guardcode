import { Col, Row, Table } from "reactstrap";
import { toast } from "react-toastify";
import TeamAccessCard from "./TeamAccessCard";
import { Spinner } from "react-bootstrap";
import InviteTeamMemberModal from "../TeamAccess/Invite/InviteTeamMemberModal";
import styles from "./TeamAccess.module.scss";
import { useState } from "react";
import EditMemberModal from "./EditMemberModal";
import DeleteMemberModal from "./DeleteMemberModal";
import {
  deleteMember,
  resendInvite,
} from "../../../redux/actions/teamAccessAction";
import { connect } from "react-redux";

const TeamAccessList = (props) => {
  const { memberList, setUpdateMember, loading } = props;
  const [inviteModal, setInviteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberId, setMemberId] = useState({});
  const [singleMember, setSingleMember] = useState({});

  const editTeamMemberHandler = (index) => {
    setEditModal(true);
    const obj = structuredClone(memberList.data[index]);
    setSingleMember(obj);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setSingleMember({});
  };
  const openDeleteMemberModal = (id, name) => {
    setDeleteModal(true);
    setMemberId({ id: id, name: name });
  };
  const deleteMemberHandler = () => {
    if (props.deleteMember(props.user_token, memberId.id)) {
      setDeleteModal(false);
      setMemberId({});
      setUpdateMember(true);
    }
  };
  const reinviteHandler = async (id) => {
    if (await props.resendInvite(props.user_token, id)) {
      toast.success("Team member reinvite successfull");
    }
  };
  return (
    <>
      {/* <Row className="row align-items-center mt-4 mb-3">
                <Col className="col-md-6">
                    <h2 className={`fs-2 fw-bold m-0`}>Team Access</h2>
                </Col>
                <Col className="col-md-6 text-right">
                    <button className="btn btn-md btn-green py-2 w-100 w-md-auto" onClick={() => setInviteModal(true)}>
                        <span className="">Invite Team Member</span>
                    </button>
                </Col>
            </Row> */}

      <div className="table-card box-shadow">
        <div className="table-wrap">
          <div className={`table-responsive ${styles.teamAccessTable}`}>
            <Table>
              <thead>
                <tr>
                  <th className="name">Name</th>
                  <th className="email">Email</th>
                  <th className="ref">Training</th>
                  <th className="course">Staffing</th>
                  <th className="date">Chat</th>
                  <th className="date">Shifts</th>
                  {/* <th className="location">
                                        Quote Requests
                                    </th> */}
                  {/* <th className="location">
                                        Access
                                    </th> */}
                  <th className="location">Action</th>
                </tr>
              </thead>
              <tbody>
                {memberList.data.length > 0 &&
                  memberList.data.map((data, i) => {
                    return (
                      <TeamAccessCard
                        data={data}
                        index={i}
                        editTeamMemberHandler={editTeamMemberHandler}
                        openDeleteMemberModal={openDeleteMemberModal}
                        reinviteHandler={reinviteHandler}
                      />
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {editModal && (
        <EditMemberModal
          editModal={editModal}
          setEditModal={setEditModal}
          singleMember={singleMember}
          setUpdateMember={setUpdateMember}
          closeEditModal={closeEditModal}
        />
      )}

      {/* <InviteTeamMemberModal
                inviteModal={inviteModal}
                setInviteModal={setInviteModal}
                setUpdateMember={setUpdateMember}
            /> */}
      <DeleteMemberModal
        deleteModal={deleteModal}
        member={memberId}
        deleteMemberHandler={deleteMemberHandler}
        setDeleteModal={setDeleteModal}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  deleteMember: (userToken, id) => dispatch(deleteMember(userToken, id)),
  resendInvite: (userToken, id) => dispatch(resendInvite(userToken, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamAccessList);
