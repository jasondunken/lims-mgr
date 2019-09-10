import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  testUser1: User = {
    username: 'kwolfe',
    dateAdded: '1/1/2019',
    dateDisabled: null
  };
  testUser2: User = {
    username: 'brittany stuart',
    dateAdded: '2/2/2018',
    dateDisabled: null
  };
  testUser3: User = {
    username: 'j dog',
    dateAdded: '3/1/1970',
    dateDisabled: null
  };
  testUser4: User = {
    username: 'dr parmar',
    dateAdded: '12/12/2099',
    dateDisabled: null
  };
  users: User[] = [this.testUser1, this.testUser2, this.testUser3, this.testUser4];
  testTasks: Task[] = [
    {
      taskNum: 1,
      user: this.testUser1,
      date: '2019-09-05T14:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      processor: 'hack_spectrometer_12849',
      workflow: 'WF1',
      status: 'ERROR',
      error: 'Invalid character on column 6, row 23: $'
    }
  ];

  constructor() {}

  getTasks(): Task[] {
    return this.testTasks;
  }

  getTask(id: number): Task {
    for (const task of this.getTasks()) {
      if (task.taskNum === id) {
        return task;
      }
    }
  }

  addTask(task: Task): void {
    // submit this task to tasklist
  }

  removeTask(id: number): void {
    // rend request to cancel task
  }

  rerunTask(id: number): void {
    this.addTask(this.getTask(id));
  }

  getUsers(): User[] {
    return this.users;
  }
}
