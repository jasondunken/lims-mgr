import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { TaskManagerService } from "../../services/task-manager.service";
import { Workflow } from "../../models/workflow.model";

@Component({
  selector: "app-workflows",
  templateUrl: "./workflows.component.html",
  styleUrls: ["./workflows.component.css"]
})
export class WorkflowsComponent implements OnInit {
  loadingWorkflows: boolean;
  errorMessage: string;

  columnNames = ["name", "processor", "input-path", "output-path", "frequency"];
  workflows: Workflow[];

  editingWorkflow = false;

  constructor(private taskMgr: TaskManagerService, private router: Router) {}

  ngOnInit() {
    this.loadingWorkflows = true;
    this.errorMessage = "";

    this.taskMgr.getWorkflows().subscribe(workflows => {
      if (workflows && workflows.length > 0) {
        this.workflows = [...workflows];
      } else {
        this.errorMessage = "There are currently no Workflows available";
      }
      this.loadingWorkflows = false;
    });
  }

  gotoWorkflowDetail(name: string) {
    this.router.navigateByUrl("/workflows/detail-by-name/" + name);
  }

  addWorkflow(): void {
    this.editingWorkflow = true;
  }

  isEditing($event): void {
    this.editingWorkflow = $event;
  }
}
