import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileManagerService } from 'src/app/services/file-manager.service';

import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  columnNames = ['task', 'workflow', 'status', 'date'];
  taskList: Task[] = [];

  constructor(private fileMgr: FileManagerService, private router: Router) {}

  ngOnInit() {
    this.taskList = this.fileMgr.getTasks();
  }

  gotoTaskDetail(id: number) {
    this.router.navigateByUrl('/tasks/detail/' + id);
  }
}
