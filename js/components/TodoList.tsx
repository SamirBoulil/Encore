/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import * as React from "react";
import * as ReactDom from "react-dom";
import { TodoModel } from "../models/TodoModel";
import { TodoFooter } from "./TodoFooter";
import { TodoItem } from "./TodoItem";
import { Utils } from "../utils/firebase-utils";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, IN_PROGRESS_TODOS, ENTER_KEY } from "../config/constants";

class TodoList extends React.Component<IAppProps, IAppState> {

  public state : IAppState;

  constructor(props : any) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      todos: []
    };
  }
  public componentWillMount() {
    Utils.getValues('').then((newTodos) => {
      this.setTodos(newTodos);
    });
  }

  public componentDidMount() {
    // var router = Router({
    //   '/': setState.bind(this, {nowShowing: ALL_TODOS}),
    //   '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
    //   '/inProgress': setState.bind(this, {nowShowing: IN_PROGRESS_TODOS}),
    //   '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
    // });
    // router.init('/');
  }

  public componentDidUpdate() {
    this.state.todos.map((todo) => {
      Utils.storeValue(todo);
    });
  }

  public handleNewTodoKeyDown(event : React.KeyboardEvent) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = ReactDom.findDOMNode<HTMLInputElement>(this.refs["newField"]).value.trim();

    if (val) {
      ReactDom.findDOMNode<HTMLInputElement>(this.refs["newField"]).value = '';

      let newTodos = TodoModel.addTodo(this.state.todos, val);
      this.setTodos(newTodos);
    }
  }

  public toggleAllCompleted(event : React.FormEvent) {
    var target : any = event.target;
    var checked = target.checked;
    let newTodos = TodoModel.toggleAllCompleted(this.state.todos, checked);
    this.setTodos(newTodos);
  }

  public toggleCompleted(todoToToggle : ITodo) {
    let newTodos = TodoModel.toggleCompleted(this.state.todos, todoToToggle);
    this.setTodos(newTodos);
  }

  public destroy(todo : ITodo) {
    let newTodos = TodoModel.destroy(this.state.todos, todo);
    this.setTodos(newTodos);
  }

  public toggleInProgress(todo : ITodo) {
    let newTodos = TodoModel.toggleInProgress(this.state.todos, todo);
    this.setTodos(newTodos);
  }

  public edit(todo : ITodo) {
    var newState = this.state;
    newState.editing = todo.id;
    this.setState(newState);
  }

  public save(todoToSave : ITodo, text : string) {
    let newTodos = TodoModel.save(this.state.todos, todoToSave, text);
    var newState = this.state;
    newState.editing = null;
    newState.todos = newTodos;
    this.setState(newState);
  }

  public cancel() {
    var newState = this.state;
    newState.editing = null;
    this.setState(newState);
  }

  public clearCompleted() {
    let newTodos = TodoModel.clearCompleted(this.state.todos);
    this.setTodos(newTodos);
  }

  public setTodos(todos: Array<ITodo>) : void {
    let newState = this.state;
    newState['todos'] = todos;
    this.setState(newState);
  }

  public render() {
    var footer;
    var main;
    const todos = this.state.todos;

    var shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      case IN_PROGRESS_TODOS:
        return TodoModel.isInProgress(todo);
      default:
        return true;
      }
    });

    shownTodos = shownTodos.sort((todo1, todo2) => {
        if (TodoModel.isInProgress(todo1) === TodoModel.isInProgress(todo2)) {
          if (todo1.retries > todo2.retries) {
            return -1;
          } else if (todo1.retries === todo2.retries){
            return 0;
          } else {
            return 1;
          }
        }

        if (TodoModel.isInProgress(todo1) && !TodoModel.isInProgress(todo2)) {
          return -1;
        }

        return 1;
    });

    var todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={this.toggleCompleted.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          inProgress={TodoModel.isInProgress(todo)}
          onSave={this.save.bind(this, todo)}
          onCancel={ e => this.cancel() }
          onToggleInProgress={this.toggleInProgress.bind(this, todo)}
        />
      );
    });

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    var that = this;
    var inProgressTodoCount = todos.reduce(function (accum, todo) {
      return TodoModel.isInProgress(todo) ? accum : accum + 1;
    }, 0);
    var inProgressCount = todos.length - inProgressTodoCount;

    if (activeTodoCount || completedCount || inProgressCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={ e=> this.clearCompleted() }
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={ e => this.toggleAllCompleted(e) }
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>encore</h1>
          <input
            ref="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={ e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}

export {TodoList};
