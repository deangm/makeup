import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any = [];
  public loaded: boolean = false;
  public productType: string;
  public brands: string[] = [];

  constructor(
    public productsService: ProductsService,
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

  resetSearch() {
    this.products = this.productsService.allProducts;
    this.productType = '';
  }

  getProductsByType() {
    this.products = this.productsService.getProductsByType(this.productType);
    this.productsService.getBrands();
  }

  selectProduct(product) {
    this.productsService.selectedProduct = product;
    this.router.navigate([`/product/${product.id}`]);
  }

  setState(products, bool: boolean): void {
    this.loaded = bool;
    this.products = products;
  }

  filterBrands(brand) {
    let idx = this.brands.indexOf(brand);
    if(idx == -1) {
      this.brands.push(brand);
    } else {
      this.brands.splice(idx, 1);
    }
    if(this.brands.length == 0) {this.products = this.productsService.products}
    else {this.products = this.productsService.filterBrands(this.brands)};
  }

  routeToDetails(product){
    this.router.navigate(['/product', product])
  }

}

