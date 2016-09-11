/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import {FIREBASE_CONFIG} from '../config/Firebase.config';
import * as firebase from 'firebase';
import {Utils} from './firebase-utils';

firebase.initializeApp(FIREBASE_CONFIG);

function requireAuth(nextState, replace) {
  if (null === firebase.auth().currentUser) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export { requireAuth };
