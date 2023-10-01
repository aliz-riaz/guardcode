import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updatePostCodeValueAction } from "../../redux/actions/bookingAction";
import { Input } from "reactstrap";
import { Loader } from "@googlemaps/js-api-loader";

class GoogleAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.postcode = this.props.postCode;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.loader = new Loader({
      apiKey: process.env.GOOGLE_KEY,
      id: "googleMapsAPI",
      version: "weekly",
      libraries: ["places"],
    });
  }

  componentDidMount() {
    this.loader
      .load()
      .then((google) => {
        // new google.maps.Map(document.getElementById("map"), mapOptions);
        if (window.google) {
          this.autocomplete = new window.google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            { types: ["geocode"], componentRestrictions: { country: "UK" } }
          );
          this.autocomplete.addListener(
            "place_changed",
            this.handlePlaceChanged
          );
        }
      })
      .catch((e) => {
        // do something
      });

    // this.postcode = this.props.postCode;
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    if (place.formatted_address) {
      this.props.updatePostCodeValueAction(place.formatted_address);
      this.props.setSaveSearchPostCode(place.formatted_address);
      this.props.enterKeyHandler();
    }
    // this.props.onPlaceLoaded(place);
    // this.props.place = place;
  }
  handleOnChanged(e) {
    e.target.value.slice(0, event.target.maxLength);
    this.props.updatePostCodeValueAction(e.target.value);
  }
  render() {
    return (
      <>
        <input
          ref={this.autocompleteInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.props.enterKeyHandler();
            }
          }}
          id="autocomplete"
          placeholder="Enter your Postcode or address"
          type="text"
          name="loc_name"
          className="form-control"
          value={this.props.postCode}
          onChange={(e) => {
            this.handleOnChanged(e);
          }}
          autocomplete="off"
          maxLength="60"
        ></input>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  postCode: state.vantage.bookingReducer.postcode,
});

const mapDispatchToProps = {
  updatePostCodeValueAction: updatePostCodeValueAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAutoComplete);
