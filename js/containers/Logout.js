"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var firebase = require('firebase');
var Logout = (function (_super) {
    __extends(Logout, _super);
    function Logout(props) {
        _super.call(this, props);
        this.state = {
            error: false
        };
    }
    Logout.prototype.componentDidMount = function () {
        firebase.auth().signOut();
        this.setState({ loggedIn: false });
    };
    Logout.prototype.render = function () {
        return (React.createElement("p", null, "You are now logged out"));
    };
    return Logout;
}(React.Component));
exports.Logout = Logout;
