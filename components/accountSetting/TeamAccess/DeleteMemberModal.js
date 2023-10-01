import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import styles from "./DeleteMemberModal.module.scss";

const DeleteMemberModal = (props) => {
  const {
    deleteModal,
    setDeleteModal,
    closeDeleteModal,
    deleteMemberHandler,
    member,
  } = props;

  return (
    <Modal show={deleteModal} size="lg" centered={true}>
      <div className={`${styles.deleteTeamModal}`}>
        <Modal.Header className={`p-4`}>
          <Modal.Title>
            <h2 className={`m-0`}>Delete Confirmation</h2>
          </Modal.Title>
          <button
            className={`${styles.closeBtn}`}
            onClick={() => setDeleteModal(false)}
          >
            {" "}
            <img src={`${process.env.APP_URL}/images/cancel.svg`} />
          </button>
        </Modal.Header>
        <Modal.Body className={`p-4`}>
          <div className={`${styles.deleteModalBody}`}>
            <p>
              <strong>
                {props.decision_maker_first_name}{" "}
                {props.decision_maker_last_name}
              </strong>{" "}
              will lose relationship with the <strong>{props.user_name}</strong>
              .
            </p>
            <p>
              Are you sure want to delete this team member permanently from your
              organisation?
            </p>
          </div>
          <div className={`${styles.modalFooter}`}>
            <button
              type="submit"
              className={`btn btn-sm btn-secondary py-2 px-4 w-100 w-md-auto ${styles.button}`}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-sm btn-danger py-2 px-4 w-100 w-md-auto ${styles.danger}`}
              onClick={deleteMemberHandler}
            >
              Yes, Delete it
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user_name: state.vantage.userDataReducer.user_name,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMemberModal);
