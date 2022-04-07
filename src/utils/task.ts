import { TaskStatus } from 'types';

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

export { getAllowedStatuses };
