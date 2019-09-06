import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FileManagerService } from '../services/file-manager.service';

import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
      file: '\\AA\\ORD\\\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      processor: 'hack_spectrometer_12849',
      workflow: 'WF1',
      status: 'ERROR',
      error: 'Invalid character on column 6, row 23: $'
    }
  ];
  constructor(private auth: AuthService, private fMgr: FileManagerService) {}

  ngOnInit() {}
}
