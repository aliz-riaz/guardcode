import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { connect } from "react-redux";

const TeamAccessFilterTeamMember = (props) => {
  return (
    <div className={`multiselect-wrap mr-0 mr-md-2 mr-lg-3`}>
      <Multiselect
        className={`select-box`}
        options={props.organisationMembers.map((member) => ({
          id: member.id,
          name: `${member.firstName} ${member.lastName}`,
        }))}
        selectedValues={props.seletedTeamMembers}
        selectionLimit={2}
        hidePlaceholder={true}
        onSelect={(e) => props.setSeletedTeamMembers(e)}
        onRemove={(e) => props.setSeletedTeamMembers(e)}
        displayValue="name"
        showArrow={true}
        customArrow={""}
        placeholder={"Search by team member"}
        emptyRecordMsg={null}
        avoidHighlightFirstOption={true}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAccessFilterTeamMember);
