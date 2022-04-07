import { History, TaskStatus } from 'types';
import { v4 as uuidv4 } from 'uuid';

function getAllowedStatuses(currentStatus?: TaskStatus): TaskStatus[] {
  const statusTransitions: { [name: string]: TaskStatus[] } = {
    ToDo: ['InProgress'],
    InProgress: ['InQA', 'Blocked'],
    Blocked: ['ToDo'],
    InQA: ['ToDo', 'Done'],
    Done: ['Deployed'],
    Deployed: [],
  };

  return (
    statusTransitions[currentStatus as keyof typeof statusTransitions] || []
  );
}

type ComparisonTask = { title: string; description: string; status: string };

function compareTasks(oldTask: ComparisonTask, newTask: ComparisonTask) {
  let diffs: History[] = [];
  const comparisonKeys = ['title', 'description', 'status'];
  const updatedAt = new Date().toLocaleString();

  comparisonKeys.forEach((key: string) => {
    const oldValue = oldTask[key as keyof typeof oldTask];
    const newValue = newTask[key as keyof typeof newTask];

    if (oldValue !== newValue) {
      diffs.push({
        id: uuidv4(),
        subject: key,
        old: oldValue,
        new: newValue,
        updatedAt,
      });
    }
  });

  return diffs;
}

export { getAllowedStatuses, compareTasks };
