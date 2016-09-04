"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactRouter = require("react-router");
var firebase = require("firebase");
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        _super.call(this, props);
        this.state = {
            loggedIn: (null !== firebase.auth().currentUser)
        };
    }
    Main.prototype.componentWillMount = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (firebaseUser) {
            _this.setState({
                loggedIn: (null !== firebaseUser)
            });
            if (firebaseUser) {
                console.log("Logged IN", firebaseUser);
                _this.props.history.pushState("/");
            }
            else {
                console.log("Not logged in");
            }
        });
    };
    Main.prototype.render = function () {
        return (React.createElement("div", {className: "container"}, React.createElement("div", {className: "row"}, this.props.children)));
    };
    return Main;
}(React.Component));
exports.Main = Main;
