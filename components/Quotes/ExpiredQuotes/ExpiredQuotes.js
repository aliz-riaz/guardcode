import React, { useEffect } from "react";
import { connect } from "react-redux";
import ExpiredQuotesCard from "./ExpiredQuotesCard";
import EmptyExpiredQuotes from "./EmptyExpiredQuotes";
import { fetchAllQuotation } from "../../../redux/actions/quotesActions";
import { Spinner } from "reactstrap";
import PaginationQuotes from "./PaginationExpiredQuotes";

function ExpiredQuotes(props) {
  useEffect(() => {
    props.fetchAllQuotation({ userToken: props.user_token, fetchType: 1 });
  }, []);

  return (
    <>
      {props.expiedApiLoading === false ? (
        props.expiredQuotes && Object.keys(props.expiredQuotes).length > 0 ? (
          props.expiredQuotes.map(
            (quoteList) =>
              quoteList.questions && (
                <ExpiredQuotesCard
                  key={quoteList.id}
                  email={quoteList.email_address}
                  isExpired={quoteList.is_expired}
                  mobileNumber={quoteList.mobile_number}
                  id={quoteList.id}
                  companyName={quoteList.company_name}
                  expiredAt={quoteList.expired_at}
                  questionAnswers={quoteList.questions}
                  isDisabled={quoteList.is_disabled}
                  name={quoteList.name}
                />
              )
          )
        ) : (
          <EmptyExpiredQuotes />
        )
      ) : (
        <div className="text-center py-5">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      {props.totalNoOfPages > 1 &&
        Object.keys(props.expiredQuotes).length > 0 && <PaginationQuotes />}
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  expiredQuotes: state.vantage.quotesReducer.expiredQuotes,
  expiedApiLoading: state.vantage.quotesReducer.expiedApiLoading,
  currentPage: state.vantage.quotesReducer.currentPage,
  totalNoOfPages: state.vantage.quotesReducer.totalNoOfPages,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  fetchAllQuotation: (token) => dispatch(fetchAllQuotation(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredQuotes);
