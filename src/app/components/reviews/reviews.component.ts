import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() reviews

  constructor() { }

  ngOnInit(): void {
  }

}
