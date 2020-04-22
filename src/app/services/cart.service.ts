import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartRef: AngularFirestoreCollection<any>

  constructor(
    private db: AngularFirestore
  ) {
    this.cartRef = this.db.collection<any>('cart')
  }

  saveToCart(product) {
    return this.cartRef.add(product)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  getObservable(): Observable<any[]> {
    return this.cartRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<any>[]): any[] => {
          return items.map((item: DocumentChangeAction<any>): any => {
            console.log(item.payload.doc.data())
            return {
              docId: item.payload.doc.id,
              userId: item.payload.doc.data().user,
              product: item.payload.doc.data().product,
              productColor: item.payload.doc.data().color
            };
          });
        })
      );
  }
}
  
