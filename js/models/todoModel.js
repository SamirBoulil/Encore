"use strict";
var utils_1 = require("../utils//utils");
var TodoModel = (function () {
    function TodoModel(key) {
        this.key = key;
        this.todos = utils_1.Utils.store(key);
        this.onChanges = [];
        this.refreshTodos();
    }
    TodoModel.prototype.subscribe = function (onChange) {
        this.onChanges.push(onChange);
    };
    TodoModel.prototype.inform = function () {
        utils_1.Utils.store(this.key, this.todos);
        this.onChanges.forEach(function (cb) { cb(); });
    };
    TodoModel.prototype.addTodo = function (title) {
        this.todos = this.todos.concat({
            id: utils_1.Utils.uuid(),
            title: title,
            completed: false,
            inProgressDate: null,
            retries: 0
        });
        this.inform();
    };
    TodoModel.prototype.toggleAllCompleted = function (checked) {
        this.todos = this.todos.map(function (todo) {
            return utils_1.Utils.extend({}, todo, { completed: checked });
        });
        this.inform();
    };
    TodoModel.prototype.toggleCompleted = function (todoToToggleCompleted) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToToggleCompleted ?
                todo :
                utils_1.Utils.extend({}, todo, { completed: !todo.completed });
        });
        this.inform();
    };
    TodoModel.prototype.destroy = function (todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        });
        this.inform();
    };
    TodoModel.prototype.toggleInProgress = function (todoToToggleInProgress) {
        var that = this;
        this.todos = this.todos.map(function (todo) {
            if (todo === todoToToggleInProgress && !todo.completed) {
                var newInProgressDate = !that.isInProgress(todo) ? new Date() : null;
                return utils_1.Utils.extend({}, todo, { inProgressDate: newInProgressDate });
            }
            else {
                return todo;
            }
        });
        this.inform();
    };
    TodoModel.prototype.save = function (todoToSave, text) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToSave ? todo : utils_1.Utils.extend({}, todo, { title: text });
        });
        this.inform();
    };
    TodoModel.prototype.clearCompleted = function () {
        this.todos = this.todos.filter(function (todo) {
            return !todo.completed;
        });
        this.inform();
    };
    TodoModel.prototype.isInProgress = function (todo) {
        if (todo.inProgressDate === null) {
            return false;
        }
        var today = new Date();
        var todoInProgressDate = new Date(todo.inProgressDate.toString());
        return todoInProgressDate.getFullYear() === today.getFullYear() &&
            todoInProgressDate.getMonth() === today.getMonth() &&
            todoInProgressDate.getDate() === today.getDate();
    };
    TodoModel.prototype.refreshTodos = function () {
        var _this = this;
        this.todos = this.todos.map(function (todo) {
            if (!_this.isInProgress(todo) && todo.inProgressDate !== null) {
                var newRetry = todo.retries + 1;
                return utils_1.Utils.extend({}, todo, { retries: newRetry, inProgressDate: null });
            }
            return todo;
        });
        this.inform();
    };
    return TodoModel;
}());
exports.TodoModel = TodoModel;
