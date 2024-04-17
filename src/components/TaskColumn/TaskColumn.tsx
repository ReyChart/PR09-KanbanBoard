import { ChangeEvent, FunctionComponent, useState } from 'react';
import { ITask } from '../../provider/KanbanContext';
import { useKanban } from '../../hooks/useKanban';
import clsx from 'clsx';
import { FiX } from 'react-icons/fi';

import styles from './TaskColumn.module.scss';

interface TaskColumnProps {
  title: string;
  tasks: ITask[];
  addTaskFunction: (title: string, state: ITask['state']) => void;
}

const TaskColumn: FunctionComponent<TaskColumnProps> = ({ title, tasks, addTaskFunction }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const { removeTask } = useKanban();

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleNewTaskTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleSubmitNewTask = () => {
    if (newTaskTitle.trim() !== '') {
      let state: ITask['state'];
      switch (title) {
        case 'Backlog':
          state = 'backlog';
          break;
        case 'Ready':
          state = 'ready';
          break;
        case 'In Progress':
          state = 'in-progress';
          break;
        case 'Finished':
          state = 'finished';
          break;
        default:
          console.error('Invalid title for task state');
          return;
      }

      addTaskFunction(newTaskTitle.trim(), state);
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const buttonClass = clsx(styles.button, {
    [styles.btn__add_disabled]: !newTaskTitle.trim() && isAddingTask,
    [styles.btn__submit]: newTaskTitle.trim(),
  });

  return (
    <div className={styles.task__column}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={styles.task}
          onMouseEnter={() => setHoveredTaskId(task.id)}
          onMouseLeave={() => setHoveredTaskId(null)}
        >
          {task.title}
          {hoveredTaskId === task.id && (
            <button onClick={() => removeTask(task.id)}>
              <FiX />
            </button>
          )}
        </div>
      ))}
      {isAddingTask ? (
        <div className={styles.task__add}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={handleNewTaskTitleChange}
            placeholder="Enter task title..."
          />
          <button
            onClick={handleSubmitNewTask}
            disabled={!newTaskTitle.trim()}
            className={buttonClass}
          >
            {newTaskTitle.trim() ? 'Submit' : '+ Add card'}
          </button>
        </div>
      ) : (
        <button onClick={handleAddTaskClick} className={styles.btn__add}>
          + Add card
        </button>
      )}
    </div>
  );
};

export default TaskColumn;
