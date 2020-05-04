import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('insertRemove', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {

  userid
  products;
  userProducts: any[] = [];
  totalPrice: number;
  modal: boolean = false;
  checkoutSuccess: boolean = false;

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

  showModal(){
    this.modal = true;
  }
  hideModal(){
    this.modal = false;
  }
  
  checkout() {
    this.checkoutSuccess = true;
    setTimeout(() => {
      this.checkoutSuccess = false;
      this.router.navigate(['/checkout-success'])
    }, 1000)
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
  }

  deleteItem(product) {
    this.cartService.deleteProduct(product.docId).then(_ => {
      this.userProducts = [];
      this.getUsersProducts();
    })
  }
}