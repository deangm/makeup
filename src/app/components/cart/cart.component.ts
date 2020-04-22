import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  userid
  products

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cartService.getObservable().subscribe(product => {
      console.log(product)
    })
    this.authService.user$.subscribe(user => {
      this.userid = user.uid
      console.log(this.userid)
    })
    this.products = this.productsService.allProducts
  }

}
