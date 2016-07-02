/*External Dependencies*/
import React, { Component, PropTypes } from 'react';

/*Subcomponents*/
import Search from './Search.jsx';

/*Globals*/
var tourLine;
var RUNPATH;

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
		this.animatePath = this.animatePath.bind(this);
		this.initMap = this.initMap.bind(this);
		this.state = {
			counter: 0,
			markers: []
		};	
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

	setInfoWindow(content) {
		var infoWindow = document.getElementsByClassName('slideUnderInfoBox')[0];
		infoWindow.innerHTML = content;
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
		var markers = this.state.markers;
		if (markers.length >= 1) {	
			for (var i = 0; i < markers.length - 1; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		}	
		clearInterval(RUNPATH);
		this.setState({
			counter: 0
		});
		this.createMarkers(coords, content);
		this.animatePath(coords);
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

				var markerInfo = '<div class=\'infoBoxWrap\' modal-footer><div class=\'closeWindow\'></div><p>Title: ' + markerContent.eTitle + '</p><p>Date: ' + date + '</p><p>Venue: ' + markerContent.eVenue + '</p><p>City: ' + markerContent.eCity + '</p><p>Time: ' + time + '</p><a href=' + markerContent.eUrl + '>Tickets</a></div>'; 
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
	        self.setInfoWindow(this.content);
	      });

			 	this.state.markers.push(marker);
	    };
	  }  
	}

	animatePath(coords) {
		var i;
		var self = this;
		var counter = this.state.counter;
		var cleanCoords = coords.filter(function(coord) {
	  	return (coord.lat !== null);
	  }); 
	  if (cleanCoords[counter + 1] !== undefined) {	
			var departure = new google.maps.LatLng(cleanCoords[counter].lat, cleanCoords[counter].lng); //Set to whatever lat/lng you need for your departure location
			var arrival = new google.maps.LatLng(cleanCoords[counter + 1].lat, cleanCoords[counter + 1].lng); //Set to whatever lat/lng you need for your arrival location
			var tourLine = new google.maps.Polyline({
			    path: [departure, departure],
			    strokeColor: "#FF0000",
			    strokeOpacity: 1,
			    strokeWeight: 3,
			    geodesic: true, //set to false if you want straight line instead of arc
			    map: this.map,
			});
			var step = 0;
			var numSteps = 250; //Change this to set animation resolution
			var timePerStep = 5; //Change this to alter animation speed
			RUNPATH = setInterval(function() {
			   step += 1;
			   if (step > numSteps) {
			   		self.setState({counter: counter + 1});
			      window.clearInterval(RUNPATH);
			      self.animatePath(coords);
			   } else {
			       var nextSegment = google.maps.geometry.spherical.interpolate(departure, arrival, step/numSteps);
			       tourLine.setPath([departure, nextSegment]);
			   }
			}, timePerStep);
		} else {
			this.setState({ counter: 0 });
		}
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