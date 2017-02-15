import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

  Meteor.methods({
		saveTicketClick(details, sid) {
			TicketClicks.insert({
				sessionId: sid,
				eventTitle: details.eventTitle,
				eventCity: details.eventCity,
				eventVenue: details.eventVenue,
				eventDate: details.eventDate,
				eventTime: details.eventTime,
				createdAt: new Date()
			});
		}
	});

}
