import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  editingUser = false;

  columnNames = ['username', 'date-added', 'date-disabled'];
  userList: User[];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUsers().subscribe(users => {
      this.userList = [...users];
    });
  }

  addUser(): void {
    this.editingUser = true;
  }

  isEditing($event): void {
    this.editingUser = $event;
  }

  disableUser(username: string): void {
    this.auth.disableUser(username);
  }
}
