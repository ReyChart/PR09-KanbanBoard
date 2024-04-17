import Layout from '../Layout/Layout';
import { useKanban } from '../../hooks/useKanban';
import TaskColumn from '../TaskColumn/TaskColumn';

import styles from './TaskList.module.scss';

const TaskList = () => {
  const { tasks, addTask } = useKanban();

  return (
    <Layout>
      <main>
        <div className="container">
          <div className={styles.task__list}>
            <TaskColumn
              title="Backlog"
              tasks={tasks.filter((task) => task.state === 'backlog')}
              addTaskFunction={(title) => addTask(title, 'backlog')}
            />
            <TaskColumn
              title="Ready"
              tasks={tasks.filter((task) => task.state === 'ready')}
              addTaskFunction={(title) => addTask(title, 'ready')}
            />
            <TaskColumn
              title="In Progress"
              tasks={tasks.filter((task) => task.state === 'in-progress')}
              addTaskFunction={(title) => addTask(title, 'in-progress')}
            />
            <TaskColumn
              title="Finished"
              tasks={tasks.filter((task) => task.state === 'finished')}
              addTaskFunction={(title) => addTask(title, 'finished')}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TaskList;
