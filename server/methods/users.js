import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

  Meteor.methods({
	  
  	userIdExists(uid) {
			const userIdExists = Users.findOne({ userId: uid });
	  	if (userIdExists === undefined) {
	  		return false;
	  	} else {
	  		return true;
	  	}
  	},

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
