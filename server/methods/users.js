import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

  Meteor.methods({
	  
	  addSession(uid, sid) {
	  	Users.update({ userId: uid }, 
	  		{ $push: 
	  			{ sessions: 
	  				{ 
	  					sessionID: sid,
	  					createdAt: new Date() 
	  				}
	  			}
	  		}		
	  	);
	  },

	  addUser(uid, sid) {
			Users.insert({
				userId: uid,
				sessions: [
					{
						sessionID: sid,
	  				createdAt: new Date()
	  			}
	  		],
				createdAt: new Date()
			})	
	  }

  })

}
