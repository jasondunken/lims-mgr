import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FileManagerService } from '../../services/file-manager.service';
import { Workflow } from '../../models/workflow.model';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.css']
})
export class WorkflowDetailComponent implements OnInit {
  workflow: Workflow;
  constructor(private fileMgr: FileManagerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workflow = this.fileMgr.getWorkflow(id);
  }

  back(): void {
    this.router.navigateByUrl('/workflows');
  }
}
