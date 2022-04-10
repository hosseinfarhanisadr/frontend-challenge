import { waitFor, renderWithEventSetup, screen, render } from 'tests/testUtils';
import { Task } from 'types';
import { State } from 'store';
import Edit from 'pages/edit/[id]';
import {
  getTitleInput,
  getDescriptionInput,
} from 'tests/components/TaskForm.test';

const task: Task = {
  id: 'e4c51f2c-bb38-63fb-cee1-f05567d7b257',
  title: 'Task1',
  description: 'Task 1 Description',
  status: 'ToDo',
  history: [],
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { id: task.id },
      asPath: '',
    };
  },
}));

describe('Edit', () => {
  it("it should display 'not found' error if id not found in the task list", async () => {
    const initialState: State = { tasks: [{ ...task, id: 'not-found-id' }] };
    render(<Edit />, { initialState });

    const notFoundMessage = screen.getByText(/^Not Found!/);

    expect(notFoundMessage).toBeInTheDocument();
  });

  it('it should display new changes in history section after editing a task', async () => {
    const initialState: State = { tasks: [task] };
    const { user } = renderWithEventSetup(<Edit />, { initialState });

    const newTitleValue = 'new task';
    const newDescriptionValue = 'task description';
    const newStatus = 'InProgress';

    const titleInput = getTitleInput();
    await user.clear(titleInput);
    await user.type(titleInput, newTitleValue);

    const descriptionInput = getDescriptionInput();
    await user.clear(descriptionInput);
    await user.type(descriptionInput, newDescriptionValue);

    const statusSelect = screen.getByRole('button', { name: task.status });
    await user.click(statusSelect);
    const option = screen.getByRole('option', { name: newStatus });
    await user.click(option);

    expect(titleInput).toHaveValue(newTitleValue);
    expect(descriptionInput).toHaveValue(newDescriptionValue);
    expect(screen.getByRole('button', { name: newStatus })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Edit/i }));

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');

      //Expected to have 4 list items because we have 3 changes plus the history title
      expect(listItems).toHaveLength(4);
    });
  });
});
