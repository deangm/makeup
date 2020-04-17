import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL: string = 'https://makeup-api.herokuapp.com/api/v1/products.json';
  public loaded: boolean = false;
  public products: any = '';

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    this.http.get<Observable<any>>(this.URL).subscribe(products => {
      this.products = products;
      this.loaded = true
    })
    return this.http.get<Observable<any>>(this.URL);
  }

  getProductsByBrand(brand: string) {
    return this.http.get<Observable<any>>(`${this.URL}?brand=${brand}`)
  }
}
