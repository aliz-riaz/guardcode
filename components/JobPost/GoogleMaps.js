import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMaps = (props) => {
  return (
    <div style={{ height: "200px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          apiKey: process.env.GOOGLE_KEY,
          id: "googleMapsAPI",
          version: "weekly",
          libraries: ["places"],
        }}
        center={props.centerForMap}
        options={(maps) => ({
          streetViewControl: false,
          scaleControl: true,
          fullscreenControl: true,
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#212121",
                },
              ],
            },
            {
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#212121",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [
                {
                  color: "#757575",
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#bdbdbd",
                },
              ],
            },
            {
              featureType: "administrative.neighborhood",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#b3ffc2",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#181818",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1b1b1b",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#2c2c2c",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#8a8a8a",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                {
                  color: "#373737",
                },
              ],
            },
            {
              featureType: "road.highway",
              stylers: [
                {
                  weight: 0.5,
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#3c3c3c",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#00ff33",
                },
              ],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry",
              stylers: [
                {
                  color: "#4e4e4e",
                },
              ],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#00ff33",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#3d3d3d",
                },
              ],
            },
          ],
          gestureHandling: "greedy",
          disableDoubleClickZoom: true,
          minZoom: 13,
          maxZoom: 18,

          mapTypeControl: true,
          mapTypeId: maps.MapTypeId.ROADMAP,
          mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: maps.ControlPosition.BOTTOM_CENTER,
            mapTypeIds: [
              maps.MapTypeId.ROADMAP,
              maps.MapTypeId.SATELLITE,
              maps.MapTypeId.HYBRID,
            ],
          },

          zoomControl: true,
          clickableIcons: true,
        })}
        defaultZoom={10}
      >
        <img
          src={process.env.APP_URL + "/images/pin.svg"}
          width="50"
          lat={props.lat}
          lng={props.lng}
        />
        {/* <AnyReactComponent
            lat={props.lat}
            lng={props.lng}
            text="My Marker"
          /> */}
      </GoogleMapReact>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    center_for_map_google: state.vantage.jobPostReducer.centerForMapGoogle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
