"use strict";
var firebase_utils_1 = require("../utils/firebase-utils");
var TodoModel = (function () {
    function TodoModel() {
    }
    TodoModel.addTodo = function (todos, title) {
        todos = todos.concat({
            id: firebase_utils_1.Utils.uuid(),
            title: title,
            completed: false,
            inProgressDate: null,
            retries: 0
        });
        return todos;
    };
    TodoModel.toggleAllCompleted = function (todos, checked) {
        todos = todos.map(function (todo) {
            return firebase_utils_1.Utils.extend({}, todo, { completed: checked });
        });
        return todos;
    };
    TodoModel.toggleCompleted = function (todos, todoToToggleCompleted) {
        todos = todos.map(function (todo) {
            return todo !== todoToToggleCompleted ?
                todo :
                firebase_utils_1.Utils.extend({}, todo, { completed: !todo.completed });
        });
        return todos;
    };
    TodoModel.destroy = function (todos, todo) {
        todos = todos.filter(function (candidate) {
            return candidate !== todo;
        });
        return todos;
    };
    TodoModel.toggleInProgress = function (todos, todoToToggleInProgress) {
        var _this = this;
        todos = todos.map(function (todo) {
            if (todo === todoToToggleInProgress && !todo.completed) {
                var newInProgressDate = !_this.isInProgress(todo) ? new Date() : null;
                return firebase_utils_1.Utils.extend({}, todo, { inProgressDate: newInProgressDate });
            }
            else {
                return todo;
            }
        });
        return todos;
    };
    TodoModel.save = function (todos, todoToSave, text) {
        todos = todos.map(function (todo) {
            return todo !== todoToSave ? todo : firebase_utils_1.Utils.extend({}, todo, { title: text });
        });
        return todos;
    };
    TodoModel.clearCompleted = function (todos) {
        todos = todos.filter(function (todo) {
            return !todo.completed;
        });
        return todos;
    };
    TodoModel.isInProgress = function (todo) {
        if (todo.inProgressDate === null) {
            return false;
        }
        var today = new Date();
        var todoInProgressDate = new Date(todo.inProgressDate.toString());
        return todoInProgressDate.getFullYear() === today.getFullYear() &&
            todoInProgressDate.getMonth() === today.getMonth() &&
            todoInProgressDate.getDate() === today.getDate();
    };
    TodoModel.refreshTodos = function (todos) {
        var _this = this;
        todos = todos.map(function (todo) {
            if (!_this.isInProgress(todo) && todo.inProgressDate !== null) {
                var newRetry = todo.retries + 1;
                return firebase_utils_1.Utils.extend({}, todo, { retries: newRetry, inProgressDate: null });
            }
            return todo;
        });
        return todos;
    };
    return TodoModel;
}());
exports.TodoModel = TodoModel;
