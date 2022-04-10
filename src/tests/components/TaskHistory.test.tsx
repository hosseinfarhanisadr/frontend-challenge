import { render, screen } from 'tests/testUtils';
import { History } from 'types';
import TaskHistory from 'components/TaskHistory';

const history: History[] = [
  {
    id: 'd2b39a0c-33ea-4693-be05-35dac7e3037e',
    subject: 'title',
    old: 'task 1',
    new: 'task1',
    updatedAt: '4/7/2022, 8:28:51 PM',
  },
  {
    id: '72bb519d-16e3-437b-8cda-f42cfbe282fa',
    subject: 'description',
    old: 'desc task 1',
    new: 'description task 1',
    updatedAt: '4/7/2022, 8:28:51 PM',
  },
  {
    id: '669c86e4-d8cd-4794-acc2-86b7019554ee',
    subject: 'status',
    old: 'ToDo',
    new: 'InProgress',
    updatedAt: '4/7/2022, 8:28:51 PM',
  },
];

describe('TaskHistory', () => {
  it('should display history list', () => {
    render(<TaskHistory history={history} />);

    const historyListElement = screen.getByRole('list');

    expect(historyListElement).toBeInTheDocument();
  });

  it('should display history list items', () => {
    render(<TaskHistory history={history} />);

    const foundListItems = screen.getAllByRole('listitem');

    // Remove title from list items so it doesn't affect our tests
    const listItems = foundListItems.filter(
      (element) => element.innerHTML !== 'History'
    );

    expect(listItems).toHaveLength(history.length);

    listItems.forEach((listItem, index) => {
      const historyItem = history[index];

      expect(listItem).toHaveTextContent(`${historyItem.subject} was updated.`);
      expect(listItem).toHaveTextContent(historyItem.updatedAt);
      expect(listItem).toHaveTextContent(
        `${historyItem.old} → ${historyItem.new}`
      );
    });
  });
});
