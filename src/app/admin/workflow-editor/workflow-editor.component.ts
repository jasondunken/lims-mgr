import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TaskManagerService } from "src/app/services/task-manager.service";
import { ActivatedRoute } from "@angular/router";

import { Workflow } from "src/app/models/workflow.model";
import { Processor } from "src/app/models/processor.model";

@Component({
  selector: "app-workflow-editor",
  templateUrl: "./workflow-editor.component.html",
  styleUrls: ["./workflow-editor.component.css"]
})
export class WorkflowEditorComponent implements OnInit {
  @Output() editing = new EventEmitter<boolean>();

  workflow: Workflow;
  processors = [];
  statusMessage = "";

  constructor(
    private taskMgr: TaskManagerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.workflow = this.taskMgr.getWorkflow(id);
    this.taskMgr.getProcessors().subscribe(response => {
      if (response.error) {
        this.statusMessage = "No processors installed";
      } else {
        if (response && response.length > 0) {
          this.processors = [...response];
        } else {
          this.statusMessage = "No processors installed";
        }
      }
    });
  }

  saveWorkflow(
    name: HTMLInputElement,
    processor_name: HTMLSelectElement,
    input_path: HTMLInputElement,
    output_path: HTMLInputElement,
    interval: HTMLInputElement
  ): void {
    if (processor_name.value === "null" || processor_name.value === undefined) {
      this.statusMessage = "Workflows must include a valid processor";
      return;
    }
    const newWorkflow = {
      name: name.value,
      processor_name: processor_name.value,
      input_path: input_path.value,
      output_path: output_path.value,
      interval: interval.value
    };
    this.taskMgr.addWorkflow(newWorkflow).subscribe(() => {
      this.editing.emit(false);
    });
  }

  cancel(): void {
    this.editing.emit(false);
  }
}
