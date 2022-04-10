import { TaskStatus } from 'types';
import { compareTasks, getAllowedStatuses } from 'utils/task';

jest.useFakeTimers().setSystemTime(new Date('2020-04-11 3:44:39 AM'));

type ComparisonTask = {
  title: string;
  description: string;
  status: TaskStatus;
};

describe('getAllowedStatuses', () => {
  const currentStatuses: TaskStatus[] = [
    'ToDo',
    'InProgress',
    'InQA',
    'Blocked',
    'Done',
    'Deployed',
  ];

  it.each(currentStatuses)(
    'should return appropriate statuses if current status is `%s`',
    (currentStatus) => {
      const statusTransitions: { [name: string]: TaskStatus[] } = {
        ToDo: ['InProgress'],
        InProgress: ['InQA', 'Blocked'],
        Blocked: ['ToDo'],
        InQA: ['ToDo', 'Done'],
        Done: ['Deployed'],
        Deployed: [],
      };

      expect(getAllowedStatuses(currentStatus)).toEqual(
        statusTransitions[currentStatus]
      );
    }
  );
});

describe('compareTasks', () => {
  it('should return array of history changes', () => {
    const oldTask: ComparisonTask = {
      title: 'old title',
      description: 'old description',
      status: 'ToDo',
    };

    const newTask: ComparisonTask = {
      title: 'new title',
      description: 'new description',
      status: 'InProgress',
    };

    expect(compareTasks(oldTask, newTask)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          subject: 'title',
          old: 'old title',
          new: 'new title',
          updatedAt: '4/11/2020, 3:44:39 AM',
        }),
        expect.objectContaining({
          subject: 'description',
          old: 'old description',
          new: 'new description',
          updatedAt: '4/11/2020, 3:44:39 AM',
        }),
        expect.objectContaining({
          subject: 'status',
          old: 'ToDo',
          new: 'InProgress',
          updatedAt: '4/11/2020, 3:44:39 AM',
        }),
      ])
    );
  });
});
