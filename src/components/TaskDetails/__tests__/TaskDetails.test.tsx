import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useKanban } from '../../../hooks/useKanban';
import { BrowserRouter, useParams, useNavigate } from 'react-router-dom';
import TaskDetails from '../TaskDetails';

jest.mock('../../../hooks/useKanban');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('TaskDetails', () => {
  const mockUpdateTaskDescription = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useKanban as jest.Mock).mockReturnValue({
      tasks: [{ id: '1', title: 'Sample Task', description: 'Sample description' }],
      updateTaskDescription: mockUpdateTaskDescription,
    });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should display the task title if task is found', () => {
    render(
      <BrowserRouter>
        <TaskDetails />
      </BrowserRouter>
    );
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
  });

  it('should display "Task not found" if task is not found', () => {
    (useKanban as jest.Mock).mockReturnValue({
      tasks: [],
      updateTaskDescription: jest.fn(),
    });
    render(
      <BrowserRouter>
        <TaskDetails />
      </BrowserRouter>
    );
    expect(screen.getByText('Task not found')).toBeInTheDocument();
  });

  it('should enter editing mode when the description is clicked', () => {
    render(
      <BrowserRouter>
        <TaskDetails />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Sample description'));
    expect(screen.getByDisplayValue('Sample description')).toBeInTheDocument();
    expect(screen.getByText('Change')).toBeInTheDocument();
  });

  it('should call navigate("/PR09-KanbanBoard/") when the close button is clicked', () => {
    render(
      <BrowserRouter>
        <TaskDetails />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/PR09-KanbanBoard/');
  });
});
