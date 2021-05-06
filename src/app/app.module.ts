import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './pages/auth/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserInterceptor } from '@shared/interceptors/user.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginModule,
    HomeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
