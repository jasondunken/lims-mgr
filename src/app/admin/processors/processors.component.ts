import { Component, OnInit } from '@angular/core';

import { Processor } from 'src/app/models/processor.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-processors',
  templateUrl: './processors.component.html',
  styleUrls: ['./processors.component.css']
})
export class ProcessorsComponent implements OnInit {
  columnNames = ['name'];
  processors: Processor[];

  addingProcessor = false;
  noProcessorsMessage = null;

  constructor(private fileMgr: TaskManagerService) {}

  ngOnInit() {
    this.processors = [];
    this.fileMgr.getProcessors().subscribe(processors => {
      if (processors && processors.length > 0) {
        this.processors = [...processors];
      } else {
        this.noProcessorsMessage = 'There are currently no processors installed.';
      }
    });
  }

  addProcessor() {
    this.addingProcessor = true;
  }

  isAdding($event) {
    this.addingProcessor = $event;
  }
}
