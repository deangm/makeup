import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'makeup';
  products = [] 

  constructor(
    private productsService: ProductsService
  ) { }

 
  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products
    })
  }

}
