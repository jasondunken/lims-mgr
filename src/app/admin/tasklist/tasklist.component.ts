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
    this.fileMgr.getTasks().subscribe(tasks => {
      this.taskList = [...tasks];
    });
  }

  gotoTaskDetail(id: number) {
    this.router.navigateByUrl('/tasks/detail/' + id);
  }

  gotoWorkflowDetail(name: string) {
    this.router.navigateByUrl('/workflows/detail-by-name/' + name);
  }
}
