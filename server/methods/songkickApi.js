import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

	// returns array of event object, or an error object
	export const fetchSongkickCalendar = (artist) => {
		return new Promise((resolve, reject) => {
			fetchArtistId(artist, (response) => {
				if (response.data.resultsPage.results.artist === undefined) {
					reject([{ error: 'artist not found'}]);
				} else {
					resolve(response.data.resultsPage.results.artist[0].id);
				}
			});
		}).then((id) => {
			return new Promise((resolve, reject) => {
				fetchArtistCalendar(id, (response) => {
					if (!response.data.resultsPage.results.event) {
						reject([{ error: 'artist not on tour'}]);
					} else {
						const events = JSON.parse(response.content).resultsPage.results.event;
						resolve(events);
					}
				});	
			});	
		}).then((events) => {
			return events
		}, (error) => {
			throw error;
		});
	}

	// hits songkick endpoint with artist search to get artist id
	const fetchArtistId = (artist, callback) => {
		Future = Npm.require('fibers/future');
		var myFuture = new Future();

		HTTP.call('GET', 'http://api.songkick.com/api/3.0/search/artists.json?', {
				params: {
					'query': artist,
					'apikey': Meteor.settings.songkickApi
				}
			}, function (error, response) {
				if (error) {
					myFuture.return(error);
				}	else {
					// console.log('artist ID', response);
					myFuture.return(response);
				}
		});

		callback(myFuture.wait());
	}

	// takes artist id and hit songkick for a calendar of upcoming events
	const fetchArtistCalendar = (id, callback) => {
		Future = Npm.require('fibers/future');
		var myFuture = new Future();

		HTTP.call('GET', 'http://api.songkick.com/api/3.0/artists/' + id + '/calendar.json', {
			params: {
				'apikey': Meteor.settings.songkickApi
			}
			}, function (error, response) {
				if (error) {
					myFuture.return(error);
				}	else {
					myFuture.return(response);
				}
		});

		callback(myFuture.wait());
	}

}

