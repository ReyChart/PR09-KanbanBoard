import { FunctionComponent, useMemo } from 'react';
import Layout from '../Layout/Layout';
import { useKanban } from '../../hooks/useKanban';
import TaskColumn from '../TaskColumn/TaskColumn';

import styles from './TaskList.module.scss';

const TaskList: FunctionComponent = () => {
  const { tasks, addTask } = useKanban();

  const { backlogTasks, readyTasks, inProgressTasks, finishedTasks } = useMemo(() => {
    return {
      backlogTasks: tasks.filter((task) => task.state === 'backlog'),
      readyTasks: tasks.filter((task) => task.state === 'ready'),
      inProgressTasks: tasks.filter((task) => task.state === 'in progress'),
      finishedTasks: tasks.filter((task) => task.state === 'finished'),
    };
  }, [tasks]);

  const { addBacklogTask, addReadyTask, addInProgressTask, addFinishedTask } = useMemo(() => {
    return {
      addBacklogTask: (title: string) => addTask(title, 'backlog'),
      addReadyTask: (title: string) => addTask(title, 'ready'),
      addInProgressTask: (title: string) => addTask(title, 'in progress'),
      addFinishedTask: (title: string) => addTask(title, 'finished'),
    };
  }, [addTask]);

  return (
    <Layout>
      <main>
        <div className="container">
          <section className={styles.taskList}>
            <TaskColumn title="Backlog" tasks={backlogTasks} addTaskFunction={addBacklogTask} />
            <TaskColumn
              title="Ready"
              tasks={readyTasks}
              addTaskFunction={addReadyTask}
              availableTasks={backlogTasks}
            />
            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
              addTaskFunction={addInProgressTask}
              availableTasks={readyTasks}
            />
            <TaskColumn
              title="Finished"
              tasks={finishedTasks}
              addTaskFunction={addFinishedTask}
              availableTasks={inProgressTasks}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default TaskList;
