/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import * as React from "react";
import * as ReactRouter from "react-router";
import { browserHistory } from 'react-router'
import * as firebase from "firebase";

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

class Main extends React.Component<{}, {}> {
  public state : any;
  public props : any;
  public context : any;

  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.object.isRequired
    // history: React.PropTypes.object.isRequired
  };


  constructor(props: any) {
    super(props);
    this.state = {
      loggedIn: (null !== firebase.auth().currentUser)
    }
  }

  public componentWillMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.setState({
        loggedIn: (null !== firebaseUser)
      });

      if (firebaseUser) {
        this.context.router.replace("/");
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
