import { FunctionComponent, useMemo } from 'react';
import { useKanban } from '../../../hooks/useKanban';
import { user } from '../../../data/user.data';

import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  const { tasks } = useKanban();

  const { activeTasksCount, finishedTasksCount } = useMemo(() => {
    const activeTasks = tasks.filter((task) => task.state === 'backlog').length;
    const finishedTasks = tasks.filter((task) => task.state === 'finished').length;

    return { activeTasksCount: activeTasks, finishedTasksCount: finishedTasks };
  }, [tasks]);

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
