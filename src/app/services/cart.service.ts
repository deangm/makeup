import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartRef: AngularFirestoreCollection<any>
  public usersCartProducts: any[] = [];

  constructor(
    private db: AngularFirestore
  ) {
    this.cartRef = this.db.collection<any>('cart')
  }

  getTotalPrice(products){
    let priceTotal = 0;
    products.forEach(prod => {
      let price = Number(prod.product.price);
      priceTotal += price;
    })
    return priceTotal;
  }

  deleteProduct(docId){
    return this.db.collection('cart').doc(docId).delete();
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
  
