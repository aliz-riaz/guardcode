import Image from "next/image";
import styles from "./CompanySearchByNameCard.module.scss";
import Link from "next/link";

const CompanySearchByNameCard = (props) => {
  return (
    <div className={`${styles.company_box} shadow hvr-bounce-in`}>
      <Link href={`${process.env.COMPANY_DIR_URL}${props.company.slug}`}>
        <a className="cursor-pointer" target="_blank">
          <div className={`${styles.company_logo}`}>
            <img
              src={props.company.brand.logo_url}
              className={`img-fluid hvr-icon`}
            />
          </div>
          <h5 className={`mt-auto`}>{props.company.title}</h5>
        </a>
      </Link>
    </div>
  );
};

export default CompanySearchByNameCard;
