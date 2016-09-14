/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import * as firebase from 'firebase';

class Utils {

  public static uuid() : string {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }

    return uuid;
  }

  public static pluralize(count: number, word: string) {
    return count === 1 ? word : word + 's';
  }

  public static storeValue(data? : any) {
    if (null !== firebase.auth().currentUser) {
      var userId = firebase.auth().currentUser.uid;
      if (data) {
        if (typeof(data.inProgressDate) !== 'undefined' && data.inProgressDate !== null) {
          data.inProgressDate = '' + data.inProgressDate;
        }
        firebase.database().ref('users/' + userId + '/todos/' + data['id']).set(data);
      }
    }
  }

  public static storeValues(data? : any) {
    if (null !== firebase.auth().currentUser) {
      var userId = firebase.auth().currentUser.uid;
      if (data) {
        var newData = data.map((todo) => {
          if (typeof(todo.inProgressDate) !== 'undefined' && todo.inProgressDate !== null) {
            todo.inProgressDate = '' + todo.inProgressDate;
          }
          return todo;
        });
        firebase.database().ref('users/' + userId + '/todos/').set(newData);
      }
    }
  }

  public static getValues(namespace: string) : any {
    if (null !== firebase.auth().currentUser) {
      var userId = firebase.auth().currentUser.uid;
      return firebase.database().ref('users/' + userId + '/todos/').once('value').then(function (snapshot) {
        return snapshot.val() || [];
      });
    }

    return new Promise(function() { return [] });
  }

  public static extend(...objs : any[]) : any {
    var newObj = {};
    for (var i = 0; i < objs.length; i++) {
      var obj = objs[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }

  public static isLoggedIn() : boolean {
    return null !== firebase.auth().currentUser;
  }

  public static logIn() : any {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
  }
}

export { Utils };
