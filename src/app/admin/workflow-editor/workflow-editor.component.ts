import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TaskManagerService } from "src/app/services/task-manager.service";
import { ActivatedRoute } from "@angular/router";

import { Workflow } from "src/app/models/workflow.model";

@Component({
  selector: "app-workflow-editor",
  templateUrl: "./workflow-editor.component.html",
  styleUrls: ["./workflow-editor.component.css"]
})
export class WorkflowEditorComponent implements OnInit {
  @Output() editing = new EventEmitter<boolean>();

  workflow: Workflow;
  processors: string[];

  constructor(
    private taskMgr: TaskManagerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.workflow = this.taskMgr.getWorkflow(id);
    this.taskMgr.getProcessors().subscribe(response => {
      if (response) {
        if (response && response.length > 0) {
          this.processors = [...response];
          console.log(this.processors);
        } else {
          this.processors[0] = "There are currently no processors installed";
        }
      } else {
        this.processors[0] = "There are currently no processors installed";
      }
    });
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
    console.log("newWorkflow: " + JSON.stringify(newWorkflow));
    this.taskMgr.addWorkflow(newWorkflow).subscribe(() => {
      this.editing.emit(false);
    });
  }

  cancel(): void {
    this.editing.emit(false);
  }
}
