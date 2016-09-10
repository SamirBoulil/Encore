"use strict";
var firebase_utils_1 = require('./firebase-utils');
function requireAuth(nextState, replace) {
    if (!firebase_utils_1.Utils.isLoggedIn()) {
        console.log('REQUIRE AUTH: OK');
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
        return true;
    }
    return false;
}
exports.requireAuth = requireAuth;
