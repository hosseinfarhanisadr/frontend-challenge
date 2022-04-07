import { Task } from 'types';

function storeTasks(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function retrieveTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks') || '[]';
  return JSON.parse(storedTasks);
}

export { storeTasks, retrieveTasks };
