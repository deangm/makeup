import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import * as data from '../../../../products.json'
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

import { trigger, transition, style, animate } from '@angular/animations';

import { ReviewsService } from 'src/app/services/reviews.service';


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

  reviews
  review_text 


  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private reviewService: ReviewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userid = user.uid
    })

    this.reviewService.getReviewsForProduct().subscribe(reviews => {
      this.reviews = reviews.filter(review => review.product_id == this.route.snapshot.params.id)
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

  addReview(){
    if (this.review_text){
      let review = {
        review: this.review_text,
        product_id: this.product.id
      }
      this.reviewService.addReview(review)
    }
    else{
      console.log("NO TEXT IN REVIEW")
    }
      
  }

}
