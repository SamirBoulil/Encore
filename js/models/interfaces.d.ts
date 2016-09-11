interface ITodoModel {
  key : any;
  todos : Array<ITodo>;
  onChanges : Array<any>;
  subscribe(onChange);
  inform();
  addTodo(title : string);
  toggleAllCompleted(checked);
  toggleCompleted(todoToToggleCompleted);
  destroy(todo);
  toggleInProgress(todoToToggleInProgress);
  save(todoToSave, text);
  clearCompleted();
  isInProgress(todoToKnowIfInProgress);
  refreshTodos();
}

interface ITodo {
  id: string,
  title: string,
  inProgressDate: Date,
  completed: boolean,
  retries: number,
}
