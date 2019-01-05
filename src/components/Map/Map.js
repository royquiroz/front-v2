import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = () => (
  <img
    src="http://simpleicon.com/wp-content/uploads/map-marker-13-256x256.png"
    width="40px"
    height="40px"
    alt="marker"
  />
);

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 20
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "60vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBR166UPVG8dk4kQRn7dI9revtfAz8RqhM" }}
          defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
