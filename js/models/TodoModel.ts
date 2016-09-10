/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import { Utils } from "../utils/firebase-utils";

// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
class TodoModel implements ITodoModel {

  public key : string;
  public todos : Array<ITodo>;
  public onChanges : Array<any>;

  constructor(key) {
    this.onChanges = [];
    this.key = key;
    Utils.getValues('').then((values) => {
        console.log('Values retrieved from firebase');
        console.log(values);
        this.todos = values;
        this.refreshTodos();
    });
  }

  public getValues(todo: any) {
    this.todos = todo;
  }

  public subscribe(onChange) {
    this.onChanges.push(onChange);
  }

  public inform() {
    console.log('informing every one model is updated');
    var self = this;
    Utils.store('', this.todos).then(function (values) {
      self.onChanges.forEach(function (cb) { cb(); });
    });
  }

  public addTodo(title : string) {
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false,
      inProgressDate: null,
      retries: 0
    });

    this.inform();
  }

  public toggleAllCompleted(checked : Boolean) {
    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    this.todos = this.todos.map<ITodo>((todo : ITodo) => {
      return Utils.extend({}, todo, {completed: checked});
    });

    this.inform();
  }

  public toggleCompleted(todoToToggleCompleted : ITodo) {
    this.todos = this.todos.map<ITodo>((todo : ITodo) => {
      return todo !== todoToToggleCompleted ?
        todo :
        Utils.extend({}, todo, {completed: !todo.completed});
    });

    this.inform();
  }

  public destroy(todo : ITodo) {
    this.todos = this.todos.filter(function (candidate) {
      return candidate !== todo;
    });

    this.inform();
  }

  public toggleInProgress(todoToToggleInProgress : ITodo) {
    var that = this;
    this.todos = this.todos.map<ITodo>((todo : ITodo) => {
      if (todo === todoToToggleInProgress && !todo.completed) {
        var newInProgressDate = !that.isInProgress(todo) ? new Date() : null;
        return Utils.extend({}, todo, {inProgressDate: newInProgressDate});
      } else {
        return todo;
      }
    });

    this.inform();
  }

  public save(todoToSave : ITodo, text : string) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
    });

    this.inform();
  }

  public clearCompleted() {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });

    this.inform();
  }

  public isInProgress(todo : ITodo) {
    if (todo.inProgressDate === null) {
      return false;
    }

    var today = new Date();
    var todoInProgressDate = new Date(todo.inProgressDate.toString());

    return todoInProgressDate.getFullYear() === today.getFullYear() &&
        todoInProgressDate.getMonth() === today.getMonth() &&
        todoInProgressDate.getDate() === today.getDate();
  }

  public refreshTodos() {
    this.todos = this.todos.map((todo) => {
      if (!this.isInProgress(todo) && todo.inProgressDate !== null) {
        var newRetry = todo.retries + 1 ;
        return Utils.extend({}, todo, {retries: newRetry, inProgressDate: null});
      }

      return todo;
    });

    this.inform();
  }
}

export { TodoModel };
