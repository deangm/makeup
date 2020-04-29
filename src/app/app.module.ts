import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

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
import {AngularFireAuthModule } from '@angular/fire/auth';
import { ReviewsComponent } from './components/reviews/reviews.component'






@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    CheckoutComponent,
    LoginComponent,
    CartComponent,
    ReviewsComponent
  ],
  imports: [
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    NgxAuthFirebaseUIModule.forRoot(
        environment.firebase,
        () => 'makeup',
       {
         enableFirestoreSync: true, // enable/disable autosync users with firestore
         toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
         toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
         authGuardFallbackURL: '/products', // url for unauthenticated users - to use in combination with canActivate feature on a route
         authGuardLoggedInURL: '/login', // url for authenticated users - to use in combination with canActivate feature on a route
         passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
         passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
         // Same as password but for the name
         nameMaxLength: 50,
         nameMinLength: 2,
         // If set, sign-in/up form is not available until email has been verified.
         // Plus protected routes are still protected even though user is connected.
         guardProtectedRoutesUntilEmailIsVerified: true,
         enableEmailVerification: true, // default: true
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
    MatPasswordStrengthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
