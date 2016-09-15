/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import * as React from 'react';
import {Utils} from '../utils/firebase-utils';
import * as Firebase from 'firebase';

class Login extends React.Component<{}, {}> {

  public state : any;
  public refs : any;
  public props : any;
  public context: any;
  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.object.isRequired
    // history: React.PropTypes.object.isRequired
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: false
    }
  }

  public handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    var self = this;

    var provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithRedirect(provider).then(function(result : any) {
      var location = self.props.location
      self.context.router.replace('/')

      // User signed in!
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
    }).catch(function(error) {
      self.setState({error: error});
    })
    // Utils.logIn().then(function(result: any) {
    // }).catch(function(error) {
    //   self.setState({error: error});
    // });
  }

  public render() {
    var errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
      <form onSubmit={this.handleSubmit} className="actions">
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    );
  }
}

export {Login};
