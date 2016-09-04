"use strict";
var firebase = require('firebase');
var Utils = (function () {
    function Utils() {
    }
    Utils.pluralize = function (count, word) {
        return count === 1 ? word : word + 's';
    };
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
    Utils.store = function (namespace, dataIn, dataOut, cb) {
        console.debug();
        console.log("store");
        if (null !== firebase.auth().currentUser) {
            var userId = firebase.auth().currentUser.uid;
            if (dataIn) {
                firebase.database().ref('users/' + userId).set(JSON.stringify(dataIn));
            }
            firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
                dataOut = (JSON.parse(snapshot.val())) || [];
                cb();
            });
        }
        else {
            return [];
        }
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
    return Utils;
}());
exports.Utils = Utils;
