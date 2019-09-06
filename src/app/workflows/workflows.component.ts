import { Component, OnInit } from '@angular/core';

import { FileManagerService } from '../services/file-manager.service';

import { Task } from '../models/task.model';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  taskList: Task[];

  constructor(private fileMgr: FileManagerService) {}

  ngOnInit() {
    this.taskList = this.fileMgr.getTasks();
    console.log('tasklist.length: ' + this.taskList.length);
  }
}
