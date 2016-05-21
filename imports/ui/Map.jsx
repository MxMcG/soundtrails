import React, { Component, PropTypes } from 'react';
import { GoogleMapLoader, Marker, SearchBox } from "react-google-maps";


export default class Map extends Component {

	componentDidMount() {
		this.initMap();
	}

  initMap() {
  	var map;
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
  }
	

  render() {
    return (
			<div id='map'></div>
    );
  }
}

Map.propTypes = {

};