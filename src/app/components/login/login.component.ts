import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { User, UserInfo } from 'firebase/app';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  providers = AuthProvider;

  user: User;
  user$: Observable<User>;

  constructor(
    // public auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {

  }

  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }

}
