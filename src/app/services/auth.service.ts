import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor() {}

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
