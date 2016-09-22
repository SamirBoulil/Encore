/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import { Utils } from "../utils/firebase-utils"

class TodoModel {
  public static addTodo(todos: Array<ITodo>, title : string) : Array<ITodo> {
    todos = todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false,
      inProgressDate: null,
      retries: 0
    });
    return todos;
  }

  public static toggleAllCompleted(todos: Array<ITodo>, checked : Boolean) {
    todos = todos.map<ITodo>((todo : ITodo) => {
      return Utils.extend({}, todo, {completed: checked});
    });

    return todos;
  }

  public static toggleCompleted(todos: Array<ITodo>, todoToToggleCompleted : ITodo) : Array<ITodo> {
    todos = todos.map<ITodo>((todo : ITodo) => {
      return todo !== todoToToggleCompleted ?
      todo :
      Utils.extend({}, todo, {completed: !todo.completed});
    });

    return todos;
  }

  public static destroy(todos: Array<ITodo>, todo : ITodo) : Array<ITodo> {
    todos = todos.filter(function(candidate) {
      return candidate !== todo;
    });

    return todos;
  }

  public static toggleInProgress(todos: Array<ITodo>, todoToToggleInProgress : ITodo) : Array<ITodo> {
    todos = todos.map<ITodo>((todo : ITodo) => {
      if (todo === todoToToggleInProgress && !todo.completed) {
        var newInProgressDate = !this.isInProgress(todo) ? new Date() : null;
        return Utils.extend({}, todo, {inProgressDate: newInProgressDate});
      } else {
        return todo;
      }
    });

    return todos;
  }

  public static save(todos: Array<ITodo>, todoToSave : ITodo, text : string) : Array<ITodo> {
    todos = todos.map(function(todo) {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
    });

    return todos;
  }

  public static clearCompleted(todos: Array<ITodo>) : Array<ITodo> {
    todos = todos.filter(function(todo) {
      return !todo.completed;
    });

    return todos;
  }

  public static isInProgress(todo : ITodo) : boolean{
    if (todo.inProgressDate === null
      || typeof(todo.inProgressDate) === 'undefined'
      || todo.completed === true) {
      return false;
    }
    var timeDiff = Math.abs(new Date().getTime() - new Date(todo.inProgressDate.toString()).getTime());
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    return diffDays === 0;
  }

  public static refreshTodos(todos: Array<ITodo>) : Array<ITodo> {
    todos = todos.map((todo) => {
      if (!this.isInProgress(todo) && todo.inProgressDate !== null && typeof(todo.inProgressDate) !== 'undefined') {
        var timeDiff = Math.abs(new Date().getTime() - new Date(todo.inProgressDate.toString()).getTime());
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        var newRetry = (todo.retries + diffDays) % 7;

        return Utils.extend({}, todo, {retries: newRetry, inProgressDate: null});
      }

      return todo;
    });

    return todos;
  }

  public static sortTodos(todos: Array<ITodo>) : Array<ITodo> {
    return todos.sort((todo1, todo2) => {
      if (todo1.retries > todo2.retries) {
        return -1;
      } else if (todo1.retries === todo2.retries){
        return 0;
      } else {
        return 1;
      }
    });
  }
}

export { TodoModel };
