import { Meteor } from 'meteor/meteor';
const crypto = Npm.require('crypto');

const User = class User {

  constructor(properties) {
    this.properties = properties;
    this.getCookies();
  }

  getCookies() {
    const sid = crypto.randomBytes(8).toString('hex');
    // console.log(uid);
    // check cookies for uid

    // no uid exists
    const uid = crypto.randomBytes(8).toString('hex');

    // create cookie with uid
    // window.document.cookie = 'cookie1=test; expires=Fri, 3 Aug 2001 20:47:11 UTC; path=/'
  }

};

module.exports = {
  User
};

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
