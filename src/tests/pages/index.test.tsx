import { waitFor, renderWithEventSetup, screen } from 'tests/testUtils';
import Home from 'pages/index';
import {
  getDescriptionInput,
  getTitleInput,
} from 'tests/components/TaskForm.test';

describe('Home', () => {
  it('it should render the task as the first item on the list after adding new task', async () => {
    const { user } = renderWithEventSetup(<Home />);

    const newTitleValue = 'new task';
    const newDescriptionValue = 'task description';

    const titleInput = getTitleInput();
    await user.type(titleInput, newTitleValue);
    expect(titleInput).toHaveValue(newTitleValue);

    const descriptionInput = getDescriptionInput();
    await user.type(descriptionInput, newDescriptionValue);
    expect(descriptionInput).toHaveValue(newDescriptionValue);

    await user.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      const taskList = screen.getByTestId('task-list');

      const taskCard = taskList.children[0];
      expect(taskCard).toHaveTextContent(newTitleValue);
      expect(taskCard).toHaveTextContent(newDescriptionValue);
      expect(taskCard).toHaveTextContent('ToDo');
    });
  });
});
