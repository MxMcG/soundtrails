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
		var eventsCount = eventsArray.length;
		for (var i = 0; i < eventsCount; i++) {
			var indLatLng = {lat: eventsArray[i].location.lat, lng: eventsArray[i].location.lng}
			latLong.push(indLatLng);
		}
		return this.props.createMarkers(latLong);
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
    return (
      <div>
      	<form onSubmit={this.handleSubmit}>
	        <input type='text' placeholder='enter artist' onChange={this.handleChange}/>
	        <input type='submit' defaultValue='enter' />
	      </form>  
      </div>
    );
  }
}

Search.propTypes = {
	createMarkers: React.PropTypes.func
};