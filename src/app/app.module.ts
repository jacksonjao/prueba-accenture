import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputErrorComponent } from './input-error/input-error.component';
import {HttpClientModule} from '@angular/common/http';
import {DbService} from './db.service';
import { ApplyForCreditComponent } from './apply-for-credit/apply-for-credit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    InputErrorComponent,
    ApplyForCreditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
