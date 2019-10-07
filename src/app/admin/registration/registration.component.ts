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

  ngOnInit() {}

  registerUser(fName: HTMLInputElement, lName: HTMLInputElement, username: HTMLInputElement, password: HTMLInputElement) {
    this.auth.registerNewUser(fName.value, lName.value, username.value, password.value).subscribe(response => {
      this.handleRegisterResponse(response);
    });
  }

  handleRegisterResponse(response): void {
    // this endpoint returns null on success
    if (response) {
      if (response.error) {
        console.log('Registration response error: ' + response.error);
      } else {
        console.log(response);
      }
    }
    this.cancel();
  }

  cancel(): void {
    this.registeringUser.emit(false);
  }
}
