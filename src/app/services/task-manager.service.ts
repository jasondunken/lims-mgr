import { environment } from "../../environments/environment";

import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, tap, timeout } from "rxjs/operators";

import { AuthService } from "./auth.service";

import { Task } from "../models/task.model";
import { Workflow } from "../models/workflow.model";
import { Processor } from "../models/processor.model";

@Injectable({
  providedIn: "root"
})
export class TaskManagerService implements OnInit {
  private taskList: Task[];
  private workflows: Workflow[];
  private processors: any[];

  ngOnInit(): void {
    this.getWorkflows().subscribe();
  }

  constructor(private http: HttpClient, private auth: AuthService) {}

  // GET/api/tasks - returns all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + "tasks/").pipe(
      timeout(5000),
      tap(tasks => {
        if (tasks) {
          this.taskList = [...tasks];
        }
      }),
      catchError(err => {
        console.log("Error getting tasklist: ", err);
        return throwError(err);
      })
    );
  }

  getTask(id: number): Task {
    for (const task of this.taskList) {
      if (task.taskId === id) {
        return task;
      }
    }
    return {
      taskId: null,
      date: null,
      filePath: null,
      processor: null,
      workflow: null,
      status: null,
      error: null
    };
  }

  // api call
  cancelTask(id: number): void {
    // remove task from tasklist
  }

  // api call - adds a previous task to the queue
  rescheduleTask(id: number): void {
    // should this populate the add task component to make changes or just directly add the task to the tasklist?
  }

  // GET/api/workflows - returns all workflows
  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(environment.apiUrl + "workflows/").pipe(
      tap(workflows => {
        if (workflows) {
          this.workflows = [...workflows];
        }
      }),
      catchError(err => {
        console.log("Error getting workflows: ", err);
        return throwError(err);
      })
    );
  }

  getWorkflow(id: number): Workflow {
    for (const wf of this.workflows) {
      if (wf.id === id) {
        return wf;
      }
    }
    return {
      id: null,
      name: null,
      processor_name: null,
      input_path: null,
      output_path: null,
      interval: null
    };
  }

  getWorkflowByName(name: string): Workflow {
    // TODO refresh list from backend data first or implement a data store (<-- this)
    for (const wf of this.workflows) {
      if (wf.name === name) {
        return wf;
      }
    }
    return {
      id: null,
      name: null,
      processor_name: null,
      input_path: null,
      output_path: null,
      interval: null
    };
  }

  // POST/api/workflows - adds a workflow to the manager
  addWorkflow(workflow: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.auth.getAuthToken()
      })
    };
    const newWorkflow = JSON.stringify(workflow);
    return this.http
      .post<any>(environment.apiUrl + "workflows/", newWorkflow, options)
      .pipe(
        tap(() => {
          console.log("added new workflow");
        }),
        catchError(err => {
          console.log("Error adding new workflow: ", err);
          return throwError(err);
        })
      );
  }

  // api call
  editWorkflow(id: number): void {
    // edit existing workflow and update workflows
  }

  // api call
  removeWorkflow(id: number): void {
    // rend request to remove task from tasklist
  }

  // api/processors
  getProcessors(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.auth.getAuthToken()
      })
    };
    return this.http.get<any>(environment.apiUrl + "processors/").pipe(
      tap(processors => {
        if (processors) {
          this.processors = [...processors];
        }
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  addProcessor(processorName: string, filePath: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application",
        Authorization: "Bearer " + this.auth.getAuthToken()
      })
    };
    const request = JSON.stringify("test request");
    return this.http
      .post<any>(environment.apiUrl + "processors/add", request, options)
      .pipe(
        tap(response => {
          if (response) {
            console.log(response);
            if (response.data) {
              this.processors = [...response.data.processors];
            }
          }
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
