import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.methods({

  	saveArtist(artist, id) {
  		let artistLowerCase = artist.toLowerCase();
  		let dbArtist = Artists.findOne({
  			name: artistLowerCase
  		});
  		if (dbArtist) {
  			Artists.update({ name : artistLowerCase },
		  		{ $inc:
		  			{ searchCount : 1 }
		  		}
	  		);
  		} else {
	  		Artists.insert({
	  			name: artistLowerCase,
	  			skId: id,
	  			searchCount: 0,
	  			createdAt: new Date()
	  		});
  		}
  	}

  });
}
