import styles from "./SearchComponent.module.scss";

function SearchComponent({ value, onChange }) {
  return (
    <div className={`${styles.search_bar} ${styles.left_side} search_bar`}>
      <input
        className="form-control"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      <button>
        <img
          src={process.env.APP_URL + "/images/search-btn.svg"}
          width="25px"
          height="25px"
          className=""
        />
      </button>
    </div>
  );
}

export default SearchComponent;
