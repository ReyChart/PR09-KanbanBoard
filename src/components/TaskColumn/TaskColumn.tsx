import { ChangeEvent, FunctionComponent, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { ITask } from '../../provider/KanbanContext';
import { useKanban } from '../../hooks/useKanban';
import clsx from 'clsx';
import { FiX } from 'react-icons/fi';
import styles from './TaskColumn.module.scss';

interface TaskColumnProps {
  title: string;
  tasks: ITask[];
  addTaskFunction: (title: string, state: ITask['state']) => void;
  availableTasks?: ITask[];
}

interface OptionType {
  value: string;
  label: string;
}

const TaskColumn: FunctionComponent<TaskColumnProps> = ({
  title,
  tasks,
  addTaskFunction,
  availableTasks,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const { removeTask, transferTask } = useKanban();

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleNewTaskTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };

  const handleSubmitNewTask = () => {
    if (title === 'Backlog' && newTaskTitle.trim() !== '') {
      addTaskFunction(newTaskTitle.trim(), 'backlog');
      setNewTaskTitle('');
      setIsAddingTask(false);
    } else if (selectedOption) {
      transferTask(selectedOption.value, title.toLowerCase() as ITask['state']);
      setSelectedOption(null);
      setIsAddingTask(false);
    }
  };

  const options: OptionType[] =
    availableTasks?.map((task) => ({
      value: task.id,
      label: task.title,
    })) || [];

  const addButtonDisabled = title !== 'Backlog' && !options.length;

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
          {title === 'Backlog' ? (
            <input
              type="text"
              value={newTaskTitle}
              onChange={handleNewTaskTitleChange}
              placeholder="Enter task title..."
              className={styles.input}
            />
          ) : (
            <Select
              className={styles.selector}
              value={selectedOption}
              onChange={handleChange}
              options={options}
              placeholder="Select a task..."
            />
          )}
          <button
            onClick={handleSubmitNewTask}
            disabled={!newTaskTitle.trim() && !selectedOption}
            className={clsx(styles.button, {
              [styles.btn__add_disabled]: addButtonDisabled,
              [styles.btn__submit]: newTaskTitle.trim() || selectedOption,
            })}
          >
            Submit
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddTaskClick}
          className={clsx(styles.btn__add, { [styles.btn__add_disabled]: addButtonDisabled })}
          disabled={addButtonDisabled}
        >
          + Add card
        </button>
      )}
    </div>
  );
};

export default TaskColumn;
