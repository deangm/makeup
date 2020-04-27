import { Component, OnInit } from '@angular/core';

import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { AuthProvider } from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public auth: AuthService,
  ){}
  title = 'makeup';
  loggedIn = true;
  googleLoggedIn: boolean;

  ngOnInit(){
    this.auth.user$.subscribe(user => {
      user == null ? this.googleLoggedIn = false : this.googleLoggedIn = true;
    })
  }

  providers = AuthProvider;


}
