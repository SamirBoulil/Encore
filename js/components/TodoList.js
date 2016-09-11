"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDom = require("react-dom");
var TodoModel_1 = require("../models/TodoModel");
var TodoFooter_1 = require("./TodoFooter");
var TodoItem_1 = require("./TodoItem");
var firebase_utils_1 = require("../utils/firebase-utils");
var constants_1 = require("../config/constants");
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList(props) {
        _super.call(this, props);
        this.state = {
            nowShowing: constants_1.ALL_TODOS,
            editing: null,
            todos: []
        };
    }
    TodoList.prototype.componentWillMount = function () {
        var _this = this;
        firebase_utils_1.Utils.getValues('').then(function (newTodos) {
            _this.setTodos(newTodos);
        });
    };
    TodoList.prototype.componentDidMount = function () {
    };
    TodoList.prototype.componentDidUpdate = function () {
        firebase_utils_1.Utils.store('', this.state.todos);
    };
    TodoList.prototype.handleNewTodoKeyDown = function (event) {
        if (event.keyCode !== constants_1.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        var val = ReactDom.findDOMNode(this.refs["newField"]).value.trim();
        if (val) {
            ReactDom.findDOMNode(this.refs["newField"]).value = '';
            var newTodos = TodoModel_1.TodoModel.addTodo(this.state.todos, val);
            this.setTodos(newTodos);
        }
    };
    TodoList.prototype.toggleAllCompleted = function (event) {
        var target = event.target;
        var checked = target.checked;
        var newTodos = TodoModel_1.TodoModel.toggleAllCompleted(this.state.todos, checked);
        this.setTodos(newTodos);
    };
    TodoList.prototype.toggleCompleted = function (todoToToggle) {
        var newTodos = TodoModel_1.TodoModel.toggleCompleted(this.state.todos, todoToToggle);
        this.setTodos(newTodos);
    };
    TodoList.prototype.destroy = function (todo) {
        var newTodos = TodoModel_1.TodoModel.destroy(this.state.todos, todo);
        this.setTodos(newTodos);
    };
    TodoList.prototype.toggleInProgress = function (todo) {
        var newTodos = TodoModel_1.TodoModel.toggleInProgress(this.state.todos, todo);
        this.setTodos(newTodos);
    };
    TodoList.prototype.edit = function (todo) {
        var newState = this.state;
        newState.editing = todo.id;
        this.setState(newState);
    };
    TodoList.prototype.save = function (todoToSave, text) {
        var newTodos = TodoModel_1.TodoModel.save(this.state.todos, todoToSave, text);
        var newState = this.state;
        newState.editing = null;
        newState.todos = newTodos;
        this.setState(newState);
    };
    TodoList.prototype.cancel = function () {
        var newState = this.state;
        newState.editing = null;
        this.setState(newState);
    };
    TodoList.prototype.clearCompleted = function () {
        var newTodos = TodoModel_1.TodoModel.clearCompleted(this.state.todos);
        this.setTodos(newTodos);
    };
    TodoList.prototype.setTodos = function (todos) {
        var newState = this.state;
        newState['todos'] = todos;
        this.setState(newState);
    };
    TodoList.prototype.render = function () {
        var _this = this;
        var footer;
        var main;
        var todos = this.state.todos;
        var shownTodos = todos.filter(function (todo) {
            switch (_this.state.nowShowing) {
                case constants_1.ACTIVE_TODOS:
                    return !todo.completed;
                case constants_1.COMPLETED_TODOS:
                    return todo.completed;
                case constants_1.IN_PROGRESS_TODOS:
                    return TodoModel_1.TodoModel.isInProgress(todo);
                default:
                    return true;
            }
        });
        shownTodos = shownTodos.sort(function (todo1, todo2) {
            if (TodoModel_1.TodoModel.isInProgress(todo1) === TodoModel_1.TodoModel.isInProgress(todo2)) {
                if (todo1.retries > todo2.retries) {
                    return -1;
                }
                else if (todo1.retries === todo2.retries) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            if (TodoModel_1.TodoModel.isInProgress(todo1) && !TodoModel_1.TodoModel.isInProgress(todo2)) {
                return -1;
            }
            return 1;
        });
        var todoItems = shownTodos.map(function (todo) {
            return (React.createElement(TodoItem_1.TodoItem, {key: todo.id, todo: todo, onToggleCompleted: _this.toggleCompleted.bind(_this, todo), onDestroy: _this.destroy.bind(_this, todo), onEdit: _this.edit.bind(_this, todo), editing: _this.state.editing === todo.id, inProgress: TodoModel_1.TodoModel.isInProgress(todo), onSave: _this.save.bind(_this, todo), onCancel: function (e) { return _this.cancel(); }, onToggleInProgress: _this.toggleInProgress.bind(_this, todo)}));
        });
        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
        var completedCount = todos.length - activeTodoCount;
        var that = this;
        var inProgressTodoCount = todos.reduce(function (accum, todo) {
            return TodoModel_1.TodoModel.isInProgress(todo) ? accum : accum + 1;
        }, 0);
        var inProgressCount = todos.length - inProgressTodoCount;
        if (activeTodoCount || completedCount || inProgressCount) {
            footer =
                React.createElement(TodoFooter_1.TodoFooter, {count: activeTodoCount, completedCount: completedCount, inProgressCount: inProgressCount, nowShowing: this.state.nowShowing, onClearCompleted: function (e) { return _this.clearCompleted(); }});
        }
        if (todos.length) {
            main = (React.createElement("section", {className: "main"}, React.createElement("input", {className: "toggle-all", type: "checkbox", onChange: function (e) { return _this.toggleAllCompleted(e); }, checked: activeTodoCount === 0}), React.createElement("ul", {className: "todo-list"}, todoItems)));
        }
        return (React.createElement("div", null, React.createElement("header", {className: "header"}, React.createElement("h1", null, "encore"), React.createElement("input", {ref: "newField", className: "new-todo", placeholder: "What needs to be done?", onKeyDown: function (e) { return _this.handleNewTodoKeyDown(e); }, autoFocus: true})), main, footer));
    };
    return TodoList;
}(React.Component));
exports.TodoList = TodoList;
