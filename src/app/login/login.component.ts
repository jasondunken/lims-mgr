import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usrName: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login(usrName: HTMLInputElement, password: HTMLInputElement): void {
    this.auth.authenticateUser(usrName.value, password.value);
    this.router.navigate(['tasks']);
  }
}
