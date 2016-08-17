interface ITodo {
  id: string,
  title: string,
  inProgressDate: Date,
  completed: boolean,
  retries: number,
}

interface ITodoItemProps {
  key : string,
  todo : ITodo;
  editing? : boolean;
  inProgress?: boolean;
  onSave: (val: any) => void;
  onDestroy: () => void;
  onToggleInProgress: () => void;
  onEdit: ()  => void;
  onCancel: (event : any) => void;
  onToggleCompleted: () => void;
}

interface ITodoItemState {
  editText : string
}

interface ITodoFooterProps {
  completedCount : number;
  inProgressCount: number;
  onClearCompleted : any;
  nowShowing : string;
  count : number;
}

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

interface IAppProps {
  model : ITodoModel;
}

interface IAppState {
  editing? : string;
  nowShowing? : string
}
