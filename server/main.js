import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup


});

if (Meteor.isServer) {

	Meteor.methods({

		fetchArtistId(artist) {
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
						myFuture.return(response);
					}
			});

			return myFuture.wait();
		},

		fetchArtistCalendar(id) {
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

			return myFuture.wait();
		}		


	});

}