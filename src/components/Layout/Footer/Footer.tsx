import { FunctionComponent } from 'react';
import { useKanban } from '../../../hooks/useKanban';
import { user } from '../../../data/user.data';

import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  const { tasks } = useKanban();

  const activeTasksCount = tasks.filter((task) => task.state === 'backlog').length;
  const finishedTasksCount = tasks.filter((task) => task.state === 'finished').length;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div>
          <p>Active tasks: {activeTasksCount}</p>
          <p>Finished tasks: {finishedTasksCount}</p>
        </div>
        <p>
          Kanban board by {user.name}, <span>{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
