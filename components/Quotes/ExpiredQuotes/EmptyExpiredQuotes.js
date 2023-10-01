import React from "react";

function EmptyExpiredQuotes(props) {
  return (
    <div className="empty-request">
      <div className="text-center">
        <img
          src={process.env.APP_URL + "/images/empty-expired.svg"}
          className="img-fluid"
          alt="Empty Request Quotes"
        />
        <h2 className="fs-2 fw-medium mt-3">
          Expired quote requests from customers will be{" "}
          <br className="d-none d-md-block" /> shown here
        </h2>
      </div>
    </div>
  );
}

export default EmptyExpiredQuotes;
