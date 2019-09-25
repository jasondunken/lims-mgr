import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  register(fName: string, lName: string, username: string, password: string) {
    this.auth.registerNewUser(fName, lName, username, password);
  }
}
