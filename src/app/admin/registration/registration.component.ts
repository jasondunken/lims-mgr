import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() registeringUser = new EventEmitter<boolean>();

  constructor(private auth: AuthService) {}

  ngOnInit() {
    console.log('registrating module onInit()');
  }

  registerUser(fName: HTMLInputElement, lName: HTMLInputElement, username: HTMLInputElement, password: HTMLInputElement) {
    this.auth.registerNewUser(fName.value, lName.value, username.value, password.value).subscribe(() => {
      this.registeringUser.emit(false);
    });
  }

  cancel(): void {
    this.registeringUser.emit(false);
  }
}
