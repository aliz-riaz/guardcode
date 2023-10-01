import { useState } from "react";
import Pagination from "./Pagination";
import styles from "./ShiftsListView.module.scss";
import ShiftsListViewList from "./ShiftsListViewList";
import ShiftsListViewLoading from "./ShiftsListViewLoading";
import EmptyStateForShift from "./EmptyStateForShift";
import useShiftsList from "../../../hooks/Shifts/useShiftsList";
import _ from "lodash";
import NoRecordFound from "./NoRecordFound";
import WorkerActionSteps from "../WorkerActionSteps";
function ShiftsListView({ initialFilters, filters, list_type }) {
  const [currentPage, setCurrentActivePage] = useState(1);
  const { data, isLoading } = useShiftsList({
    ...filters,
    list_type,
    currentPage,
  });

  function handlePageChange(page) {
    setCurrentActivePage(page);
  }
  const isFilterChanged = _.isEqual(initialFilters, filters);

  return (
    <>
      {isLoading ? (
        <ShiftsListViewLoading />
      ) : data?.data?.length > 0 ? (
        <ShiftsListViewList data={data.data} />
      ) : isFilterChanged ? (
        <EmptyStateForShift />
      ) : (
        <NoRecordFound />
      )}
      {!isLoading && (
        <Pagination
          totalPages={data?.last_page}
          // totalPages={30}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <WorkerActionSteps />
    </>
  );
}

export default ShiftsListView;
