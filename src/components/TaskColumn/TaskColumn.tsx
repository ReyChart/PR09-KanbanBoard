import { FunctionComponent, useState, useMemo, useCallback } from 'react';
import { ITask } from '../../provider/KanbanContext';
import { useKanban } from '../../hooks/useKanban';
import { FiX } from 'react-icons/fi';
import Select from 'react-select';
import clsx from 'clsx';

import styles from './TaskColumn.module.scss';

interface ITaskColumnProps {
  title: string;
  tasks: ITask[];
  addTaskFunction: (title: string, state: ITask['state']) => void;
  availableTasks?: ITask[];
}

interface IOptionType {
  value: string;
  label: string;
}

const TaskColumn: FunctionComponent<ITaskColumnProps> = ({
  title,
  tasks,
  addTaskFunction,
  availableTasks,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<IOptionType | null>(null);
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);
  const { removeTask, transferTask } = useKanban();

  const options = useMemo(
    () => availableTasks?.map((task) => ({ value: task.id, label: task.title })) || [],
    [availableTasks]
  );

  const { shouldShowSubmit, addButtonDisabled } = useMemo(
    () => ({
      shouldShowSubmit: (title === 'Backlog' && newTaskTitle.trim()) || selectedOption,
      addButtonDisabled:
        (title !== 'Backlog' && options.length === 0) || (title === 'Backlog' && addingTask),
    }),
    [title, newTaskTitle, selectedOption, options.length, addingTask]
  );

  const handleAddTaskClick = useCallback(() => {
    if (!addingTask) {
      setAddingTask(true);
      setAttemptedSubmit(false);
    }
  }, [addingTask]);

  const handleNewTaskTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  }, []);

  const handleSelectChange = useCallback((option: IOptionType | null) => {
    setSelectedOption(option);
  }, []);

  const handleSubmitNewTask = useCallback(() => {
    if (shouldShowSubmit) {
      const newState = title.toLowerCase() as ITask['state'];
      selectedOption
        ? transferTask(selectedOption.value, newState)
        : addTaskFunction(newTaskTitle.trim(), newState);
      setNewTaskTitle('');
      setSelectedOption(null);
      setAddingTask(false);
    }
  }, [shouldShowSubmit, title, newTaskTitle, selectedOption, addTaskFunction, transferTask]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setAttemptedSubmit(true);
      handleSubmitNewTask();
    },
    [handleSubmitNewTask]
  );

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setAddingTask(false);
    setNewTaskTitle('');
    setSelectedOption(null);
    setAttemptedSubmit(false);
  }, []);

  return (
    <div className={styles.task__column}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={styles.task__name}
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
      <form className={styles.task__form} onSubmit={handleSubmit}>
        {addingTask && (
          <>
            {title === 'Backlog' ? (
              <input
                type="text"
                value={newTaskTitle}
                onChange={handleNewTaskTitleChange}
                placeholder="Enter task title..."
              />
            ) : (
              <Select
                classNamePrefix="select"
                value={selectedOption}
                required={attemptedSubmit && !selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Select a task..."
              />
            )}
          </>
        )}
        <div className={styles.btn__wrapper}>
          <button
            onClick={shouldShowSubmit ? handleSubmitNewTask : handleAddTaskClick}
            disabled={shouldShowSubmit ? false : addButtonDisabled}
            className={clsx(styles.btn, {
              [styles.btn__submit]: shouldShowSubmit,
            })}
          >
            {shouldShowSubmit ? 'Submit' : '+ Add card'}
          </button>
          {addingTask && (
            <button onClick={handleCancel} className={clsx(styles.btn, styles.btn__cancel)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskColumn;
