import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // TODO
  // change search field to select field for makeup

  public products: any = [];
  public loaded: boolean = false;
  public productType: string;
  public brands: any[] = [];
  public isFilteredSearch: boolean;
  public categories: string[] = [];

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.productsService.loaded) {
      this.setState(this.productsService.products, true);
      this.getCategories();
    }
    else {
      this.productsService.getProducts().subscribe(products => {
        console.log(products);
        this.setState(products, true);
        this.getCategories();
      })
    }
  }

  getCategories(){ 
    this.categories = this.productsService.getCategories();
  }

  resetSearch() {
    this.productsService.resetFilter();
    this.productsService.getBrands();
    this.products = this.productsService.allProducts;
    this.productType = '';
    this.isFilteredSearch = false;
    this.brands = [];
  }

  getProductsByType() {
    this.products = this.productsService.getProductsByType(this.productType);
    this.productsService.getBrands();
    this.brands = [];
    this.isFilteredSearch = true;
  }

  selectProduct(product) {
    this.productsService.selectedProduct = product;
    this.router.navigate([`/product/${product.id}`]);
  }

  setState(products, bool: boolean): void {
    this.loaded = bool;
    this.products = products;
  }

  filterBrands(brand){
    let idx = this.productsService.brands.findIndex(brd => brd.brand == brand.brand);
    let brd = this.productsService.brands[idx].selected;
    if(brd === false){
      this.productsService.brands[idx].selected = true;
      this.brands.push(brand.brand);
    } else {
      this.productsService.brands[idx].selected = false;
      this.brands.splice(this.brands.indexOf(brand.brand), 1);
    }
    if(this.brands.length == 0) {this.products = this.productsService.products}
    else {this.products = this.productsService.filterBrands(this.brands)};
  }
  
  routeToDetails(product){
    this.router.navigate(['/product', product])
  }

}

