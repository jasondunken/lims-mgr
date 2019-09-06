import { User } from './user.model';

export interface Task {
  taskNum: number;
  user: User;
  date: string;
  file: string;
  processor: string;
  workflow: string;
  status: string;
  error: string;
}
