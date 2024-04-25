import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import TaskColumn from '../TaskColumn';

const renderTaskColumn = (props = {}) =>
  render(
    <BrowserRouter>
      <TaskColumn
        title="Backlog"
        tasks={[
          { id: '1', title: 'Task 1', state: 'backlog', description: 'Description for Task 1' },
        ]}
        addTaskFunction={jest.fn()}
        availableTasks={[
          { id: '2', title: 'Task 2', state: 'backlog', description: 'Description for Task 2' },
        ]}
        {...props}
      />
    </BrowserRouter>
  );

describe('TaskColumn', () => {
  it('should render add button and react to clicks', () => {
    renderTaskColumn();
    const addButton = screen.getByText('+ Add card');
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText('Enter task title...')).toBeInTheDocument();
  });

  it('should allow input for new task title', () => {
    renderTaskColumn();
    fireEvent.click(screen.getByText('+ Add card'));
    const input = screen.getByPlaceholderText('Enter task title...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Task' } });
    expect(input.value).toBe('New Task');
  });

  it('should show options in select when not in backlog', () => {
    renderTaskColumn({ title: 'Ready' });
    fireEvent.click(screen.getByText('+ Add card'));
    expect(screen.getByText('Select a task...')).toBeInTheDocument();
  });

  it('should close form when cancel button is clicked', () => {
    renderTaskColumn();
    fireEvent.click(screen.getByText('+ Add card'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByPlaceholderText('Enter task title...')).not.toBeInTheDocument();
  });
});
