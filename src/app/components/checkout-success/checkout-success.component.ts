import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('1800ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('1800ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class CheckoutSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
