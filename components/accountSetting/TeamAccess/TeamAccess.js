import { connect } from "react-redux";
import { Col, Row, Table } from "reactstrap";
import EmptyState from "./EmptyState";
import TeamAccessList from "./TeamAccessList";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  fetchAllMembers,
  deleteMember,
} from "../../../redux/actions/teamAccessAction";
import PaginationForTeamAccess from "./PaginationForTeamAccess";
import InviteTeamMemberModal from "../TeamAccess/Invite/InviteTeamMemberModal";

const TeamAccess = (props) => {
  const [memberList, setMemberList] = useState([]);
  const [updateMember, setUpdateMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [emptyData, setEmptyData] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalNoOfPages, setTotalNoOfPages] = useState(1);
  const [totalNoRecords, setTotalNoRecords] = useState(null);

  useEffect(async () => {
    setLoading(true);
    updateMember && setCurrentPage(1);
    const member = await props.fetchAllMembers(props.user_token, currentPage);
    setMemberList(member);
    setTotalNoOfPages(member.last_page);
    setTotalNoRecords(member.total);
    setLoading(false);
    setUpdateMember(false);
    setEmptyData(member.data?.length > 0 ? false : true);
  }, [updateMember, currentPage]);

  // if(loading) {
  //     return <div className={` d-flex align-items-center justify-content-center`}>
  //       <Spinner animation="border" size="lg" role="status"> </Spinner>
  //     </div>
  //   }
  return (
    <>
      <div className="main-inner-content">
        {!emptyData && (
          <Row className="row align-items-center mt-4 mb-3">
            <Col className="col-md-6 col-12">
              <h2 className={`fs-2 fw-bold m-0`}>Team Access</h2>
            </Col>
            <Col className="col-md-6 text-right col-12">
              <button
                disabled={props.isOrganisationApproved == 0 ? true : false}
                className={`btn btn-md ${
                  props.isOrganisationApproved == 0 ? "btn-gray" : "btn-green"
                } py-2 w-100 w-md-auto mt-2 mt-md-0`}
                onClick={() => setInviteModal(true)}
              >
                <span className="">Invite Team Member</span>
              </button>
            </Col>
          </Row>
        )}
        {loading ? (
          <>
            <div
              className={` d-flex align-items-center justify-content-center`}
            >
              <Spinner animation="border" size="lg" role="status">
                {" "}
              </Spinner>
            </div>
          </>
        ) : memberList?.data?.length > 0 ? (
          <TeamAccessList
            memberList={memberList}
            setUpdateMember={setUpdateMember}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <EmptyState setUpdateMember={setUpdateMember} />
        )}
        <InviteTeamMemberModal
          inviteModal={inviteModal}
          setInviteModal={setInviteModal}
          setUpdateMember={setUpdateMember}
        />
        <PaginationForTeamAccess
          totalNoOfPages={totalNoOfPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllMembers: (userToken, currentPage) =>
    dispatch(fetchAllMembers(userToken, currentPage)),
  deleteMember: (userToken, id) => dispatch(deleteMember(userToken, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamAccess);
