import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product-detail/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent, canActivate: [LoggedInGuard]},
  {path: 'product/:id', component: ProductComponent, canActivate: [LoggedInGuard]},
  {path: 'cart', component: CartComponent, canActivate: [LoggedInGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [LoggedInGuard]},
  {path: 'checkout-success', component: CheckoutSuccessComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
