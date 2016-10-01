import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

  Meteor.methods({
	 
	  saveSearch(artist, sid) {
	  	Searches.insert({
	  		sessionId: sid,
	  		artistSearched: artist,
	  		createdAt: new Date()
	  	})
	  }

  })

}
