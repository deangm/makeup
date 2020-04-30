import { Component, OnInit } from '@angular/core';

import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';

import { AuthProvider } from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public auth: AuthProcessService,
  ){}
  title = 'makeup';
  loggedIn = true;
  googleLoggedIn: boolean;

  providers = AuthProvider;

  ngOnInit(){
    this.auth.user$.subscribe(user => {
      user == null ? this.googleLoggedIn = false : this.googleLoggedIn = true;
    });
  }


}
