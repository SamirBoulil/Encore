interface IAppProps {
  route: any;
  model: ITodoModel;
}

interface IAppState {
  editing? : string;
  nowShowing? : string;
  todos?: Array<ITodo>;
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
