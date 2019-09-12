import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { Processor } from '../../models/processor.model';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {
  processors: Processor[];
  @Output() editing = new EventEmitter<boolean>();
  constructor(private fileMgr: FileManagerService) {}

  ngOnInit() {
    this.processors = this.fileMgr.getProcessors();
  }

  saveTask(): void {
    // add new task to tasklist
  }

  cancel(): void {
    this.editing.emit(false);
  }
}
