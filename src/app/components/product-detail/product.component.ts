import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import * as data from '../../../../products.json'
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsService } from 'src/app/services/reviews.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  product = data['default'][0]
  color = "default"
  userid
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
    
    // this.product = this.productsService.selectedProduct
  }

  addToCart(){
    let item = {
      product: this.product,
      color: this.color,
      user: this.userid ? this.userid : 1
    }
    this.cartService.saveToCart(item)
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
