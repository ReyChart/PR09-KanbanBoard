import {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  createContext,
  ReactNode,
} from 'react';
import uuid from 'react-uuid';

export interface ITask {
  id: string;
  title: string;
  state: 'backlog' | 'ready' | 'in progress' | 'finished';
}

interface IKanbanContextProps {
  tasks: ITask[];
  addTask: (title: string, state: ITask['state']) => void;
  removeTask: (id: string) => void;
  transferTask: (id: string, newState: ITask['state']) => void;
}

export const KanbanContext = createContext<IKanbanContextProps>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  transferTask: () => {},
});

export const KanbanProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const loadedTasks = localStorage.getItem('kanban-tasks');
    return loadedTasks ? JSON.parse(loadedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string, state: ITask['state'] = 'backlog'): void => {
    const newTask: ITask = {
      id: uuid(),
      title,
      state,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const removeTask = useCallback((id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const transferTask = useCallback((id: string, newState: ITask['state']): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, state: newState } : task))
    );
  }, []);

  return (
    <KanbanContext.Provider value={{ tasks, addTask, removeTask, transferTask }}>
      {children}
    </KanbanContext.Provider>
  );
};
