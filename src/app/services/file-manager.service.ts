import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { Task } from '../models/task.model';
import { Workflow } from '../models/workflow.model';
import { Processor } from '../models/processor.model';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private taskList: Task[];
  private workflows: Workflow[];

  constructor(private http: HttpClient, private auth: AuthService) {}

  // api/Tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + 'api/Tasks').pipe(
      tap(tasks => {
        if (tasks) {
          this.taskList = [...tasks];
        }
      })
    );
  }

  getTask(id: number): Task {
    for (const task of this.taskList) {
      if (task.taskId === id) {
        return task;
      }
    }
    return null;
  }

  // api call
  cancelTask(id: number): void {
    // remove task from tasklist
  }

  // api call - adds a previous task to the queue
  rescheduleTask(id: number): void {
    // should this populate the add task component to make changes or just directly add the task to the tasklist?
  }

  // api call
  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(environment.apiUrl + 'api/Workflows').pipe(
      tap(workflows => {
        if (workflows) {
          this.workflows = [...workflows];
        }
      })
    );
  }

  getWorkflow(id: number): Workflow {
    for (const wf of this.workflows) {
      if (wf.id === id) {
        return wf;
      }
    }
    return null;
  }

  getWorkflowByName(name: string): Workflow {
    for (const wf of this.workflows) {
      if (wf.name === name) {
        return wf;
      }
    }
    return null;
  }

  // api/workflows
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

  // api call
  getProcessors(): Processor[] {
    return [{ name: 'hack_spectrometer_12849' }, { name: 'Waters_hpic_10626' }, { name: 'Thermo_Scientific_GC_21037' }];
  }
}
