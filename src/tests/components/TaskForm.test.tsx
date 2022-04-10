import { render, renderWithEventSetup, screen, waitFor } from 'tests/testUtils';
import { Task, TaskStatus } from 'types';
import { getAllowedStatuses } from 'utils/task';
import TaskForm from 'components/TaskForm';

const addDefaultValues = { title: '', description: '' };
const editDefaultValues: Task = {
  id: 'e4c51f2c-bb38-63fb-cee1-f05567d7b257',
  title: 'Task 1',
  description: 'Task 1 Description',
  status: 'ToDo',
  history: [],
};

const handleSubmit = jest.fn();

export function getTitleInput() {
  return screen.getByRole('textbox', { name: /title/i });
}

export function getDescriptionInput() {
  return screen.getByRole('textbox', { name: /description/i });
}

function getStatusSelect() {
  return screen.queryByRole('button', {
    name: editDefaultValues.status,
  });
}

function getAddButton() {
  return screen.getByRole('button', { name: /Add/i });
}

function getEditButton() {
  return screen.getByRole('button', { name: /Edit/i });
}
function getCancelButton() {
  return screen.queryByRole('link', { name: /Cancel/i });
}

describe('TaskForm', () => {
  it('should render add form', () => {
    render(
      <TaskForm onSubmit={handleSubmit} defaultValues={addDefaultValues} />
    );

    const addFormTitle = screen.getByText('Add a new Task');
    const titleInput = getTitleInput();
    const descriptionInput = getDescriptionInput();
    const statusSelect = getStatusSelect();
    const addButton = getAddButton();
    const cancelButton = getCancelButton();

    expect(addFormTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(statusSelect).not.toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(cancelButton).not.toBeInTheDocument();
  });

  it('should render edit form', () => {
    render(
      <TaskForm
        edit
        onSubmit={handleSubmit}
        defaultValues={editDefaultValues}
      />
    );

    const editFormTitle = screen.getByText('Edit Task');
    const titleInput = getTitleInput();
    const descriptionInput = getDescriptionInput();
    const statusSelect = getStatusSelect();
    const editButton = getEditButton();
    const cancelButton = getCancelButton();

    expect(editFormTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(statusSelect).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('should submit add form without validation errors', async () => {
    const handleAdd = jest.fn();
    const { user } = renderWithEventSetup(
      <TaskForm onSubmit={handleAdd} defaultValues={addDefaultValues} />
    );

    const newTitleValue = 'new task';
    const newDescriptionValue = 'task description';

    await user.type(
      screen.getByRole('textbox', { name: /title/i }),
      newTitleValue
    );
    await user.type(
      screen.getByRole('textbox', { name: /description/i }),
      newDescriptionValue
    );
    await user.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() =>
      expect(handleAdd).toBeCalledWith({
        title: newTitleValue,
        description: newDescriptionValue,
      })
    );
  });

  it('should submit edit form without validation errors', async () => {
    const handleEdit = jest.fn();
    const { user } = renderWithEventSetup(
      <TaskForm edit onSubmit={handleEdit} defaultValues={editDefaultValues} />
    );

    await user.click(screen.getByRole('button', { name: /Edit/i }));

    await waitFor(() => expect(handleEdit).toBeCalledWith(editDefaultValues));
  });

  it('should display validation errors when submitting form', async () => {
    const handleAdd = jest.fn();
    const { user } = renderWithEventSetup(
      <TaskForm onSubmit={handleAdd} defaultValues={addDefaultValues} />
    );

    await user.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      const titleErrorMessage = screen.getByText(
        /^title must be at least 3 characters/
      );
      const descriptionErrorMessage = screen.getByText(
        /^description must be at least 10 characters/
      );

      expect(titleErrorMessage).toBeInTheDocument();
      expect(descriptionErrorMessage).toBeInTheDocument();
      expect(handleAdd).not.toBeCalled();
    });
  });

  const statuses: TaskStatus[] = [
    'ToDo',
    'InProgress',
    'InQA',
    'Blocked',
    'Done',
    'Deployed',
  ];
  it.each(statuses)(
    'should display appropriate statuses in dropdown select if current status is `%s`',
    async (currentStatus) => {
      const { user } = renderWithEventSetup(
        <TaskForm
          edit
          onSubmit={handleSubmit}
          defaultValues={{ ...editDefaultValues, status: currentStatus }}
        />
      );

      await user.click(screen.getByRole('button', { name: currentStatus }));

      await waitFor(() => {
        const optionElements = screen.getAllByRole('option');
        const allowedStatuses = [
          currentStatus,
          ...getAllowedStatuses(currentStatus),
        ];

        expect(allowedStatuses).toHaveLength(optionElements.length);
        optionElements.forEach((element, index) => {
          expect(element).toHaveTextContent(allowedStatuses[index]);
        });
      });
    }
  );
});
