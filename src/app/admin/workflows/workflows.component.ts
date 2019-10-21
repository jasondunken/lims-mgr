import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TaskManagerService } from '../../services/task-manager.service';
import { Workflow } from '../../models/workflow.model';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  columnNames = ['name', 'processor', 'input-path', 'output-path', 'frequency'];
  workflows: Workflow[];

  editingWorkflow = false;

  constructor(private taskMgr: TaskManagerService, private router: Router) {}

  ngOnInit() {
    this.taskMgr.getWorkflows().subscribe(workflows => {
      this.workflows = [...workflows];
    });
  }

  gotoWorkflowDetail(name: string) {
    this.router.navigateByUrl('/workflows/detail-by-name/' + name);
  }

  addWorkflow(): void {
    this.editingWorkflow = true;
  }

  isEditing($event): void {
    this.editingWorkflow = $event;
  }
}
