import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import * as data from '../../../../products.json'
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProductComponent implements OnInit {


  product 
  color = "default"
  userid
  itemAddedMessage: boolean = false;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userid = user.uid
    })

    this.product = this.productsService.selectedProduct
  }

  animateMessage() {
    this.itemAddedMessage = true;
    setTimeout(() => {this.itemAddedMessage = false}, 2000)
  }

  addToCart(){
    let item = {
      product: this.product,
      color: this.color,
      user: this.userid ? this.userid : 1
    }
    this.cartService.saveToCart(item)
    this.animateMessage();
  }

}
