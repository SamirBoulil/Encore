"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var firebase = require('firebase');
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        _super.call(this, props);
        this.state = {
            error: false
        };
    }
    Login.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var self = this;
        console.log("trying to log in");
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result) {
            self.context.router.replace('/');
            console.log('User signed in!');
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function (error) {
            this.setState({ error: error });
        });
    };
    Login.prototype.render = function () {
        var errors = this.state.error ? React.createElement("p", null, " ", this.state.error, " ") : '';
        return (React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, React.createElement("form", {onSubmit: this.handleSubmit}, React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Login"))));
    };
    return Login;
}(React.Component));
exports.Login = Login;
