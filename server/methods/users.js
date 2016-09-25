import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

  Meteor.methods({
    addNewSession(artist) {

    }
  })

}

    // create method, checks cookies for sid

    // create new sid
    // assign sid to Session variable
    // check cookies for uid

    // if uid is in cookies
    // add new entry to Users collection, sessions field w/ sid, browser, device, date/time

    // if no uid exists in cookies,
    // create new uid, sid, browser, device, date/time
    // add uid to cookie (90 days)
    // add new User collection with session field w/ sid, browser, device, date/time
