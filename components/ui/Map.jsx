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
		this.addCloseListener = this.addCloseListener.bind(this);
		this.animatePath = this.animatePath.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
		this.getUserCoords = this.getUserCoords.bind(this);
		this.initMap = this.initMap.bind(this);
		this.openSearchModal = this.openSearchModal.bind(this);
		this.removeMarkers = this.removeMarkers.bind(this);
		this.setupMarkers = this.setupMarkers.bind(this);
		this.setCenter = this.setCenter.bind(this);
		this.setInfoWindow = this.setInfoWindow.bind(this);
		this.trackTicketClick = this.trackTicketClick.bind(this);
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
		this.initMap({ lat: 32.7, lng: -117.16});
		// navigator.geolocation.getCurrentPosition(function (position) {
		// 	var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
		// 	self.initMap(userCoords);
		// });
	}

	setCenter(coords) {
		this.initMap(coords);
	}

	setInfoWindow(content) {
		var infoWindow = document.getElementsByClassName('slideUnderInfoBox')[0];
		infoWindow.innerHTML = content;
		this.trackTicketClick();
		this.addCloseListener();
	}

	trackTicketClick() {
		var eventTitle = document.getElementsByClassName('event-title')[0].firstChild.nextSibling.data;
		var eventDate = document.getElementsByClassName('event-date')[0].firstChild.nextSibling.data;
		var eventCity = document.getElementsByClassName('event-city')[0].firstChild.nextSibling.data;
		window.dataLayer.push({
			title: eventTitle,
			date: eventDate,
			city: eventCity
		});
	}

	addCloseListener() {
		var infoWindow = document.getElementsByClassName('slideUnderInfoBox')[0];
		var closeButton = document.getElementsByClassName('closeWindow')[0];
		closeButton.innerHTML = '<i class="fa fa-times close" aria-hidden="true"></i>';
		closeButton.addEventListener('click', function () {
		if (open = true) {
			document.getElementsByClassName('offClick')[0].classList.add('displayNone');
			document.getElementsByClassName('slid')[0].classList.remove('slid');
			document.getElementsByClassName('slideShow')[0].classList.remove('slideShow');
			open = false;
		} else {
			document.getElementsByClassName('offClick')[0].classList.add('displayNone');
		}
		});


	}

	setupMarkers(coords, content) {
		this.removeMarkers(coords, content);
	}

	removeMarkers(coords, content) {
		var markers = this.state.markers;
		if (markers.length >= 1) {	
			for (var i = 0; i < markers.length - 1; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		}	
		// clear infowindow if still open
		if (document.getElementsByClassName('slid')[0]) document.getElementsByClassName('slid')[0].classList.remove('slid');
		// clear soundtrail path
		clearInterval(RUNPATH);
		// reset counter
		this.setState({
			counter: 0
		});
		// reset map center at coords up upcoming artist event
		if (!!coords[0]) {
			this.setCenter(coords[0]);
		} else {
			this.getUserCoords();
		}
		google.maps.event.trigger(map, 'resize');
		// begin to draw artist path
		this.animatePath(coords, content);
	}

	createMarkers(coordsObj, contentObj) {
		var self = this;
		if (coordsObj.lat != null) {
			var markerContent = contentObj;
			// Properly Format Date
			var year = markerContent.eDate.substring(0, 4);
			var day = markerContent.eDate.substring(8, 10);
			var month = markerContent.eDate.substring(5, 7);
			var date = month + '/ ' + day + '/ ' + year;
			//Properly Format Time
			var time = markerContent.eTime;
			if (Boolean(time)) {
				var parts = time.split(':');
	      var hour = parts[0];
	      var minutes = parts[1];
		    if (hour > 12) {
		      time = (hour - 12) + ':' + minutes + 'pm';
		    } else if (hour == 0) {
		      time = 12 + ':' + minutes + 'am';
		    } else if (hour == 12) {
		      time += 'pm';
		    } else {
		      time += 'am';
		    }
		  } else {
		  	time = 'To Be Determined';
		  } 	
		  var open = false;
			var markerInfo = '<div class=\'infoBoxWrap clearfix\' modal-footer><div class=\'closeWindow\'></div><div class=\'information\'><p class=\'items event-title\'><i class=\'fa fa-tag\' aria-hidden=\'true\'></i>' + markerContent.eTitle + '</p><p class=\'items event-date\'><i class=\'fa fa-calendar\' aria-hidden=\'true\'></i>' + date + '</p><p class=\'items event-venue\'><i class=\'fa fa-map-marker\' aria-hidden=\'true\'></i>' + markerContent.eVenue + '</p><p class=\'items event-city\'><i class=\'fa fa-building\' aria-hidden=\'true\'></i>' + markerContent.eCity + '</p><p class=\'items\'><i class=\'fa fa-clock-o\' aria-hidden=\'true\'></i>' + time + '</p></div><div class=\'fifty-block\'><a href=' + markerContent.eUrl + ' class=\'link ticket-link\' target=\'_blank\'><i class=\'fa fa-ticket\' aria-hidden=\'true\'></i>Tickets</a><img class=\'sk-logo\' src="/img/sk-white.png"/></div></div>'; 
			var marker = new google.maps.Marker({
		    position: coordsObj,
		    content: markerInfo,
		    map: self.map,
		  });
		  // The most upcoming artist event
		  if (this.state.counter === 0) {
				marker.setAnimation(google.maps.Animation.BOUNCE);
		  }	
			google.maps.event.addListener(marker, 'click', function() {
        self.setInfoWindow(this.content);
        document.getElementsByClassName('slideUnderInfoBox')[0].classList.add('slid');
        document.getElementsByClassName('items')[0].classList.add('slideShow');
        document.getElementsByClassName('offClick')[0].classList.remove('displayNone');
        open = true;
      });
		 	this.state.markers.push(marker);
    };

	}

	animatePath(coords, content) {
		var i;
		var self = this;
		var counter = this.state.counter;
		// if coordinate exists that is null, clean it out
		var cleanCoords = coords.filter(function(coord) {
	  	return (coord.lat !== null);
	  });
	  if (cleanCoords[counter] !== undefined) {	
	  	// handles stoppage of path on final coordinate
	  	if (cleanCoords[counter + 1] === undefined) {
				var departure = new google.maps.LatLng(cleanCoords[counter].lat, cleanCoords[counter].lng); //Set to whatever lat/lng you need for your departure location
				var arrival = new google.maps.LatLng(cleanCoords[counter].lat, cleanCoords[counter].lng); //Set to whatever lat/lng you need for your arrival location
			} else {
				var departure = new google.maps.LatLng(cleanCoords[counter].lat, cleanCoords[counter].lng); //Set to whatever lat/lng you need for your departure location
				var arrival = new google.maps.LatLng(cleanCoords[counter + 1].lat, cleanCoords[counter + 1].lng); //Set to whatever lat/lng you need for your arrival location
			}
			var tourLine = new google.maps.Polyline({
		    path: [departure, departure],
		    strokeColor: "#26a69a",
		    strokeOpacity: 1,
		    strokeWeight: 5,
		    geodesic: true, //set to false if you want straight line instead of arc
		    map: this.map
			});
			var step = 0;
			var numSteps = 250; //Change this to set animation resolution
			var timePerStep = 5; //Change this to alter animation speed
			// creates marker at each coordinate
			self.createMarkers(cleanCoords[counter], content[counter]);
			// draws line between coordinates
			RUNPATH = setInterval(function() {
				step += 1;
				if (step > numSteps) {
					self.setState({counter: counter + 1});
				  window.clearInterval(RUNPATH);
				  self.animatePath(coords, content);
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
		  zoom: 4,
		  mapTypeControl: false
		});
		google.maps.event.trigger(this.map, 'resize');
		google.maps.event.trigger(this.map, 'bounds_changed');
	}

	openSearchModal() {
		document.getElementsByClassName('former')[0].classList.toggle('transitionOut');
		document.getElementsByClassName('material-icons')[0].classList.toggle("searchClick");
		document.getElementsByClassName('close')[0].classList.toggle('searchClick');
	}	

	closeModal() {
		if (open = true) {
			document.getElementsByClassName('offClick')[0].classList.add('displayNone');
			document.getElementsByClassName('slid')[0].classList.remove('slid');
			open = false;
		} else {
			document.getElementsByClassName('offClick')[0].classList.add('displayNone');
		}
	}


  render() {
    return (
	    	<div className='mapContainer'>
	    		<div className ='offClick displayNone' onClick={this.closeModal}></div>
		    	<div className='mapWrap'>
		    		<a className='btn-floating btn-large waves-effect waves-light search show dontShow'
		    		  onClick={this.openSearchModal} >
		    		  <i className="material-icons searchClick">search</i>
		    		  <i className="fa fa-times close" aria-hidden="true"></i>
		    		</a>
			    	<Search setupMarkers={this.setupMarkers} />
						<div id='map'>
						</div>
						<img className='songkickLogoMap' src={'/img/songkick-logo.png'}/>
						<div className="fb-share-button" data-href="https://www.tourlookup.com" 
							data-layout="button" data-size="large" data-mobile-iframe="true">
							<a className="fb-xfbml-parse-ignore" target="_blank" 
								href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.tourlookup.com%2F&amp;src=sdkpreparse">
									Share
							</a>
						</div>
						<div className='slideUnderInfoBox'></div>
					</div>	
				</div>
    );
  }
}

Map.propTypes = {

};