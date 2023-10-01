import React, { useEffect } from "react";
import { connect } from "react-redux";
// reactstrap components
import { Spinner } from "reactstrap";
import AllQuotesCard from "./AllQuotesCard";
import { fetchAllQuotation } from "../../../redux/actions/quotesActions";
import EmptyAllQuotes from "./EmptyAllQuotes";
import PaginationQuotes from "./PaginationQuotesAllQuotes";

function AllQuotes(props) {
  useEffect(() => {
    props.fetchAllQuotation({ userToken: props.user_token, fetchType: 0 });
  }, []);

  return (
    <>
      {props.allQuotesApiLoading === false ? (
        props.allQuotes && Object.keys(props.allQuotes).length > 0 ? (
          props.allQuotes.map(
            (quoteList) =>
              quoteList.questions && (
                <AllQuotesCard
                  key={quoteList.id}
                  email={quoteList.email_address}
                  isExpired={quoteList.is_expired}
                  mobileNumber={quoteList.mobile_number}
                  id={quoteList.id}
                  companyName={quoteList.company_name}
                  expiredAt={quoteList.expired_at}
                  questionAnswers={quoteList.questions}
                  createdAt={quoteList.created_at}
                  location={quoteList.location}
                  name={quoteList.name}
                  isViewed={quoteList.is_viewed}
                  isDisabled={quoteList.is_disabled}
                  currentTime={quoteList.time}
                />
              )
          )
        ) : (
          <EmptyAllQuotes />
        )
      ) : (
        <div className="text-center py-5">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      {props.totalNoOfPages > 1 && Object.keys(props.allQuotes).length > 0 && (
        <PaginationQuotes />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  allQuotes: state.vantage.quotesReducer.allQuotes,
  allQuotesApiLoading: state.vantage.quotesReducer.allQuotesApiLoading,
  totalNoOfPages: state.vantage.quotesReducer.totalNoOfPages,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllQuotation: (token) => dispatch(fetchAllQuotation(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllQuotes);
