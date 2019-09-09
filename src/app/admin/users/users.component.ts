import { Component, OnInit } from '@angular/core';

import { FileManagerService } from 'src/app/services/file-manager.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  columnNames = ['username', 'date-added', 'date-disabled'];
  userList: User[];

  constructor(private fileMgr: FileManagerService) {}

  ngOnInit() {
    this.userList = this.fileMgr.getUsers();
  }
}
