import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  userid
  products;
  userProducts: any[] = [];
  totalPrice: number;
  priceWithTax: number;
  tax: number;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
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
          this.userProducts.push({product: prod.product, color: prod.productColor, docId: prod.docId});
        }
      })
    }
    this.totalPrice = this.cartService.getTotalPrice(this.userProducts);
    this.priceWithTax = this.totalPrice * 1.047;
    this.tax = this.priceWithTax - this.totalPrice;
  }

  deleteItem(product) {
    this.cartService.deleteProduct(product.docId);
  }
  checkout() {
    this.router.navigate(['/checkout'])
  }
}
