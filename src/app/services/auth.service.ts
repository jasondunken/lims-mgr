import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private users: User[] = [];

  private authenticated = false;
  private authToken = '';

  constructor(private http: HttpClient) {}

  // /Users
  getUsers(): Observable<User[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken
      })
    };
    return this.http.get<User[]>(environment.apiUrl + 'Users', options).pipe(
      tap(users => {
        if (users) {
          this.users = [...users];
        }
      }),
      catchError(err => {
        console.log('Error getting userlist: ', err);
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
  registerNewUser(fName: string, lName: string, username: string, password: string): Observable<User> {
    const newUser = {
      FirstName: fName,
      LastName: lName,
      Username: username,
      Password: password
    };
    const request = JSON.stringify(newUser);
    console.log('Registering new user ', request);
    return this.http.post<any>(environment.apiUrl + 'Users/register', request, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('response from Users/register: ' + response);
      }),
      catchError(err => {
        return of({ error: 'falied to register user!' });
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
    console.log('Logging in user ', request);
    return this.http.post<any>(environment.apiUrl + 'Users/authenticate', request, this.httpOptions).pipe(
      tap((response: any) => {
        this.authToken = response.token;
        if (this.authToken !== null && this.authToken !== 'null' && this.authToken !== undefined && this.authToken !== '') {
          this.authenticated = true;
        }
      }),
      catchError(err => {
        return of({ error: 'falied to login user!' });
      })
    );
  }

  // api call
  logout(): void {
    this.authenticated = false;
    this.authToken = '';
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
