import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product-detail/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';







@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    CheckoutComponent,
    LoginComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAuthFirebaseUIModule.forRoot(
      {
        apiKey: 'AIzaSyDoTY8JSuaHj3raMc1mabQc15NZiaPq_OU',
        authDomain: 'makeup-ecomm.firebaseapp.com',
        databaseURL: 'https://makeup-ecomm.firebaseio.com',
        projectId: 'makeup-ecomm',
        storageBucket: 'makeup-ecomm.appspot.com',
        messagingSenderId: '328071585805',
        appId: '1:328071585805:web:13b69eecc1c11629a83544',
        measurementId: 'G-GDQZ1JB366'
      }),
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
     
      // () => 'makeup-ecomm',
      // {
      //   enableFirestoreSync: true, // enable/disable autosync users with firestore
      //   toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
      //   toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
      //   authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
      //   authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
      //   passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
      //   passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
      //   // Same as password but for the name
      //   nameMaxLength: 50,
      //   nameMinLength: 2,
      //   // If set, sign-in/up form is not available until email has been verified.
      //   // Plus protected routes are still protected even though user is connected.
      //   guardProtectedRoutesUntilEmailIsVerified: true,
      //   enableEmailVerification: true, // default: true
      // }

    MatPasswordStrengthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
