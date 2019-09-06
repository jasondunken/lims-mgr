import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FileManagerService } from '../services/file-manager.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  constructor(private route: ActivatedRoute, private fileMgr: FileManagerService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.task = this.fileMgr.getTask(id);
  }
}
