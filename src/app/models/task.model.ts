import { User } from './user.model';

export interface Task {
  taskId: number;
  date: string;
  filePath: string;
  processor: string;
  workflow: string;
  status: string;
  error: string;
}
