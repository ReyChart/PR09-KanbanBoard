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
  description: string;
  state: 'backlog' | 'ready' | 'in progress' | 'finished';
}

interface IKanbanContextProps {
  tasks: ITask[];
  addTask: (title: string, state: ITask['state']) => void;
  removeTask: (id: string) => void;
  transferTask: (id: string, newState: ITask['state']) => void;
  updateTaskDescription: (id: string, description: string) => void;
}

export const KanbanContext = createContext<IKanbanContextProps>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  transferTask: () => {},
  updateTaskDescription: () => {},
});

export const KanbanProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const loadedTasks = localStorage.getItem('kanban-tasks');
    return loadedTasks ? JSON.parse(loadedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (title: string, state: ITask['state'] = 'backlog', description: string = ''): void => {
      const newTask: ITask = {
        id: uuid(),
        title,
        description,
        state,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    []
  );

  const removeTask = useCallback((id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const transferTask = useCallback((id: string, newState: ITask['state']): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, state: newState } : task))
    );
  }, []);

  const updateTaskDescription = useCallback((id: string, description: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, description };
        }
        return task;
      })
    );
  }, []);

  return (
    <KanbanContext.Provider
      value={{ tasks, addTask, removeTask, transferTask, updateTaskDescription }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
