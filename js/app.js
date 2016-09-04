"use strict";
var React = require("react");
var ReactRouter = require("react-router");
var ReactDOM = require("react-dom");
var Main_1 = require("./Main");
var Login_1 = require("./containers/Login");
var Logout_1 = require("./containers/Logout");
var TodoList_1 = require("./components/TodoList");
var TodoModel_1 = require("./models/TodoModel");
var authenticated_1 = require("./utils/authenticated");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var model = new TodoModel_1.TodoModel("react-todos");
function render() {
    var routes = (React.createElement(Router, {history: hashHistory}, React.createElement(Route, {path: "/", component: Main_1.Main}, React.createElement(IndexRoute, {component: TodoList_1.TodoList, model: model, onEnter: authenticated_1.requireAuth}), React.createElement(Route, {path: "login", component: Login_1.Login}), React.createElement(Route, {path: "logout", component: Logout_1.Logout}))));
    ReactDOM.render(routes, document.getElementsByClassName("todoapp")[0]);
}
model.subscribe(render);
render();
