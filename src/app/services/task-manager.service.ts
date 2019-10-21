import { environment } from '../../environments/environment';

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { Task } from '../models/task.model';
import { Workflow } from '../models/workflow.model';
import { Processor } from '../models/processor.model';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService implements OnInit {
  private taskList: Task[];
  private workflows: Workflow[];
  private processors: any[];

  ngOnInit(): void {
    this.getWorkflows().subscribe();
  }

  constructor(private http: HttpClient, private auth: AuthService) {}

  // api/Tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + 'api/Tasks').pipe(
      tap(tasks => {
        if (tasks) {
          this.taskList = [...tasks];
        }
      }),
      catchError(err => {
        console.log('Error getting tasklist: ', err);
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

  // api/Workflows
  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(environment.apiUrl + 'api/Workflows').pipe(
      tap(workflows => {
        if (workflows) {
          this.workflows = [...workflows];
        }
      }),
      catchError(err => {
        console.log('Error getting workflows: ', err);
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
      processor: null,
      inputPath: null,
      outputPath: null,
      frequency: null
    };
  }

  getWorkflowByName(name: string): Workflow {
    for (const wf of this.workflows) {
      if (wf.name === name) {
        return wf;
      }
    }
    return {
      id: null,
      name: null,
      processor: null,
      inputPath: null,
      outputPath: null,
      frequency: null
    };
  }

  // api/Workflows
  addWorkflow(workflow: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.auth.getAuthToken()
      })
    };
    const newWorkflow = JSON.stringify(workflow);
    return this.http.post<any>(environment.apiUrl + 'api/Workflows', newWorkflow, options).pipe(
      tap(() => {
        console.log('added new workflow');
      }),
      catchError(err => {
        console.log('Error adding new workflow: ', err);
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

  // api/Processors
  getProcessors(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.auth.getAuthToken()
      })
    };
    return this.http.get<any>(environment.apiUrl + 'api/Processors', options).pipe(
      tap(response => {
        if (response) {
          this.processors = [...response.data.processors];
        }
      }),
      catchError(err => {
        console.log('Error getting workflows: ', err);
        return throwError(err);
      })
    );
  }
}
