import { Meteor } from 'meteor/meteor';

const User = class User {

  constructor(properties) {
    this.properties = properties;
    this.inspectIncomingUser();
  }

  inspectIncomingUser() {
    const sid = Random.id([20]);
    let cookiedUserId = this.getCookie('uid');
    if (cookiedUserId) {  
      // add new sid to existing visitor
      Meteor.call('addSession', cookiedUserId, sid);
    } else {
      const uid = Random.id([20]);
      this.createCookie('uid', uid, 90);
      // add new visitor id and data
      Meteor.call('addUser', uid, sid);
    }

    this.createCookie('sid', sid, 1);
    Session.set('sid', sid);
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
	}

};

module.exports = {
  User
};