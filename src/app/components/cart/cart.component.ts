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
  products;
  userProducts: any[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cartService.getObservable().subscribe(product => {
      this.products = product;
    })
    this.authService.user$.subscribe(user => {
      if(typeof user === 'object' && user !== null){
        this.userid = user.uid
        this.getUsersProducts();
      }
    })
  }

  getUsersProducts(){
    if(this.products && this.userid){
      this.products.forEach(prod => {
        if(prod.userId == this.userid) {
          this.userProducts.push({product: prod.product, color: prod.productColor});
        }
      })
    }
    console.log(this.userProducts);
  }
}
