import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useKanban } from '../../../hooks/useKanban';
import { BrowserRouter } from 'react-router-dom';
import TaskList from '../TaskList';

jest.mock('../../../hooks/useKanban');

describe('TaskList', () => {
  beforeEach(() => {
    (useKanban as jest.Mock).mockReturnValue({
      tasks: [
        { id: '1', title: 'Task 1', state: 'backlog' },
        { id: '2', title: 'Task 2', state: 'ready' },
        { id: '3', title: 'Task 3', state: 'in progress' },
        { id: '4', title: 'Task 4', state: 'finished' },
      ],
      addTask: jest.fn(),
    });
  });

  it('should render TaskList with four TaskColumns', () => {
    render(
      <BrowserRouter>
        <TaskList />
      </BrowserRouter>
    );

    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Finished')).toBeInTheDocument();
  });
});
