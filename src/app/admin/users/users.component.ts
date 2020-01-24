import { Component, OnInit, ViewChild } from "@angular/core";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  loadingUsers: boolean;
  editingUser = false;

  columnNames = ["username", "date-added", "date-disabled"];
  userList: User[];
  sortableData = new MatTableDataSource();

  constructor(private auth: AuthService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.loadingUsers = true;
    this.auth.getUsers().subscribe(
      users => {
        this.userList = [...users];
        this.sortableData.data = [...this.userList];
        this.sortableData.sort = this.sort;
        this.loadingUsers = false;
      },
      err => {
        console.log(err);
      }
    );
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
