import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskManagerService } from 'src/app/services/task-manager.service';

import { Task } from 'src/app/models/task.model';
import { Workflow } from 'src/app/models/workflow.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  columnNames = ['task', 'workflow', 'status', 'date'];
  taskList: Task[] = [];
  workflows: Workflow[] = [];

  constructor(private taskMgr: TaskManagerService, private router: Router) {}

  ngOnInit() {
    this.taskMgr.getTasks().subscribe(tasks => {
      this.taskList = [...tasks];
    });
    this.taskMgr.getWorkflows().subscribe(workflows => {
      this.workflows = [...workflows];
    });
  }

  gotoTaskDetail(id: number) {
    this.router.navigateByUrl('/tasks/detail/' + id);
  }

  gotoWorkflowDetail(name: string) {
    this.router.navigateByUrl('/workflows/detail-by-name/' + name);
  }
}
