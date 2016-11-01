import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

	Meteor.methods({

		fetchSongkickCalender(artist) {
			return new Promise((resolve, reject) => {
				fetchArtistId(artist, (response) => {
					if (response.data.resultsPage.results.artist === undefined) {
						reject('Artist not found.');
					} else {
						resolve(response.data.resultsPage.results.artist[0].id);
					}
				});
			}, (error) => {
				throw error
			}).then((id) => {
				fetchArtistCalendar(id, (response) => {
					if (!res.data.resultsPage.results.event) {
						reject('Artist is not on tour.');
					} else {
						resolve(JSON.parse(response.content).resultsPage.results.event);
					}
				});
			}, (error) => {
				throw error;
			});
		
		}

	});

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
