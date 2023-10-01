import ReactPaginate from "react-paginate";
import styles from "./PaginationQuotesAllQuotes.module.scss";
import { paginationQuote } from "../../../redux/actions/quotesActions";
import { connect } from "react-redux";
import { useState } from "react";

function PaginationQuotes(props) {
  const [firstTimeRender, setFirstTimeRender] = useState(true);

  const handlePageClick = (event) => {
    firstTimeRender === false &&
      props.paginationQuote({
        userToken: props.user_token,
        pageNumber: event.selected + 1,
        fetchType: "allQuotes",
        isExpire: 0,
      });
    setFirstTimeRender(false);
  };

  if (props.totalNoOfPages <= 1) {
    return null;
  }

  return (
    <div className={`m-0 p-0 ${styles.pagination}`}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={props.totalNoOfPages}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        initialPage={0}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  totalNoOfPages: state.vantage.quotesReducer.totalNoOfPages,
  currentPage: state.vantage.quotesReducer.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  paginationQuote: (nextPage) => dispatch(paginationQuote(nextPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationQuotes);
