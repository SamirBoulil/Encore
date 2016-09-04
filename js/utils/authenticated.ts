/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import {FIREBASE_CONFIG} from '../config/firebase.config';

import * as React from 'react';
import * as firebase from 'firebase';

firebase.initializeApp(FIREBASE_CONFIG);

function requireAuth(nextState, replace) {
  if(null === firebase.auth().currentUser) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export { requireAuth };
