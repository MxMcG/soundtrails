import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

	Meteor.methods({
		
		requestAPIs(artist) {
			const songkickAPI = Meteor.call('fetchSongkickCalender', artist, (response) => {
				return response;
			});


			Promise.all([songkickAPI]).then(values => { 

				// [[{}, {}, {}, {}], [{}, {}, {}, {}]



			  console.log(values);
			}).catch(reason => { 
			  console.log(reason)
			});


			// return optimizedArray

		}

	});

}