import { User } from './cookies.js'

Meteor.startup(() => {
  // code to run on server at startup
  new User();

});