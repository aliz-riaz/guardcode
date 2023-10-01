import styles from "./SiteCard.module.scss";
function SiteShimmer(props) {
  return (
    <div className="col-12 col-md-4">
      <div
        className={`${styles.SiteCard} border border-1 border-light rounded my-2`}
      >
        <div className="px-3 py-2">
          <div className="d-flex align-items-center pb-3 pt-2">
            <div className="w-50">
              <h5 className="text-white animated_shimmer fw-bold fs-5 mb-0 w-50 py-2"></h5>
              <span className="text-white animated_shimmer d-block mb-1 py-0 mt-2">
                Role Name
              </span>
            </div>
            <div className="d-flex align-items-center ml-auto w-25 justify-content-end">
              <span className="text-white animated_shimmer">Ref 123</span>
            </div>
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

export default SiteShimmer;
