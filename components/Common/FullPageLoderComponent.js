import React from "react";
import { Spinner } from "reactstrap";

function FullPageLoderComponent(props) {
  return (
    <>
      <div
        className="100-vh d-flex align-items-center justify-content-center pl-3 pr-3"
        style={{ height: "100vh" }}
      >
        <div>
          <img
            src={process.env.APP_URL + "/images/Logo-toga.gif"}
            className="FullPageLoder"
            alt="Loader"
          />
        </div>
      </div>
    </>
  );
}

export default FullPageLoderComponent;
