import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { CartService } from 'src/app/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {

  public products: any = [];
  public loaded: boolean = false;
  public productType: string;
  public sortType: string;
  public brands: any[] = [];
  public isFilteredSearch: boolean;
  public categories: string[] = [];
  public userid: string;
  public itemAddedMessage: boolean = false;

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private authService: AuthProcessService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(typeof user === 'object' && user !== null){
        this.userid = user.uid;
      }
    })
    if (this.productsService.loaded) {
      this.setState(this.productsService.products, true);
      this.getCategories();
    }
    else {
      this.productsService.getProducts().subscribe(products => {
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
    this.productType = undefined;
    this.sortType = undefined;
    this.isFilteredSearch = false;
    this.brands = [];
    this.products = this.productsService.allProducts;
    console.log(this.productsService.allProducts);
  }

  animateMessage(){
    this.itemAddedMessage = true;
    setTimeout(() => {this.itemAddedMessage = false}, 1700)
  }

  addToCart(product) {
    if(this.userid){
      let item = {
        product: product,
        color: 'default',
        user: this.userid ? this.userid : 1
      }
      this.cartService.saveToCart(item);
      this.animateMessage()
    }
  }

  sortProducts(){
    if(this.sortType === 'priceLTH') {
      this.products = this.products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if(this.sortType === 'priceHTL') {
      this.products = this.products.sort((a, b) => Number(a.price) - Number(b.price)).reverse();
    }
  }

  getProductsByType() {
    if(this.productType == undefined) return;
    this.isFilteredSearch = true;
    this.products = this.productsService.getProductsByType(this.productType);
    this.productsService.getBrands();
    this.brands = [];
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

