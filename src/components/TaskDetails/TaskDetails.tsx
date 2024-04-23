import { FunctionComponent, useState } from 'react';
import { useKanban } from '../../hooks/useKanban';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const TaskDetails: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTaskDescription } = useKanban();

  const task = tasks.find((task) => task.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    task?.description || 'This task has no description'
  );

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (id && description !== undefined) {
      updateTaskDescription(id, description);
      setIsEditing(false);
    } else {
      console.error('ID or description is undefined');
    }
  };

  const handleCancel = () => {
    setDescription(task?.description || '');
    setIsEditing(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Layout>
      <section>
        <h1>{task ? task.title : 'Task not found'}</h1>
        {!isEditing && <p onClick={handleEdit}>{description}</p>}
        {isEditing && (
          <div>
            <input type="text" value={description} onChange={handleDescriptionChange} />
            <button onClick={handleSave}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
        <button onClick={handleClose}>✖</button>
      </section>
    </Layout>
  );
};

export default TaskDetails;
