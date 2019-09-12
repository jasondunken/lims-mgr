import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import { FileManagerService } from '../services/file-manager.service';

import { Workflow } from '../models/workflow.model';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  editingWorkflow = false;
  columnNames = ['name', 'processor', 'input-path', 'output-path', 'frequency'];
  workflows: Workflow[];

  constructor(private fileMgr: FileManagerService) {}

  ngOnInit() {
    this.workflows = this.fileMgr.getWorkflows();
  }

  addWorkflow(): void {
    this.editingWorkflow = true;
  }

  editWorkflow(/* use id to populate task-editor component */): void {
    this.editingWorkflow = true;
  }

  removeWorkflow(): void {
    // remove task from tasklist
  }

  isEditing($event): void {
    this.editingWorkflow = $event;
  }
}
