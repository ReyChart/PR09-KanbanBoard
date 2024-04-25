import { FunctionComponent, useState, useCallback, useMemo, useEffect } from 'react';
import { useKanban } from '../../hooks/useKanban';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ReactTextareaAutosize from 'react-textarea-autosize';
import Button from '../UI/Button/Button';
import { IoMdClose } from 'react-icons/io';

import styles from './TaskDetails.module.scss';

const TaskDetails: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTaskDescription } = useKanban();

  const task = useMemo(() => tasks.find((task) => task.id === id), [id, tasks]);
  const defaultDescription = task?.description || 'This task has no description';

  const [description, setDescription] = useState<string>(defaultDescription);
  const isSaveDisabled = useMemo(() => description.trim() === '', [description]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    if (id && description) {
      updateTaskDescription(id, description);
      setIsEditing(false);
    }
  }, [id, description, updateTaskDescription]);

  const handleCancel = useCallback(() => {
    setDescription(defaultDescription);
    setIsEditing(false);
  }, [defaultDescription]);

  const handleClose = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClose]);

  return (
    <Layout>
      <div className="container">
        <section className={styles.taskDetails}>
          <div>
            <h2>{task ? task.title : 'Task not found'}</h2>
            <button onClick={handleClose} data-testid="close-button">
              <IoMdClose />
            </button>
          </div>
          <form className={styles.taskDetails__form}>
            {!isEditing && <p onClick={handleEdit}>{description}</p>}
            {isEditing && (
              <>
                <ReactTextareaAutosize
                  className={styles.textarea}
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <div>
                  <Button onClick={handleSave} variant="submit" disabled={isSaveDisabled}>
                    Change
                  </Button>
                  <Button onClick={handleCancel} variant="cancel">
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default TaskDetails;
