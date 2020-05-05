import { Component, OnInit } from '@angular/core';

import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';

import { AuthProvider } from 'ngx-auth-firebaseui';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public auth: AuthProcessService,
    public cartService: CartService
  ){}

  title = 'makeup';
  loggedIn = true;
  googleLoggedIn: boolean;
  products;
  userid;
  userProducts: any[] = [];

  providers = AuthProvider;

  getUsersProducts(){
    this.userProducts = [];
    if(this.products && this.userid){
      this.products.forEach(prod => {
        if(prod.userId == this.userid) {
          this.userProducts.push({product: prod.product, color: prod.productColor, docId: prod.docId});
        }
      })
      this.cartService.usersCartProducts = this.userProducts;
    }
  }

  ngOnInit(){
    this.cartService.getObservable().subscribe(product => {
      this.products = product;
      this.getUser();
    })
  }

  getUser(){
    this.auth.user$.subscribe(user => {
      if(typeof user === 'object' && user !== null) {
        this.userid = user.uid;
        this.getUsersProducts();
      }
      user == null ? this.googleLoggedIn = false : this.googleLoggedIn = true;
    });
  }
  

}
