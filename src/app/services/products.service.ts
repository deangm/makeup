import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL: string = 'http://makeup-api.herokuapp.com/api/v1/products.json';
  public loaded: boolean = false;
  public allProducts: any = '';
  public products: any = '';
  public brands: any = [];

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    this.http.get<Observable<any>>(this.URL).subscribe(products => {
      this.allProducts = products;
      this.products = products;
      this.loaded = true;
      this.getBrands();
    })
    return this.http.get<Observable<any>>(this.URL);
  }

  getProductsByType(type: string) {
    return this.http.get<Observable<any>>(`${this.URL}?product_type=${type}`)
  }

  getBrands() {
    this.allProducts.forEach(prod => {
      if(this.brands.indexOf(prod.brand) == -1) {
        this.brands.push(prod.brand);
      }
    })
  }
}
