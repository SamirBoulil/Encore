"use strict";
var firebase_config_1 = require('../config/firebase.config');
var firebase = require('firebase');
firebase.initializeApp(firebase_config_1.FIREBASE_CONFIG);
var Utils = (function () {
    function Utils() {
    }
    Utils.uuid = function () {
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
    };
    Utils.pluralize = function (count, word) {
        return count === 1 ? word : word + 's';
    };
    Utils.store = function (namespace, data) {
        if (null !== firebase.auth().currentUser) {
            var userId = firebase.auth().currentUser.uid;
            if (data) {
                firebase.database().ref('users/' + userId).set(JSON.stringify(data));
            }
        }
        return this.getValues('');
    };
    Utils.getValues = function (namespace) {
        if (null !== firebase.auth().currentUser) {
            var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
                return JSON.parse(snapshot.val()) || [];
            });
        }
        return new Promise(function () { return []; });
    };
    Utils.extend = function () {
        var objs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objs[_i - 0] = arguments[_i];
        }
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
    };
    Utils.isLoggedIn = function () {
        return null !== firebase.auth().currentUser;
    };
    Utils.logIn = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithRedirect(provider);
    };
    return Utils;
}());
exports.Utils = Utils;
