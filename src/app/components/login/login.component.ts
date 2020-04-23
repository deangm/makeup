import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthProvider, NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  providers = AuthProvider;

  constructor(
    // public auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  

}
