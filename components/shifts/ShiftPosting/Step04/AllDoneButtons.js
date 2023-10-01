import React from "react";
import style from "./AllDone.module.scss";
function AllDoneButtons(props) {
  //button taking post shift and go to shift list button as prop showing on All done page 
  return (
    <button className={`${props.styleClass}`} onClick={props.handleClick}>
      {props.btnText}
    </button>
  );
}

export default AllDoneButtons;
