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
    },
    {
      taskNum: 2,
      user: this.testUser2,
      date: '2019-008-03T14:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\waters\\water_010_2019_Sept_13.csv',
      processor: 'Waters_hplc_20626',
      workflow: "Jason's WF",
      status: 'COMPLETE',
      error: ''
    },
    {
      taskNum: 3,
      user: this.testUser1,
      date: '2019-01-12T09:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_13.csv',
      processor: 'hack_spectrometer_12849',
      workflow: 'WF1',
      status: 'PROCESSING',
      error: ''
    },
    {
      taskNum: 4,
      user: this.testUser4,
      date: '2019-08-15T14:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\Lab144\\thermo_002_2019_Sept_14.csv',
      processor: 'Thermo_Scientific_GC_21037',
      workflow: 'Lab144_GC',
      status: 'IN QUEUE',
      error: ''
    }
  ];

  constructor() {}

  getTasks(): Task[] {
    return this.testTasks;
  }

  getTask(id: number): Task {
    for (const task of this.getTasks()) {
      console.log('taskNum: ' + task.taskNum);
      if (task.taskNum === id) {
        return task;
      }
    }
    return null;
  }

  addTask(task: Task): void {
    // open task-editor component
  }

  editTask(id: number): void {}

  // called by cancel on task-detail or remove from workflows
  removeTask(id: number): void {
    // rend request to cancel task
  }

  rerunTask(id: number): void {
    this.addTask(this.getTask(id));
  }
}
