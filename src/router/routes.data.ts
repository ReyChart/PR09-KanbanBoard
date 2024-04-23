import { FunctionComponent } from 'react';
import TaskList from '../components/TaskList/TaskList';
import TaskDetails from '../components/TaskDetails/TaskDetails';

interface IRoutes {
  path: string;
  component: FunctionComponent;
}

export const routes: IRoutes[] = [
  {
    path: '/',
    component: TaskList,
  },
  {
    path: '/tasks/:id',
    component: TaskDetails,
  },
];
