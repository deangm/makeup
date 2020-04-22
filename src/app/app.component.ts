import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'makeup';
  loggedIn = true;


}
