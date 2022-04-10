import { render, screen } from 'tests/testUtils';
import { Task } from 'types';
import TaskCard from 'components/TaskCard';

const task: Task = {
  id: 'e4c51f2c-bb38-63fb-cee1-f05567d7b257',
  title: 'Task1',
  description: 'Task 1 Description',
  status: 'ToDo',
  history: [],
};

describe('TaskCard', () => {
  const fields = [
    ['title', task.title],
    ['description', task.description],
    ['status', task.status],
    ['link', 'edit'],
  ];
  it.each(fields)('should display %s', (name, value) => {
    render(<TaskCard task={task} />);

    const element =
      name === 'link'
        ? screen.getByRole('link', { name: value })
        : screen.getByText(value);

    expect(element).toBeTruthy();
  });
});
