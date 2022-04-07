export type TaskStatus =
  | 'ToDo'
  | 'InProgress'
  | 'InQA'
  | 'Blocked'
  | 'Done'
  | 'Deployed';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  history: History[];
};

export type History = {
  id: string;
  subject: string;
  old: string;
  new: string;
  updatedAt: string;
};

type CommonTaskFormValues = { title: string; description: string };
type EditTaskFormValues =
  | { id: string; status: TaskStatus }
  | { id?: never; status?: never };

export type TaskFormValues = CommonTaskFormValues & EditTaskFormValues;
