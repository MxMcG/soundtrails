import { User } from './methods/users.js'

Meteor.startup(() => {
  // code to run on server at startup
  new User();

});
