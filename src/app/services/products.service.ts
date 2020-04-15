import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts():Observable<any>{
    return this.http.get('http://makeup-api.herokuapp.com/api/v1/products.json')
  }
}
