import React from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";

function IsRequestLoderComponent(props) {
  return (
    <>
      {props.is_request_loader === true ? (
        <div className="text-center">
          <Spinner
            size={props.size ? props.size : "sm"}
            color={props.color ? props.color : "dark"}
            className={props.customClass ? props.customClass : ""}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  is_request_loader: state.vantage.commonReducer.is_request_loader,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IsRequestLoderComponent);
