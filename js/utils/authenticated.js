"use strict";
var Firebase_config_1 = require('../config/Firebase.config');
var firebase = require('firebase');
firebase.initializeApp(Firebase_config_1.FIREBASE_CONFIG);
function requireAuth(nextState, replace) {
    if (null === firebase.auth().currentUser) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}
exports.requireAuth = requireAuth;
