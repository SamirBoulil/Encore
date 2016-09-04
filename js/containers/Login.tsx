import * as React from 'react';
import * as firebase from 'firebase';

class Login extends React.Component<{}, {}> {

  public state : any;
  public refs : any;
  public props : any;
  public context : any;

  constructor(props:any) {
    super(props);
    this.state = {
      error: false
    }
  }

  public handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    var self  = this;

    console.log("trying to log in");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result:any) {

      self.context.router.replace('/');

      // User signed in!
      console.log('User signed in!');
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

    }).catch(function(error) {
      this.setState({error: error});
    });
  }

  public render() {
    var errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
      <div className="col-sm-6 col-sm-offset-3">
      <form onSubmit={this.handleSubmit}>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      </div>
    );
  }
}

export {Login};
