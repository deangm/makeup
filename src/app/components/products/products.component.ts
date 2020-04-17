import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Observable<any>;
  public loaded: boolean = false;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }




  ngOnInit(): void {
    if (this.productsService.loaded) {
      this.setState(this.productsService.products, true);
    }
    else {
      this.productsService.getProducts().subscribe(products => {
        console.log(products);
        this.setState(products, true);
      })
    }
  }

  setState(products, bool: boolean): void {
    this.loaded = bool;
    this.products = products;
  }
}

