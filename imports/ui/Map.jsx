/*External Dependencies*/
import React, { Component, PropTypes } from 'react';

/*Subcomponents*/
import Search from './Search.jsx';

/*Globals*/
var MARKERS = [];

/*React Component*/
export default class Map extends Component {

	constructor(props) {
		super(props);
		this.createMarkers = this.createMarkers.bind(this);
		this.setupMarkers = this.setupMarkers.bind(this);
		this.removeMarkers = this.removeMarkers.bind(this);
		this.getUserCoords = this.getUserCoords.bind(this);
		this.initMap = this.initMap.bind(this);
	}

	componentWillMount() {
	 
	}

	componentDidMount() {
	  this.getUserCoords();
	}

	getUserCoords() {
		var self = this;
		var userLocation = navigator.geolocation.getCurrentPosition(function (position) {
			var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
			self.initMap(userCoords);
		})
	}

	setupMarkers(coords, content) {
		this.removeMarkers(coords, content);
	}

	createMarkers(coords, content) {
		for (var i = 0; i < coords.length; i++) {
			var markerContent = content[i];
			var markerInfo = '<div class=\'infoBoxWrap\'><p>Title: ' + markerContent.eTitle + '</p><p>Date: ' + markerContent.eDate + '</p><p>Venue: ' + markerContent.eVenue + '</p><p>City: ' + markerContent.eCity + '</p><p>Time: ' + markerContent.eTime + '</p><a href=' + markerContent.eUrl + '>Tickets</a></div>'; 
			var marker = new google.maps.Marker({
		    position: coords[i],
		    content: markerInfo,
		    map: this.map,
		  });

			google.maps.event.addListener(marker, 'click', function() {
        var infoWindow = new google.maps.InfoWindow({});
        infoWindow.setContent(this.content);
        infoWindow.open(map.instance, this);
      });

      var tourPath = new google.maps.Polyline({
		    path: coords,
		    geodesic: true,
		    map: this.map,
		    strokeColor: '#FF0000',
		    strokeOpacity: 1.0,
		    strokeWeight: 1
		  });

		 	MARKERS.push(marker);
		}
	}

	removeMarkers(coords, content) {
		for (var i = 0; i < MARKERS.length - 1; i++) {
			MARKERS[i].setMap(null);
		}
		MARKERS = [];
		this.createMarkers(coords, content);
	}

	initMap(coords) { 
		this.map = new google.maps.Map(document.getElementById('map'), {
		  center: coords,
		  zoom: 6
		});
	}

  render() {
 
    return (
    	<div className='mapWrap'>
    		<a className="btn-floating btn-large waves-effect waves-light search"><i className="material-icons">search</i></a>
	    	<Search setupMarkers={this.setupMarkers} />
				<div id='map' style={{width: '100%', height: '100%', margin: 'auto', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0}}></div>
			</div>	
    );
  }
}

Map.propTypes = {

};