import { FunctionComponent } from 'react';
import TaskList from '../components/TaskList/TaskList';
import TaskDetails from '../components/TaskDetails/TaskDetails';

interface IRoutes {
  path: string;
  component: FunctionComponent;
}

export const routes: IRoutes[] = [
  {
    path: '/PR09-KanbanBoard',
    component: TaskList,
  },
  {
    path: '/PR09-KanbanBoard/tasks/:id',
    component: TaskDetails,
  },
];
