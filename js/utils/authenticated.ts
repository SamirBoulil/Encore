import * as React from 'react';
import * as firebase from 'firebase';

import {FIREBASE_CONFIG} from '../config/firebase.config';

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
