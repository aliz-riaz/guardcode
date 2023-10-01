import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

function Pagination(props) {
  const [checkMobile, SetCheckMobile] = useState();
  const customStyle = props.customStyle;

  useEffect(() => {
    if (isMobile) {
      SetCheckMobile(true);
    } else {
      SetCheckMobile(false);
    }
  }, []);

  const onPaginationClick = (e, pageLink, status) => {
    e.preventDefault();
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
                    onClick={(e) =>
                      onPaginationClick(e, pagination.label, pagination.url)
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
                    onClick={(e) =>
                      onPaginationClick(e, pagination.label, pagination.url)
                    }
                    dangerouslySetInnerHTML={{ __html: `${paginate_temp}` }}
                  ></a>
                </li>
              );
            }
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
                className={
                  "page-item " +
                  (pagination.active ? "active " : "") +
                  `${!pagination.url ? "disabled" : null}`
                }
                key={key}
                active={pagination.active}
              >
                <a
                  className="page-link"
                  disabled={!pagination.url}
                  onClick={(e) =>
                    onPaginationClick(e, pagination.label, pagination.url)
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
      <ul className={`pagination p-0 mt-3 ${customStyle.pagination}`}>
        {PaginationLinksList()}
      </ul>
    </>
  );
}

export default Pagination;
