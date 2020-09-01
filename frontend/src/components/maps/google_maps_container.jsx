import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    };

    this.mapClick = this.mapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  mapClick(mapProps, map, clickEvent) {
    const { google } = this.props;
    // console.log('clicking');
    // console.log(mapProps);
    // console.log(map);
    // console.log(clickEvent);

    map.addListener('click', function (e) {
      placeMarkerAndPanTo(e.latLng, map);
    }); 

    function placeMarkerAndPanTo(latLng, map) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
    }
  }

  render() {
      
    return (
      <Map
        className="google-api-map"
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
          lat: 37.7941135,
          lng: -122.4126891,
        }}
        onClick={this.mapClick}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"App Academy San Francisco Office"}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAj-6TurQZ8nVQKKEMYKN_u7iCWuds7jpQ',
})(MapContainer);