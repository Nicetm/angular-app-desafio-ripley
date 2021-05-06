import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { DestinatarioComponent } from './component/destinatario/destinatario.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from '@shared/interceptors/user.interceptor';
import { TransferenciaComponent } from './component/transferencia/transferencia.component';
import { HistorialComponent } from './component/historial/historial.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    DestinatarioComponent,
    TransferenciaComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe, { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
