/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

// import {FIREBASE_CONFIG} from '../config/firebase.config';

import * as React from 'react';
import {Utils} from './firebase-utils';

function requireAuth(nextState, replace) : boolean {
    if (!Utils.isLoggedIn()) {
        console.log('REQUIRE AUTH: OK');
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
        return true;
    }

    return false
}

export { requireAuth };
