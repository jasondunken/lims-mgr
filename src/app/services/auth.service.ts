import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  users: User[] = [this.testUser1, this.testUser2, this.testUser3, this.testUser4];
  private authenticated = false;

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  addUser(): void {
    // add a new user to the userlist
  }

  disableUser(id: number): void {
    // disable an existing user and update userlist
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  authenticateUser(usrName: string, password: string) {
    // for test purposes
    this.authenticated = true; // if authenticated by authentication server
  }

  logout(): void {
    this.authenticated = false;
  }
}
