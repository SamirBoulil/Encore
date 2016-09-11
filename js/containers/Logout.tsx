/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import * as React from 'react';
import * as firebase from 'firebase';

class Logout extends React.Component<{}, {}> {

  public state : any;

  constructor(props:any) {
    super(props);
    this.state = {
      error: false
    }
  }

  public componentDidMount() {
    firebase.auth().signOut();
    this.setState({loggedIn: false});
  }

  public render() {
    return (
      <p>You are now logged out</p>
    );
  }
}

export {Logout};
