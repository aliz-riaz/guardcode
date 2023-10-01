import TeamAccessFilterTeamMember from "./TeamAccessFilterTeamMember";
import TeamFilterSwitch from "./TeamFilterSwitch";

const TeamAccessFilters = (props) => {
  return (
    <div className="d-flex align-items-center flex-wrap justify-content-between flex-fill">
      <TeamFilterSwitch
        leftSideClickHandler={props.leftSideClickHandler}
        leftText={props.leftText}
        rightSideClickHandler={props.rightSideClickHandler}
        rightText={props.rightText}
        customClasses={props.customClassesForSwitch}
        switchValue={props.switchValue}
      />
      {props.switchValue == props.rightText && (
        <TeamAccessFilterTeamMember
          seletedTeamMembers={props.seletedTeamMembers}
          setSeletedTeamMembers={props.setSeletedTeamMembers}
          customClasses={props.customClassesForSearch}
        />
      )}
    </div>
  );
};

export default TeamAccessFilters;
