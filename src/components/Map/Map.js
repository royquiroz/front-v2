import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <img
    src="http://simpleicon.com/wp-content/uploads/map-marker-13-256x256.png"
    width="40px"
    height="40px"
    alt="marker"
  />
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 19.397767,
      lng: -99.171427
    },
    zoom: 19
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "60vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBR166UPVG8dk4kQRn7dI9revtfAz8RqhM" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={19.397767} lng={-99.171427} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
