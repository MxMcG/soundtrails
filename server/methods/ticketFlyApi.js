import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

	export const fetchTicketflyCalendar = (artist) => {
		return new Promise((resolve, reject) => {
			HTTP.call('GET', 'http://www.ticketfly.com/api/events/upcoming.json?', {
				params: {
					'orgId': 1,
					'q': artist,
					'fields': 'venue.lat,venue.lat,ticketPurchaseUrl,' + 
										'externalTicketingUrls,venue.name,ticketPrice' +
										'startDate,doorsDate,name,headlinersName,supportsName' +
										'venue.city,venue.stateProvince' 
				}
			}, function (error, response) {
				if (error) {
					reject({ error: 'bad ticketfly request' });
				}	else {
					if (!response.data.events[0]) {
						reject({ error: 'no events for this artist' });
					} else {
						resolve(response.data.events);
					}
				}
			});
		}).then((events) => {
			return events;
		}, (error) => {
			throw error;
		});
	}

}
