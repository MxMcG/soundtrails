import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup


});

if (Meteor.isServer) {

	Meteor.methods({
		fetchArtistId(artist) {
			HTTP.call('GET', 'http://api.songkick.com/api/3.0/search/artists.json?', {
				params: {
					'query': artist,
					'apikey': 'bDyVjvzkBKKWmU07' 
				}
				}, function (error, response) {
					if (error) {
						return error;
					}	else {
						return response.data.resultsPage.results.artist[0].id;
					}
			});
		},


	});

}