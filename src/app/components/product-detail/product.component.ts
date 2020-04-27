import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import * as data from '../../../../products.json'
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  product 
  color = "default"
  userid
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

  addToCart(){
    let item = {
      product: this.product,
      color: this.color,
      user: this.userid ? this.userid : 1
    }
    this.cartService.saveToCart(item)
  }

}
