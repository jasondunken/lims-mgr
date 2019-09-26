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
  @Output() editing = new EventEmitter<boolean>();

  workflow: Workflow;
  processors: Processor[];

  constructor(private fileMgr: FileManagerService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workflow = this.fileMgr.getWorkflow(id);
    this.processors = this.fileMgr.getProcessors();
  }

  saveWorkflow(
    name: HTMLInputElement,
    processor: HTMLSelectElement,
    input: HTMLInputElement,
    output: HTMLInputElement,
    hz: HTMLInputElement
  ): void {
    const newWorkflow = {
      workflowName: name.value,
      processorType: processor.value,
      inputPath: input.value,
      outputPath: output.value,
      frequency: hz.value
    };
    console.log('newWorkflow: ' + JSON.stringify(newWorkflow));
    this.fileMgr.addWorkflow(newWorkflow);
    this.editing.emit(false);
  }

  cancel(): void {
    this.editing.emit(false);
  }
}
