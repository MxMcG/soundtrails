import { Meteor } from 'meteor/meteor';

const User = class User {

  constructor(properties) {
    this.properties = properties;
    this.inspectIncomingUser();
  }

  inspectIncomingUser() {
    let self;
    const sid = Random.id([20]);
    let cookiedUserId = this.readCookie('uid');      
    if (cookiedUserId) {
      Meteor.call('userIdExists', cookiedUserId, function (err, res) {
        if (res === true) {
          // add new sid to existing visitor
          Meteor.call('addSession', cookiedUserId, sid);
        } else {
          self.addNewUser(sid);
        }
      });
    } else {
      self.addNewUser(sid);
    }  
    Session.set('sid', sid);
  }

  addNewUser(sid) {
    const uid = Random.id([20]);
    this.createCookie('uid', uid, 90);
    // add new visitor id and data
    Meteor.call('addUser', uid, sid);
  }

  readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
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
