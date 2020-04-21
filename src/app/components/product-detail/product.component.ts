import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product
  form: FormGroup;
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.product = this.productsService.selectedProduct
    this.form = this.fb.group({
      color: "Yellow"
    })
  }

}
