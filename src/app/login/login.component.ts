import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usrName: string;
  password: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  login(usrName: HTMLInputElement, password: HTMLInputElement): void {
    this.auth.authenticateUser(usrName.value, password.value);
  }
}
