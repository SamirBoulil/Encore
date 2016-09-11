"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Firebase = require('firebase');
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = this;
        _super.call(this, props);
        this.handleSubmit = function (e) {
            e.preventDefault();
            var self = _this;
            var provider = new Firebase.auth.GoogleAuthProvider();
            Firebase.auth().signInWithRedirect(provider).then(function (result) {
                var location = self.props.location;
                self.context.router.replace('/');
            }).catch(function (error) {
                self.setState({ error: error });
            });
        };
        this.state = {
            error: false
        };
    }
    Login.prototype.render = function () {
        var errors = this.state.error ? React.createElement("p", null, " ", this.state.error, " ") : '';
        return (React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, React.createElement("form", {onSubmit: this.handleSubmit}, React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Login"))));
    };
    Login.contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    return Login;
}(React.Component));
exports.Login = Login;
