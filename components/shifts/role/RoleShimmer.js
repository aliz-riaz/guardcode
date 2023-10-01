import styles from "./RoleCard.module.scss";
function RoleShimmer(props) {
  return (
    <div className="col-12 col-md-4">
      <div
        className={`${styles.RoleCard} border border-1 border-light rounded my-2`}
      >
        <div className="px-3 py-2">
          <div className="d-flex align-items-center pb-3 pt-2">
            <div className="w-50">
              <h5 className="text-white animated_shimmer fw-bold fs-5 mb-0 w-50 py-2"></h5>
              <span className="text-white animated_shimmer d-block mb-1 py-0 mt-1">
                Role Name
              </span>
            </div>
            <div className="d-flex align-items-center ml-auto w-25 justify-content-end">
              <span className="text-white animated_shimmer">Ref 123</span>
            </div>
          </div>
          <div className={`${styles.licensedNames}`}>
            <span className="animated_shimmer text-white px-3 rounded">
              Licences
            </span>
            <ul className="list-unstyled d-flex flex-wrap mt-1">
              <li className="fw-medium px-2 mb-1 py-2 w-50 rounded animated_shimmer">
                {" "}
              </li>
              <li className="fw-medium px-2 mb-1 py-2 w-25 rounded animated_shimmer">
                {" "}
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${styles.associate} text-black-50 border-top px-3 py-2`}
        >
          <span className=" d-block animated_shimmer w-50 py-2 my-2"></span>
        </div>
      </div>
    </div>
  );
}

export default RoleShimmer;
