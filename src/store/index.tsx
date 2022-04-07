import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';
import { storeTasks, retrieveTasks } from './storage';

type Action = {
  type: 'addTask' | 'setTasks';
  [extraProps: string]: any;
};
type Dispatch = (action: Action) => void;
type State = { tasks: Task[] };
type ProviderProps = { children: React.ReactNode };

const TaskContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const initialState: State = { tasks: [] };

function taskReducer(state: State, action: Action) {
  switch (action.type) {
    case 'addTask': {
      const { title, description } = action.payload;
      const newTasks: Task[] = [
        {
          id: uuidv4(),
          title,
          description,
          status: 'ToDo',
          history: [],
        },
        ...state.tasks,
      ];

      storeTasks(newTasks);

      return { tasks: newTasks };
    }
    case 'setTasks': {
      return { tasks: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

export function TaskProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(taskReducer, initialState);

  React.useEffect(() => {
    const tasks = retrieveTasks();
    dispatch({ type: 'setTasks', payload: tasks });
  }, []);

  const value = { state, dispatch };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = React.useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
}

export function useSelector(selector: (state: State) => any) {
  const { state } = useTaskContext();
  return selector(state);
}

export function useDispatch(): Dispatch {
  const { dispatch } = useTaskContext();
  return dispatch;
}