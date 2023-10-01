import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CompanySearchByNameList from "./CompanySearchByNameList";
import Pagination from "../Pagination/Pagination";
import styles from "./CompanySearchByName.module.scss";
import { Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

const CompanySearchByName = () => {
  const alphabetJunks = [
    "A-C",
    "D-F",
    "G-I",
    "J-L",
    "M-O",
    "P-R",
    "S-U",
    "V-W",
    "X-Z",
  ];

  const [data, setData] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [currentpage, setCurrentpage] = useState(1);
  const [alphaOrder, setAlphaOrder] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [companyLinks, setCompanyLinks] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(false);
    try {
      const res = await fetch(
        `${process.env.GUARD_PASS_URL}api/public/company/suggestions?alpha_order=${alphaOrder}&keyword=${searchKeyword}&page=${currentpage}&per_page=12`
      );
      const data = await res.json();
      setData(data.data.data);
      setTotalNumberOfPages(data.data.last_page);
      setCompanyLinks(data.data.links);
      setAlphaOrder(alphaOrder);
    } catch {
      toast.error("Something went wrong! Try Again", {
        autoClose: false,
        theme: "colored",
      });
    }
    setLoading(true);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [currentpage, alphaOrder]);

  useEffect(() => {
    if (searchKeyword == "") {
      getData();
    }
  }, [searchKeyword]);

  return (
    <div className={``}>
      <h2 class="text-center mb-5">Browse By Name</h2>

      <div className="row justify-content-end">
        <div className="col-12 col-md-3">
          <div className={`${styles.company_search_box}`}>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => {
                setCurrentpage(1);
                setSearchKeyword(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search by company Name"
            />
            <button onClick={getData}>
              <img src={`${process.env.APP_URL}/images/zoom-icn.svg`} />
            </button>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey={alphaOrder}
        transition={false}
        id="noanim-tab-example"
        className={`${styles.compnay_tabs} ${!loading ? styles.showHide : ""}`}
        onSelect={(k) => {
          setAlphaOrder(k);
          setCurrentpage(1);
          setSearchKeyword("");
        }}
      >
        {alphabetJunks.map((item, idx) => {
          return (
            <Tab
              eventKey={idx}
              title={item}
              className={`${styles.company_tab}`}
            >
              <h4 className={`${styles.show_companies} mb-4`}>
                Showing company {item}
              </h4>
              {data.length > 0 ? (
                <CompanySearchByNameList data={data} />
              ) : (
                <div className="text-center pt-5">
                  <img
                    src={`${process.env.APP_URL}/images/cactus-img.svg`}
                    width={`90px`}
                    height={`121px`}
                  />
                  <h4 class="fw-bold mt-4 mb-1">
                    Oops, we didn't find results for that search
                  </h4>
                  <p>
                    Maybe the following companies will help or try another
                    search
                  </p>
                </div>
              )}
            </Tab>
          );
        })}
      </Tabs>
      <div className="text-center">
        {totalNumberOfPages <= 1 ? null : (
          <Pagination
            currentpage={currentpage}
            setCurrentpage={setCurrentpage}
            contentDataLinks={companyLinks}
            customStyle={styles}
          />
        )}
      </div>
    </div>
  );
};

export default CompanySearchByName;
