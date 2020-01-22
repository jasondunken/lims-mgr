import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { TaskManagerService } from "src/app/services/task-manager.service";

import { Task } from "src/app/models/task.model";
import { Workflow } from "src/app/models/workflow.model";
import { ProcessorsComponent } from "../processors/processors.component";

@Component({
  selector: "app-tasklist",
  templateUrl: "./tasklist.component.html",
  styleUrls: ["./tasklist.component.css"]
})
export class TasklistComponent implements OnInit {
  loadingTasklist: boolean;
  loadingWorkflows: boolean;
  errorMessage: string;

  columnNames = ["task", "workflow", "status", "date", "cancel"];
  taskList: Task[];
  workflows: Workflow[];

  constructor(private taskMgr: TaskManagerService, private router: Router) {}

  ngOnInit() {
    this.loadingTasklist = true;
    this.loadingWorkflows = true;
    this.errorMessage = "";

    this.taskMgr.getTasks().subscribe(tasks => {
      if (tasks && tasks.length > 0) {
        this.taskList = [...tasks];
      } else {
        this.errorMessage = "There are currently no Tasks scheduled";
      }
      this.loadingTasklist = false;
    });
    this.taskMgr.getWorkflows().subscribe(workflows => {
      this.workflows = [...workflows];
      this.loadingWorkflows = false;
    });
  }

  gotoTaskDetail(id: number) {
    this.router.navigateByUrl("/tasks/detail/" + id);
  }

  gotoWorkflowDetail(name: string) {
    this.router.navigateByUrl("/workflows/detail-by-name/" + name);
  }

  cancelTask(): void {
    console.log("task canceled!");
  }
}
