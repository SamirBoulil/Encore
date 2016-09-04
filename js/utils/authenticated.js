"use strict";
var firebase = require('firebase');
var firebase_config_1 = require('../config/firebase.config');
firebase.initializeApp(firebase_config_1.FIREBASE_CONFIG);
function requireAuth(nextState, replace) {
    if (null === firebase.auth().currentUser) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}
exports.requireAuth = requireAuth;
