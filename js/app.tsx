/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts"/>

declare var Router;

import { TodoModel } from "./todoModel";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, IN_PROGRESS_TODOS, ENTER_KEY } from "./constants";

class TodoApp extends React.Component<IAppProps, IAppState> {

  public state : IAppState;

  constructor(props : IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null
    };
  }

  public componentDidMount() {
    var setState = this.setState;
    var router = Router({
      '/': setState.bind(this, {nowShowing: ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
      '/inProgress': setState.bind(this, {nowShowing: IN_PROGRESS_TODOS}),
      '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
    });
    router.init('/');
  }

  public handleNewTodoKeyDown(event : __React.KeyboardEvent) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = React.findDOMNode<HTMLInputElement>(this.refs["newField"]).value.trim();

    if (val) {
      this.props.model.addTodo(val);
      React.findDOMNode<HTMLInputElement>(this.refs["newField"]).value = '';
    }
  }

  public toggleAllCompleted(event : __React.FormEvent) {
    var target : any = event.target;
    var checked = target.checked;
    this.props.model.toggleAllCompleted(checked);
  }

  public toggleCompleted(todoToToggle : ITodo) {
    this.props.model.toggleCompleted(todoToToggle);
  }

  public destroy(todo : ITodo) {
    this.props.model.destroy(todo);
  }

  public toggleInProgress(todo : ITodo) {
    this.props.model.toggleInProgress(todo);
  }

  public edit(todo : ITodo) {
    var newState = this.state;
    newState.editing = todo.id;
    this.setState(newState);
  }

  public save(todoToSave : ITodo, text : String) {
    this.props.model.save(todoToSave, text);
    var newState = this.state;
    newState.editing = null;
    this.setState(newState);
  }

  public cancel() {
    var newState = this.state;
    newState.editing = null;
    this.setState(newState);
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    var footer;
    var main;
    const todos = this.props.model.todos;

    var shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      case IN_PROGRESS_TODOS:
        return this.props.model.isInProgress(todo);
      default:
        return true;
      }
    });

    shownTodos = shownTodos.sort((todo1, todo2) => {
        if (this.props.model.isInProgress(todo1) === this.props.model.isInProgress(todo2)) {
          if (todo1.retries > todo2.retries) {
            return -1;
          } else if (todo1.retries === todo2.retries){
            return 0;
          } else {
            return 1;
          }
        }
        
        if (this.props.model.isInProgress(todo1) && !this.props.model.isInProgress(todo2)) {
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
          inProgress={this.props.model.isInProgress(todo)}
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
      return that.props.model.isInProgress(todo) ? accum : accum + 1;
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

var model = new TodoModel('react-todos');

function render() {
  React.render(
    <TodoApp model={model}/>,
    document.getElementsByClassName('todoapp')[0]
  );
}

model.subscribe(render);
render();
