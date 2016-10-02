import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.methods({
  	
  	saveArtist(artist, id) {
  		artist.toLowerCase();
  		let dbArtist = Artists.findOne({
  			name: artist
  		});
  		if (dbArtist) {
  			Artists.update({ name : artist },
		  		{ $inc: 
		  			{ searchCount : 1 } 
		  		}
	  		);
  		} else {	
	  		Artists.insert({
	  			name: artist,
	  			skId: id,
	  			searchCount: 0,
	  			createdAt: new Date()
	  		});
  		}
  	}  	

  });
}
