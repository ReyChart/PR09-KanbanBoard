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
              availableTasks={tasks.filter((task) => task.state === 'backlog')}
            />
            <TaskColumn
              title="In Progress"
              tasks={tasks.filter((task) => task.state === 'in progress')}
              addTaskFunction={(title) => addTask(title, 'in progress')}
              availableTasks={tasks.filter((task) => task.state === 'ready')}
            />
            <TaskColumn
              title="Finished"
              tasks={tasks.filter((task) => task.state === 'finished')}
              addTaskFunction={(title) => addTask(title, 'finished')}
              availableTasks={tasks.filter((task) => task.state === 'in progress')}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TaskList;
