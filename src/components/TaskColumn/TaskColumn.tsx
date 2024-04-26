import { FunctionComponent, useState, useMemo, useCallback } from 'react';
import { ITask } from '../../provider/KanbanContext';
import { useKanban } from '../../hooks/useKanban';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import Button from '../UI/Button/Button';
import InputField from '../UI/InputField/InputField';
import Select from 'react-select';

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
    <div className={styles.taskColumn}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Link
          key={task.id}
          className={styles.taskColumn__link}
          to={`/PR09-KanbanBoard/tasks/${task.id}`}
        >
          <div>
            <p>{task.title}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeTask(task.id);
              }}
            >
              <FiX />
            </button>
          </div>
        </Link>
      ))}
      <form className={styles.taskColumn__form} onSubmit={handleSubmit}>
        {addingTask && (
          <>
            {title === 'Backlog' ? (
              <InputField
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
          <Button
            onClick={shouldShowSubmit ? handleSubmitNewTask : handleAddTaskClick}
            disabled={shouldShowSubmit ? false : addButtonDisabled}
            variant={shouldShowSubmit ? 'submit' : 'add'}
          >
            {shouldShowSubmit ? 'Submit' : '+ Add card'}
          </Button>
          {addingTask && (
            <Button onClick={handleCancel} variant="cancel">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskColumn;
