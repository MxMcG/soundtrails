import React, { Component, PropTypes } from 'react';


export default class Search extends Component {

	constructor(props) {
		super(props);
		this.createLocations = this.createLocations.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.trackArtistSearch = this.trackArtistSearch.bind(this);
		this.getArtistId = this.getArtistId.bind(this);
		this.getArtistCalendar = this.getArtistCalendar.bind(this);
		this.state = {
			artist: ''
		};	
	}

	createLocations(eventsArray) {
		var latLong = [];
		var content = [];
		var eventsCount = eventsArray.length;
		console.log(eventsCount)
		for (var i = 0; i <= eventsCount - 1; i++) {
			// ensure lat lng exists for each event
			if (!!eventsArray[i].location.lat && !!eventsArray[i].location.lng)
				var eventTitle = eventsArray[i].displayName;
				var eventCity = eventsArray[i].location.city;
				var eventDate = eventsArray[i].start.date;
				var eventTime = eventsArray[i].start.time
				var eventUrl = eventsArray[i].uri;
				var eventVenue = eventsArray[i].venue.displayName;

				var indLatLng = {
					lat: eventsArray[i].location.lat,
					lng: eventsArray[i].location.lng
				};
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
				if (!res.data.resultsPage.results.artist) {
					callback({ 'message': 'artist cannot be found'}, null, artist);
				} else {
					callback(null, res.data.resultsPage.results.artist[0].id, artist);
				}
			}
		});
	}

	getArtistCalendar(id, callback, artistName) {
		return Meteor.call('fetchArtistCalendar', id, function (err, res) {
			if (err) {
				return err;
			} else {
				if (!res.data.resultsPage.results.event) {
					callback({ 'message': 'artist not on tour'}, null, artistName);
				} else {
					var calendarData = JSON.parse(res.content);
					callback(null, calendarData.resultsPage.results.event, artistName);
				}
			}
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		var self = this;
		var artist = this.state.artist;
		if (!artist) return Materialize.toast('You must enter an artist', 8000);
		this.trackArtistSearch(artist);
		this.getArtistId(artist, function (err, id, artistName) {
			if (!!err) {
				Materialize.toast(artistName + ': Cannot be found', 8000);
				// center map at user location
			} else {
				self.getArtistCalendar(id, function (err, eventsArray, artistName) {
					if (!!err) {
						Materialize.toast(artistName + ' is not on tour', 8000);
						// center map at user location

					} else {
						self.createLocations(eventsArray);
					}
				}, artist);					
			}	
		});
	}

	handleChange(e) {
		if (e.target.value != "") {
			this.setState({ artist: e.target.value })
		}
	}

	searchTransition() {
		var hasClass = false;
  	document.getElementsByClassName('former')[0].classList.add('transitionOut');
  	setTimeout(function() {
  		document.getElementsByClassName('background')[0].classList.add('zoomIn');
  	},2000);
    setTimeout(function() {
    	document.getElementsByClassName('background')[0].classList.add('displayNone');
    	hasClass = true;
    }, 4000);


		if (hasClass = true) {
			document.getElementsByClassName('material-icons')[0].classList.toggle("searchClick");
			document.getElementsByClassName('close')[0].classList.toggle('searchClick');
		}
		document.getElementsByClassName('search')[0].classList.remove('show');
			
	}

	trackArtistSearch(artist) {
		window.dataLayer.push({
		  event: 'artistSearch',
		  artist_search: artist
		});
	}

  render() {
    return (
      <div className="former opener">
      	<div className="wrapped_form">
	      	<h3 className="search-title" >Follow the trail of your favorite artists!</h3>
	      	<form onSubmit={this.handleSubmit}>
	      	<div className="input-field col s6">
		        <input type='text' placeholder="Enter Artist" onChange={this.handleChange} autoFocus/>
		      </div>
		        <input type="submit" className="big-button" defaultValue='enter'
		        	onClick={this.searchTransition} />
		      </form>
		    </div>
      </div>
    );
  }
}

Search.propTypes = {
	setupMarkers: React.PropTypes.func
};
