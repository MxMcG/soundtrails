import { Meteor } from 'meteor/meteor';
import {fetchSongkickCalendar} from './songkickApi.js';
import {fetchTicketflyCalendar} from './ticketFlyApi.js';

if (Meteor.isServer) {

	Meteor.methods({
		
		requestAPIs(artist) {
			
			// const mocker = (artist) => { return { artist }}
			
			Promise.all([
				fetchSongkickCalendar(artist),
				fetchTicketflyCalendar(artist)
			]).then((values) => { 

				// [[{}, {}, {}, {}], [{}, {}, {}, {}]
				console.log('***************************************')
			  console.log('values', values);
			  console.log('***************************************')
			}).catch(reason => { 
			  console.log(reason)
			});


			// return optimizedArray

		}

	});

}