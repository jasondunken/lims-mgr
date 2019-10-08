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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login(username: HTMLInputElement, password: HTMLInputElement): void {
    if (username.value.length < 1 || password.value.length < 1) {
      alert('Username and Password are required');
      return;
    }
    this.auth.login(username.value, password.value).subscribe(response => {
      this.handleLoginResponse(response);
    });
  }

  handleLoginResponse(response): void {
    // this endpoint returns a user object on success
    if (response.error) {
      console.log('Error:loginResponse: ' + response.error);
    } else {
      this.router.navigateByUrl('/tasks');
    }
  }

  register(): void {
    this.registeringUser = true;
  }

  isRegistering($event): void {
    this.registeringUser = $event;
  }
}
