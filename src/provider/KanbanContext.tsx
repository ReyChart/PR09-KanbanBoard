import { createContext, useState, FunctionComponent, ReactNode } from 'react';
import uuid from 'react-uuid';

export interface ITask {
  id: string;
  title: string;
  state: 'backlog' | 'ready' | 'in-progress' | 'finished';
}

interface KanbanContextProps {
  tasks: ITask[];
  addTask: (title: string, state: ITask['state']) => void;
  removeTask: (id: string) => void;
}

export const KanbanContext = createContext<KanbanContextProps>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
});

export const KanbanProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const loadedTasks = localStorage.getItem('kanban-tasks');

    return loadedTasks ? JSON.parse(loadedTasks) : [];
  });

  const addTask = (title: string, state: ITask['state'] = 'backlog') => {
    const newTask: ITask = {
      id: uuid(),
      title: title,
      state: state,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('kanban-tasks', JSON.stringify(updatedTasks));
  };

  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('kanban-tasks', JSON.stringify(updatedTasks));
  };

  return (
    <KanbanContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </KanbanContext.Provider>
  );
};
