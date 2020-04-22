import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import  *  as  data  from  './products.json'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL: string = 'https://makeup-api.herokuapp.com/api/v1/products.json';
  public loaded: boolean = false;
  public allProducts: any = '';
  public products: any = '';
  public brands: any = [];
  public selectedProduct: any = undefined;

  constructor(
    private http: HttpClient
  ) { }

  filterBrands(brands) {
    return this.products.filter(product => {
      for(let i = 0; i < brands.length; i++) {
        if(product.brand == brands[i]) return true;
      }
    })
  }

  getProducts() {
    // this.http.get<Observable<any>>(this.URL).subscribe(products => {
    //   this.allProducts = products;
    //   this.products = products;
    //   this.loaded = true;
    //   this.getBrands();
    // })
    // return this.http.get<Observable<any>>(this.URL);
  }

  getProductsByType(type: string) {
    this.products = this.allProducts.filter(prod => {
      return prod.category == type;
    })
    return this.products;
  }
  
  getBrands() {
    this.brands = [];
    this.products.forEach(prod => {
      if(this.brands.indexOf(prod.brand) == -1) {
        this.brands.push(prod.brand);
      }
    })
  }
}
