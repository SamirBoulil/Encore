"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../config/constants");
var React = require("react");
var firebase_utils_1 = require("../utils/firebase-utils");
var TodoFooter = (function (_super) {
    __extends(TodoFooter, _super);
    function TodoFooter() {
        _super.apply(this, arguments);
    }
    TodoFooter.prototype.render = function () {
        var activeTodoWord = firebase_utils_1.Utils.pluralize(this.props.count, 'item');
        var clearButton = null;
        if (this.props.completedCount > 0) {
            clearButton = (React.createElement("button", {className: "clear-completed", onClick: this.props.onClearCompleted}, "Clear completed"));
        }
        var nowShowing = this.props.nowShowing;
        return (React.createElement("footer", {className: "footer"}, React.createElement("span", {className: "todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters"}, React.createElement("li", null, React.createElement("a", {href: "#/", className: classNames({ selected: nowShowing === constants_1.ALL_TODOS })}, "All")), ' ', React.createElement("li", null, React.createElement("a", {href: "#/inProgress", className: classNames({ selected: nowShowing === constants_1.IN_PROGRESS_TODOS })}, "In progress")), ' ', React.createElement("li", null, React.createElement("a", {href: "#/completed", className: classNames({ selected: nowShowing === constants_1.COMPLETED_TODOS })}, "Completed"))), clearButton));
    };
    return TodoFooter;
}(React.Component));
exports.TodoFooter = TodoFooter;
