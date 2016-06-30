/*External Dependencies*/
import React, { Component, PropTypes } from 'react';

/*Subcomponents*/
import Search from './Search.jsx';

/*Globals*/
var MARKERS = [];
var tourLine;

/*React Component*/
export default class Map extends Component {

	constructor(props) {
		super(props);
		this.createMarkers = this.createMarkers.bind(this);
		this.setupMarkers = this.setupMarkers.bind(this);
		this.removeMarkers = this.removeMarkers.bind(this);
		this.getUserCoords = this.getUserCoords.bind(this);
		this.openSearchModal = this.openSearchModal.bind(this);
		this.setCenter = this.setCenter.bind(this);
		this.setInfoWindow = this.setInfoWindow.bind(this);
		this.addCloseListener = this.addCloseListener.bind(this);
		this.initMap = this.initMap.bind(this);
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

	setCenter(coords) {
		this.initMap(coords);
	}

	setInfoWindow(marker) {
		var infoWindow = document.getElementsByClassName('slideUnderInfoBox')[0];
		infoWindow.innerHTML = marker.content;
		this.addCloseListener();
	}

	addCloseListener() {
		var infoWindow = document.getElementsByClassName('slideUnderInfoBox')[0];
		var closeButton = document.getElementsByClassName('closeWindow')[0];
		closeButton.addEventListener('click', function () {
			infoWindow.innerHTML = '';
		});
	}

	setupMarkers(coords, content) {
		console.log('4')
		this.removeMarkers(coords, content);
	}

	removeMarkers(coords, content) {
		console.log('5')
		if (MARKERS.length >= 1) {	
			for (var i = 0; i < MARKERS.length - 1; i++) {
				MARKERS[i].setMap(null);
			}
			tourLine.setMap(null);
			MARKERS = [];
		}	
		this.createMarkers(coords, content);
	}

	createMarkers(coords, content) {
		console.log('6')
		var self = this;
		this.setCenter(coords[0]);
		for (var i = 0; i < coords.length; i++) {
			if (coords[i].lat != null) {
				var markerContent = content[i];

				var year = markerContent.eDate.substring(0, 4);
				var day = markerContent.eDate.substring(8, 10);
				var month = markerContent.eDate.substring(5, 7);
				
				var date = month + '/ ' + day + '/ ' + year;
				var time = markerContent.eTime || 'N/A';

				var markerInfo = '<div class=\'infoBoxWrap\'><div class=\'closeWindow\'></div><p>Title: ' + markerContent.eTitle + '</p><p>Date: ' + date + '</p><p>Venue: ' + markerContent.eVenue + '</p><p>City: ' + markerContent.eCity + '</p><p>Time: ' + time + '</p><a href=' + markerContent.eUrl + '>Tickets</a></div>'; 
				var marker = new google.maps.Marker({
			    position: coords[i],
			    content: markerInfo,
			    map: self.map,
			  });

			  // The most upcoming artist event
			  if (i === 0) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
			  }	

				google.maps.event.addListener(marker, 'click', function() {
					console.log(marker);
	        self.setInfoWindow(marker);
	        /*var infoWindow = new google.maps.InfoWindow({});
	        infoWindow.setContent(this.content);
	        infoWindow.open(map.instance, this);*/
	      });
			 	MARKERS.push(marker);
	    };
	  }  

	  var cleanCoords = coords.filter(function(coord) {
	  	return (coord.lat !== null);
	  });

    tourLine = new google.maps.Polyline({
	    path: cleanCoords,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 1
	  });
	  tourLine.setMap(this.map);
	 
	}


	initMap(coords) { 
		this.map = new google.maps.Map(document.getElementById('map'), {
		  center: coords,
		  zoom: 4
		});
	}

	openSearchModal() {
		$(".former").toggleClass("transitionOut");
	}	

  render() {
    return (
    	<div className='mapContainer'>
	    	<div className='mapWrap'>
	    		<a className='btn-floating btn-large waves-effect waves-light search'
	    		  onClick={this.openSearchModal} >
	    		  <i className="material-icons">search</i>
	    		</a>
		    	<Search setupMarkers={this.setupMarkers} />
					<div id='map' style={{width: '100%', height: '100%', margin: 'auto',
					  position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0}}>
					</div>
					<div className='slideUnderInfoBox'></div>
				</div>	
			</div>
    );
  }
}

Map.propTypes = {

};