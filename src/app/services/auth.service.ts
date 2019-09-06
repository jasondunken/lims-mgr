import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authenticated = false;

  constructor() {}

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  authenticateUser(usrName: string, password: string) {
    console.log("login from: " + usrName + "." + password);
    // for test purposes
    this.authenticated = true; // if authenticated by authentication server
  }
}
