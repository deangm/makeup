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
  public categories: any = [];
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
  
  resetFilter(){
    this.products = this.allProducts;
  }

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
    this.products = this.allProducts.filter(prod => {
      return prod.category == type;
    })
    return this.products;
  }

  getCategories(){
    this.categories = [];
    this.allProducts.forEach(prod => {
      let idx = this.categories.findIndex(cat => cat == prod.category);
      if(idx == -1 && (prod.category != null && prod.category != '')) {
        this.categories.push(prod.category);
      }
    })
    return this.categories;
  }
  
  getBrands() {
    this.brands = [];
    this.products.forEach(prod => {
      let idx = this.brands.findIndex(brd => brd.brand == prod.brand);
      if(idx == -1) {
        this.brands.push({brand: prod.brand, selected: false});
      }
    })
  }
}
