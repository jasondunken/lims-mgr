import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { FileManagerService } from '../../services/file-manager.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  constructor(private route: ActivatedRoute, private fileMgr: FileManagerService, private router: Router) {}

  ngOnInit() {
    // the + is a TS macro for converting type of a string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.task = this.fileMgr.getTask(id);
  }

  rerunTask(id: number): void {
    // re-run existing task
  }

  cancelTask(id: number): void {
    // cancel task
  }

  back(): void {
    this.router.navigateByUrl('/tasks');
  }
}
