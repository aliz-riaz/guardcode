import CompanySearchByNameCard from "./CompanySearchByNameCard";
import { Tab } from "react-bootstrap";
import styles from "./CompanySearchByNameList.module.scss";
import { Spinner } from "react-bootstrap";

const CompanySearchByNameList = (props) => {
  return (
    <div className={`${styles.company_list_container}`}>
      {props.data.map((company, idx) => {
        return <CompanySearchByNameCard company={company} />;
      })}
    </div>
  );
};

export default CompanySearchByNameList;
