import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { Workflow } from '../models/workflow.model';
import { Processor } from '../models/processor.model';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  // CORS isn't happy if you leave off the http://
  apiUrl = 'http://localhost:4000/api';
  private taskList: Task[];
  testUser1: User = {
    username: 'kwolfe',
    dateAdded: '1/1/2019',
    dateDisabled: null
  };
  testUser2: User = {
    username: 'brittany stuart',
    dateAdded: '2/2/2018',
    dateDisabled: null
  };
  testUser3: User = {
    username: 'j dog',
    dateAdded: '3/1/1970',
    dateDisabled: null
  };
  testUser4: User = {
    username: 'dr parmar',
    dateAdded: '12/12/2099',
    dateDisabled: null
  };
  testTasks: Task[] = [
    {
      taskId: 1,
      date: '2019-09-05T14:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      processor: 'hack_spectrometer_12849',
      workflow: 'WF1',
      status: 'ERROR',
      error: 'Invalid character on column 6, row 23: $'
    },
    {
      taskId: 2,
      date: '2019-008-03T14:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\waters\\water_010_2019_Sept_13.csv',
      processor: 'Waters_hplc_20626',
      workflow: "Jason's WF",
      status: 'COMPLETE',
      error: ''
    },
    {
      taskId: 3,
      date: '2019-01-12T09:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_13.csv',
      processor: 'hack_spectrometer_12849',
      workflow: 'WF1',
      status: 'PROCESSING',
      error: ''
    },
    {
      taskId: 4,
      date: '2019-08-15T14:11:09',
      filePath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\Lab144\\thermo_002_2019_Sept_14.csv',
      processor: 'Thermo_Scientific_GC_21037',
      workflow: 'Lab144_GC',
      status: 'IN QUEUE',
      error: ''
    }
  ];

  workflows: Workflow[] = [
    {
      id: 1,
      name: 'WF1',
      processor: 'hack_spectrometer_12849',
      inputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      outputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\OutputFiles\\this-machines-output-folder\\spect_002_2019_Sept_03.csv',
      frequency: 1
    },
    {
      id: 2,
      name: "Jason's WF",
      processor: 'Waters_hplc_20626',
      inputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      outputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\OutputFiles\\this-machines-output-folder\\spect_002_2019_Sept_03.csv',
      frequency: 1
    },
    {
      id: 3,
      name: 'WF2',
      processor: 'hack_spectrometer_12849',
      inputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      outputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\OutputFiles\\this-machines-output-folder\\spect_002_2019_Sept_03.csv',
      frequency: 1
    },
    {
      id: 4,
      name: 'Lab144_GC',
      processor: 'hack_spectrometer_12849',
      inputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\MyFile\\spect_002_2019_Sept_03.csv',
      outputPath: '\\\\AA\\ORD\\Data\\Priv\\NERL_LIMS_PILOT\\Files\\OutputFiles\\this-machines-output-folder\\spect_002_2019_Sept_03.csv',
      frequency: 1
    }
  ];

  constructor(private http: HttpClient) {}

  // api call
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/Tasks').pipe(
      tap(tasks => {
        console.log('getTasks()...');
        if (tasks) {
          this.taskList = [...tasks];
          console.log('tasks: ' + tasks);
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
    return this.http.get<Workflow[]>(this.apiUrl + '/Workflows').pipe(
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

  // api call
  addWorkflow(workflow: Workflow): void {
    // add workflow to workflows
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
