import styles from "./TabSwitcher.module.scss";

const TeamFilterSwitch = (props) => {
  return (
    <div className={`${styles.tab_switcher}`}>
      <ul>
        <li
          onClick={props.leftSideClickHandler}
          className={`${props.switchValue == props.leftText && styles.active}`}
        >
          {props.leftText}
        </li>
        <li
          onClick={props.rightSideClickHandler}
          className={`${props.switchValue == props.rightText && styles.active}`}
        >
          {props.rightText}
        </li>
      </ul>
    </div>
  );
};

export default TeamFilterSwitch;
