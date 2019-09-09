import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import { FileManagerService } from '../services/file-manager.service';

import { Task } from '../models/task.model';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  columnNames = ['workflow', 'name', 'processor', 'file-location'];
  taskList: Task[];

  constructor(private fileMgr: FileManagerService) {}

  ngOnInit() {
    this.taskList = this.fileMgr.getTasks();
  }
}
