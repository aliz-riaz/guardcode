import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { isMobile } from "react-device-detect";

function PaginationComponent(props) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [checkMobile, SetCheckMobile] = useState();

  useEffect(() => {
    if (isMobile) {
      SetCheckMobile(true);
    } else {
      SetCheckMobile(false);
    }
  }, []);

  const onPaginationClick = (pageLink, status) => {
    if (status) {
      if (pageLink.includes("Previous")) {
        props.setCurrentpage(parseInt(props.currentpage) - 1);
      } else if (pageLink.includes("Next")) {
        props.setCurrentpage(parseInt(props.currentpage) + 1);
      } else if (pageLink.includes("previous")) {
        props.setCurrentpage(parseInt(props.currentpage) - 1);
      } else if (pageLink.includes("next")) {
        props.setCurrentpage(parseInt(props.currentpage) + 1);
      } else {
        props.setCurrentpage(pageLink);
      }
    }
  };

  const PaginationLinksList = () => {
    let PaginationLinks = [];
    if (props.contentDataLinks) {
      if (props.contentDataLinks.length > 0) {
        if (checkMobile) {
          PaginationLinks = props.contentDataLinks.map((pagination, key) => {
            let paginate_temp = pagination.label;
            if (paginate_temp == "&laquo; Previous") {
              paginate_temp = "« Previous";
              return (
                <li
                  className={
                    pagination.url ? "page-item active" : "page-item disabled"
                  }
                  key={key}
                  active={pagination.active}
                >
                  <a
                    className="page-link"
                    onClick={() =>
                      onPaginationClick(pagination.label, pagination.url)
                    }
                    dangerouslySetInnerHTML={{ __html: `${paginate_temp}` }}
                  ></a>
                </li>
              );
            } else if (paginate_temp == "Next &raquo;") {
              paginate_temp = "Next »";
              return (
                <li
                  className={
                    pagination.url
                      ? "page-item active ml-2"
                      : "page-item ml-2 disabled"
                  }
                  key={key}
                  active={pagination.active}
                >
                  <a
                    className="page-link"
                    onClick={() =>
                      onPaginationClick(pagination.label, pagination.url)
                    }
                    dangerouslySetInnerHTML={{ __html: `${paginate_temp}` }}
                  ></a>
                </li>
              );
            }
            // return (
            //   <li className={'page-item ' + (pagination.active ? 'active':'')} key={key}  active={pagination.active}>
            //     <a className="page-link" disabled={!pagination.url} onClick={() => onPaginationClick(pagination.label, pagination.url)} dangerouslySetInnerHTML={{__html: `${paginate_temp}`}}></a>
            //   </li>
            // );
          });
        } else {
          PaginationLinks = props.contentDataLinks.map((pagination, key) => {
            let paginate_temp = pagination.label;
            if (paginate_temp == "&laquo; Previous") {
              paginate_temp = "« Previous";
            } else if (paginate_temp == "Next &raquo;") {
              paginate_temp = "Next »";
            }
            return (
              <li
                className={"page-item " + (pagination.active ? "active" : "")}
                key={key}
                active={pagination.active}
              >
                <a
                  className="page-link"
                  disabled={!pagination.url}
                  onClick={() =>
                    onPaginationClick(pagination.label, pagination.url)
                  }
                  dangerouslySetInnerHTML={{ __html: `${paginate_temp}` }}
                ></a>
              </li>
            );
          });
        }

        return <>{PaginationLinks}</>;
      }
    }
  };

  return (
    <>
      <ul className="pagination">{PaginationLinksList()}</ul>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationComponent);
