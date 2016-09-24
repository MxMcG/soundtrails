import { Meteor } from 'meteor/meteor';

const User = class User {

  constructor(properties) {
    this.properties = properties;
    this.getCookies();
  }

  getCookies() {
    const sid = Random.id([20]);
    this.createCookie('sid', sid, 90);


    // console.log(uid);
    // check cookies for uid
    // no uid exists

    // create cookie with uid
    
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