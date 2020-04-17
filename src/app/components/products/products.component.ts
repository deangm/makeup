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

  public products:Observable<any>;
  public loaded: boolean = false;
  public brandName: string;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.productsService.loaded) {
      this.setState(this.productsService.products, true);
      return;
    }
    this.productsService.getProducts().subscribe(products => {
      console.log(products);
      this.setState(products, true);
    })
  }

  getProductsByBrand() {
    this.productsService.getProductsByBrand(this.brandName).subscribe(products => {
      console.log(products);
    })
  }

  setState(products, bool: boolean): void {
    this.loaded = bool;
    this.products = products;
  }
}
