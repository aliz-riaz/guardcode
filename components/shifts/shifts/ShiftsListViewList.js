import ShiftsListViewCard from "./ShiftsListViewCard";
import styles from "./ShiftsListViewList.module.scss";
// import data from "./data";
function ShiftsListViewList({ data }) {
  return (
    <>
      <div className={`bg-white w-100 mt-3 table-wrap ${styles.table_wrap}`}>
        <div className={`table-responsive ${styles.persoanl_table}`}>
          <table className={`table ${styles.table}`}>
            <thead>
              <tr>
                <th className={`${styles.icon_first_column}`}></th>
                <th>Shift ID</th>
                <th>Site</th>
                <th>Role</th>
                <th className="text-center">Shift Date</th>
                <th className="text-center">Time</th>
                <th className="text-center">Rate</th>
                <th className="text-center">Booked</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((shift, index) => {
                return <ShiftsListViewCard shift={shift} key={shift.id} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ShiftsListViewList;
