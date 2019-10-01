import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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
  testUser1: User = {
    fName: null,
    lName: null,
    username: 'kwolfe',
    dateAdded: '1/1/2019',
    dateDisabled: null
  };
  testUser2: User = {
    fName: null,
    lName: null,
    username: 'brittany stuart',
    dateAdded: '2/2/2018',
    dateDisabled: null
  };
  testUser3: User = {
    fName: null,
    lName: null,
    username: 'j dog',
    dateAdded: '3/1/1970',
    dateDisabled: null
  };
  testUser4: User = {
    fName: null,
    lName: null,
    username: 'dr parmar',
    dateAdded: '12/12/2099',
    dateDisabled: null
  };
  users: User[] = [this.testUser1, this.testUser2, this.testUser3, this.testUser4];

  private authenticated = false;
  private authToken = '';

  constructor(private http: HttpClient) {}

  // api call
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
        return this.users;
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

  // /users/register
  registerNewUser(fName: string, lName: string, username: string, password: string): Observable<User> {
    const newUser = {
      FirstName: fName,
      LastName: lName,
      Username: username,
      Password: password
    };
    const request = JSON.stringify(newUser);
    return this.http.post<any>(environment.apiUrl + 'Users/register', request, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('response from Users/register: ' + response);
      }),
      catchError(err => {
        console.log('HTTP error: ', err);
        return throwError(err);
      })
    );
  }

  // /users/authenticate
  login(username: string, password: string): Observable<any> {
    const login = {
      Username: username,
      Password: password
    };
    const request = JSON.stringify(login);
    return this.http.post<any>(environment.apiUrl + 'Users/authenticate', request, this.httpOptions).pipe(
      tap((response: any) => {
        this.authToken = response.token;
        if (this.authToken !== null && this.authToken !== 'null' && this.authToken !== undefined && this.authToken !== '') {
          this.authenticated = true;
        }
      }),
      catchError(err => {
        console.log('HTTP error: ', err);
        return throwError(err);
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
