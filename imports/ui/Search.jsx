import React, { Component, PropTypes } from 'react';

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.createLocations = this.createLocations.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getArtistId = this.getArtistId.bind(this);
		this.getArtistCalendar = this.getArtistCalendar.bind(this);
	}

	createLocations(eventsArray) {
		var latLong = [];
		var content = [];
		var eventsCount = eventsArray.length;
		console.log('events', eventsArray);
		for (var i = 0; i < eventsCount; i++) {
			var eventTitle = eventsArray[i].displayName;
			var eventCity = eventsArray[i].location.city;
			var eventDate = eventsArray[i].start.date;
			var eventTime = eventsArray[i].start.time;
			var eventUrl = eventsArray[i].uri;
			var eventVenue = eventsArray[i].venue.displayName;

			var indLatLng = {lat: eventsArray[i].location.lat, lng: eventsArray[i].location.lng};
			var indContent = {
				eTitle: eventTitle,
				eCity: eventCity,	
				eDate: eventDate,
				eTime: eventTime,
				eUrl: eventUrl,
				eVenue: eventVenue
			}

			latLong.push(indLatLng);
			content.push(indContent);
		}

		return this.props.setupMarkers(latLong, content);
	}

	getArtistId(artist, callback) {
		Meteor.call('fetchArtistId', artist, function (err, res) {
			if (err) {
				return err;
			} else {
				callback(res);
			}
		});
	}

	getArtistCalendar(id, callback) {
		return Meteor.call('fetchArtistCalendar', id, function (err, res) {
			if (err) {
				return err;
			} else {
				callback(res.resultsPage.results.event);
			}
		});
	}

	handleSubmit(e) {
		var self = this;
		var artist = this.state.artist;
		e.preventDefault();
		this.getArtistId(artist, function (id) {
			self.getArtistCalendar(id, function (eventsArray) {
				self.createLocations(eventsArray);
			});	
		});
		
	}	

	handleChange(e) {
		this.setState({ artist: e.target.value })
	}


  render() {

  $(".btn").on("click", function() {
  	$(".former").addClass("transitionOut");
  	$(".video").addClass("zoomIn");
  	
  setTimeout( function() {
  	$(".video").fadeOut();
  }, 2000);
  	
  });


   	$(".search").on("click", function() {
  		$(".former").toggleClass("transitionOut");
  	});






    return (
      <div className="former">
      	<div className="wrapped_form">
	      	<h3 className="search-title">Follow the trail of your favorite artists!</h3>
	      	<form onSubmit={this.handleSubmit}>
	      	<div className="input-field col s6">
		        <input type='text' onChange={this.handleChange}/>
		        <label htmlFor="input_text">Enter Artist</label>
		      </div>
		        <input type='submit' className="waves-effect waves-light btn" defaultValue='enter'/>
		      </form>  
		    </div>
      </div>
    );
  }


}

Search.propTypes = {
	setupMarkers: React.PropTypes.func
};