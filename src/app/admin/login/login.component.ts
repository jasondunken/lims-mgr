import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registeringUser = false;

  usrName: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login(username: HTMLInputElement, password: HTMLInputElement): void {
    this.auth
      .login(username.value, password.value)
      .pipe(
        tap(user => {
          this.router.navigateByUrl('/tasks');
        })
      )
      .subscribe();
  }

  register(): void {
    this.registeringUser = true;
  }

  isRegistering($event): void {
    this.registeringUser = $event;
  }
}
