import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileManagerService } from 'src/app/services/file-manager.service';

import { ActivatedRoute } from '@angular/router';

import { Processor } from '../../models/processor.model';
import { Workflow } from 'src/app/models/workflow.model';

@Component({
  selector: 'app-workflow-editor',
  templateUrl: './workflow-editor.component.html',
  styleUrls: ['./workflow-editor.component.css']
})
export class WorkflowEditorComponent implements OnInit {
  workflow: Workflow;
  processors: Processor[];

  @Output() editing = new EventEmitter<boolean>();

  constructor(private fileMgr: FileManagerService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workflow = this.fileMgr.getWorkflow(id);
    this.processors = this.fileMgr.getProcessors();
  }

  saveWorkflow(): void {
    // this.fileMgr.addWorkflow();
  }

  cancel(): void {
    this.editing.emit(false);
  }
}
