import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsRef : AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) {
    this.reviewsRef = this.db.collection<any>('reviews')
   }

   getReviewsForProduct(){
     return this.reviewsRef.valueChanges()
   }

   addReview(review){
     return this.reviewsRef.add(review)
   }
}
