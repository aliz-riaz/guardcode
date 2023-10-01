import React from "react";

function EmptyAllQuotes(props) {
  return (
    <div className="empty-request">
      <div className="text-center">
        <img
          src={process.env.APP_URL + "/images/empty-allrequest.svg"}
          className="img-fluid"
          alt="Empty Request Quotes"
        />
        <h2 className="fs-2 fw-medium mt-3">
          Quote requests from customers will be shown here
        </h2>
      </div>
    </div>
  );
}

export default EmptyAllQuotes;
