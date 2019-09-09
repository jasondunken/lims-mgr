import { Component, OnInit } from '@angular/core';
import { FileManagerService } from 'src/app/services/file-manager.service';

import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  columnNames = ['task', 'status', 'date'];
  taskList: Task[] = [];

  constructor(private fileMgr: FileManagerService) {}

  ngOnInit() {
    this.taskList = this.fileMgr.getTasks();
  }
}
