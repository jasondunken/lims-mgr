import { environment } from "../../environments/environment";

import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { timeout, catchError, tap } from "rxjs/operators";

import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  private users: User[] = [];

  private authenticated = false;
  private authToken = "";

  constructor(private http: HttpClient) {}

  // /Users - returns json: all registered users
  getUsers(): Observable<User[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authToken
      })
    };
    return this.http.get<User[]>(environment.apiUrl + "api/users/").pipe(
      timeout(5000),
      tap(users => {
        if (users) {
          console.log(users);
          this.users = [...users];
        }
      }),
      catchError(err => {
        console.log("Error getting userlist: ", err);
        return throwError(err);
      })
    );
  }

  getUserByName(username: string): User {
    for (const user of this.users) {
      if (user.username === username) {
        return user;
      }
    }
  }

  // /Users/register
  registerNewUser(
    fName: string,
    lName: string,
    username: string,
    password: string
  ): Observable<User> {
    const newUser = {
      FirstName: fName,
      LastName: lName,
      Username: username,
      Password: password
    };
    const request = JSON.stringify(newUser);
    console.log("Registering new user ", request);
    return this.http
      .post<any>(environment.apiUrl + "api/users", request, this.httpOptions)
      .pipe(
        timeout(5000),
        tap((response: any) => {
          console.log("response from Users/register: " + response);
        }),
        catchError(err => {
          return of({ error: "falied to register user!" });
        })
      );
  }

  // /Users/authenticate
  login(username: string, password: string): Observable<any> {
    const login = {
      username,
      password
    };
    const request = JSON.stringify(login);
    console.log("Logging in user ", request);
    return this.http
      .post<any>(environment.apiUrl + "api/login", request, this.httpOptions)
      .pipe(
        timeout(5000),
        tap((response: any) => {
          this.authToken = response.token;
          if (
            this.authToken !== null &&
            this.authToken !== "null" &&
            this.authToken !== undefined &&
            this.authToken !== ""
          ) {
            this.authenticated = true;
          }
        }),
        catchError(err => {
          return of({ error: "falied to login user!" });
        })
      );
  }

  // api call
  logout(): void {
    this.authenticated = false;
    this.authToken = "";
  }

  // api call
  disableUser(username: string): void {
    // disable an existing user and update userlist
    const user = this.getUserByName(username);
    user.dateDisabled = Date.now().toString();
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getAuthToken(): string {
    return this.authToken;
  }
}
