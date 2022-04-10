import { render, screen } from 'tests/testUtils';
import { Task } from 'types';
import { State } from 'store';
import Tasks from 'components/Tasks';

const tasks: Task[] = [
  {
    id: 'e4c51f2c-bb38-63fb-cee1-f05567d7b257',
    title: 'Task1',
    description: 'Task 1 Description',
    status: 'ToDo',
    history: [],
  },
  {
    id: '61146f4a-a91a-4e8b-76c6-a6530300bd03',
    title: 'Task2',
    description: 'Task 2 Description',
    status: 'InProgress',
    history: [],
  },
];

describe('Tasks', () => {
  it('should display not found message', () => {
    render(<Tasks />);

    const notFoundMessage = screen.getByText(/^You have nothing to do./);

    expect(notFoundMessage).toBeInTheDocument();
  });

  it('should display task list', () => {
    const initialState: State = { tasks };

    render(<Tasks />, { initialState });
    const taskList = screen.getByTestId('task-list');

    expect(taskList).toBeTruthy();
    expect(taskList.children).toHaveLength(tasks.length);

    tasks.forEach((task, index) => {
      const taskCard = taskList.children[index];
      expect(taskCard).toHaveTextContent(task.title);
      expect(taskCard).toHaveTextContent(task.description);
      expect(taskCard).toHaveTextContent(task.status);
    });
  });
});
