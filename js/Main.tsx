import * as React from 'react';
import * as ReactRouter from 'react-router';
import * as firebase from 'firebase';

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

class Main extends React.Component<{}, {}> {
  public state : any;
  public props : any;

  constructor(props: any) {
    super(props);
    this.state = {
      loggedIn: (null !== firebase.auth().currentUser)
    }
  }

  public componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {

      this.setState({
        loggedIn: (null !== firebaseUser)
      } )

      if (firebaseUser) {
        console.log("Logged IN", firebaseUser);
        this.props.history.pushState('/');

      } else {
        console.log('Not logged in');
      }
    });
  }

  public render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export {Main};
