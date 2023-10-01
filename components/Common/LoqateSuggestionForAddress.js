import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./LoqateSuggestionForAddress.module.scss";
import {
  getLoqateSuggestionsByText,
  getLoqateSuggestionById,
} from "../../redux/actions/accountSettings";

const LoqateSuggestionForAddress = (props) => {
  const {
    address,
    setAddress,
    address2,
    setAddress2,
    postCode,
    setPostCode,
    city,
    setCity,
    addressError,
    cityError,
    postCodeError,
    labelStyle,
  } = props;
  const [loqateResponeforText, setLoqateResponeforText] = useState([]);
  const [showLoqateSugg, setShowLoqateSugg] = useState({
    address1: false,
    address2: false,
    city: false,
    postCode: false,
  });

  const LoqateSugg = (show, keyName, fieldToCheck) => {
    const payloadFroShowLoqate = {
      ...showLoqateSugg,
      [keyName]: false,
    };
    return show && fieldToCheck != "" && !loqateResponeforText[0]?.Error ? (
      <div className={`${styles.custom_dropdown}`}>
        <div className={`${styles.close_dropdown} m-2`}>
          <img
            src={process.env.APP_URL + "/images/c-remove.svg"}
            onClick={() => setShowLoqateSugg(payloadFroShowLoqate)}
            className="cursor-pointer"
          />
        </div>
        <ul className="pt-4 mt-3">
          {loqateResponeforText.map((value, idx) => {
            return (
              <li
                key={idx}
                onClick={(e) => {
                  if (value.Type == "Address") {
                    props
                      .getLoqateSuggestionByIdWithPromise(value.Id)
                      .then((res) => {
                        setPostCode(res.Items[0]?.PostalCode);
                        setCity(res.Items[0]?.City);
                        setAddress(
                          res.Items[0]?.Line1 + ", " + res.Items[0]?.Line2
                        );
                        setAddress2(res.Items[0]?.Line3 ?? "");
                      });
                    setShowLoqateSugg(payloadFroShowLoqate);
                  } else {
                    props
                      .getLoqateSuggestionsByText(postCode, value.Id)
                      .then((response) => {
                        setLoqateResponeforText(response.data);
                      });
                  }
                }}
              >
                {value.Text + " " + value.Description}
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;
  };

  return (
    <>
      <div className={`${styles.table_view_wrap_}`}>
        <div className={`${styles.table_list_} row mb-3`}>
          <div
            className={`${styles.column_} col-12 col-md-6 position-relative`}
          >
            <div className="gl-input form-group mb-0 ">
              <input
                className="form-control"
                name="address1"
                autoComplete="off"
                value={address}
                placeholder="Address 1"
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (e.target.value != "") {
                    setShowLoqateSugg({
                      ...showLoqateSugg,
                      address1: true,
                    });
                  }
                  props
                    .getLoqateSuggestionsByText(e.target.value)
                    .then((response) => {
                      if (e.target.value == response.code) {
                        setLoqateResponeforText(response.data);
                      }
                    });
                }}
              />

              {/* <div className={`${styles.column_} ${styles.column_first_}`}> */}
              <label
                htmlFor="address1"
                className={`${labelStyle && labelStyle}`}
              >
                Address 1:
              </label>
              {/* </div> */}
              {showLoqateSugg.address1 &&
                LoqateSugg(showLoqateSugg.address1, "address1", address)}
            </div>
            {addressError}
          </div>

          <div
            className={`${styles.column_} col-12 col-md-6 position-relative`}
          >
            <div className="gl-input form-group mb-0 ">
              <input
                type={"text"}
                autoComplete="off"
                className="form-control"
                name="companyAddress2"
                value={address2}
                placeholder="Address 2"
                onChange={(e) => {
                  setAddress2(e.target.value);
                  if (e.target.value != "") {
                    setShowLoqateSugg({
                      ...showLoqateSugg,
                      address2: true,
                    });
                  }
                  props
                    .getLoqateSuggestionsByText(e.target.value)
                    .then((response) => {
                      if (e.target.value == response.code) {
                        setLoqateResponeforText(response.data);
                      }
                    });
                }}
              />
              <label
                htmlFor="address2"
                className={`${labelStyle && labelStyle}`}
              >
                Address 2{" "}
              </label>
              {showLoqateSugg.address2 &&
                LoqateSugg(showLoqateSugg.address2, "address2", address2)}
            </div>
          </div>
        </div>
        <div className={`row mb-3`}>
          <div className={`col-12 col-md-6 position-relative`}>
            <div className="gl-input from-group mb-0">
              <input
                type={"text"}
                autoComplete="off"
                className="form-control w-100"
                name="postcode"
                value={postCode}
                placeholder="Postcode"
                onChange={(e) => {
                  setPostCode(e.target.value);
                  if (e.target.value != "") {
                    setShowLoqateSugg({
                      ...showLoqateSugg,
                      postCode: true,
                    });
                  }
                  props
                    .getLoqateSuggestionsByText(e.target.value)
                    .then((response) => {
                      if (e.target.value == response.code) {
                        setLoqateResponeforText(response.data);
                      }
                    });
                }}
              />
              <label
                htmlFor="postcode"
                className={`${labelStyle && labelStyle}`}
              >
                Postcode:{" "}
              </label>
              {showLoqateSugg.postCode &&
                LoqateSugg(showLoqateSugg.postCode, "postCode", postCode)}
              {/* {errors.postcode && touched.postcode ? (
                <div className="error text-danger mt-1">{errors.postcode}</div>
              ) : null} */}
            </div>
            {postCodeError}
          </div>
          <div className={`col-12 col-md-6 position-relative`}>
            <div className="gl-input form-group mb-0 ">
              <input
                className="form-control w-100"
                name="city"
                autoComplete="off"
                value={city}
                placeholder={`City`}
                onChange={(e) => {
                  e.preventDefault();
                  setCity(e.target.value);
                  if (e.target.value != "") {
                    setShowLoqateSugg({
                      ...showLoqateSugg,
                      city: true,
                    });
                  }
                  props
                    .getLoqateSuggestionsByText(e.target.value)
                    .then((response) => {
                      if (e.target.value == response.code) {
                        setLoqateResponeforText(response.data);
                      }
                    });
                }}
              />
              <label htmlFor="city" className={`${labelStyle && labelStyle}`}>
                City{" "}
              </label>
              {showLoqateSugg.city &&
                LoqateSugg(showLoqateSugg.city, "city", city)}
            </div>
            {cityError}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getLoqateSuggestionsByText: (text, contanier) =>
    dispatch(getLoqateSuggestionsByText(text, contanier)),
  getLoqateSuggestionById: getLoqateSuggestionById,
  getLoqateSuggestionByIdWithPromise: (id) =>
    dispatch(getLoqateSuggestionById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoqateSuggestionForAddress);
