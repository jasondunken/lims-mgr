import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FileManagerService } from '../services/file-manager.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private auth: AuthService, private fMgr: FileManagerService) {}

  ngOnInit() {}

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
}
