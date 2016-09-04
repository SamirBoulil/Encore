import * as React from 'react';
import * as ReactRouter from 'react-router';
import {Main} from '../Main';
import {TodoList} from '../components/TodoList';
import {TodoModel} from '../models/TodoModel';

let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let hashHistory = ReactRouter.hashHistory;
let IndexRoute = ReactRouter.IndexRoute;
let model = new TodoModel('react-todos');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main} >
      <IndexRoute component={TodoList} model={model} />
    </Route>
  </Router>
);

export { routes };
