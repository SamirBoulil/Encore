/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

/// <reference path='../typings/index.d.ts' />

// import {routes} from './config/routes';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import * as ReactDOM from 'react-dom';
import {Main} from './Main';
import {Login} from './containers/Login';
import {Logout} from './containers/Logout';
import {TodoList} from './components/TodoList';
import {TodoModel} from './models/TodoModel';
import {requireAuth} from './utils/authenticated';

let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let hashHistory = ReactRouter.hashHistory;
let IndexRoute = ReactRouter.IndexRoute;
let model = new TodoModel('react-todos');

function render() {
  var routes = (
    <Router history={hashHistory}>
      <Route path="/" component={Main} >
        <IndexRoute component={TodoList} model={model} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
      </Route>
    </Router>
  );
  ReactDOM.render(routes, document.getElementsByClassName('todoapp')[0]);
}
model.subscribe(render);
render();
