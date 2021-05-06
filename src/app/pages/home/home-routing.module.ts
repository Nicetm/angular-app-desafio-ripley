import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinatarioComponent } from './component/destinatario/destinatario.component';
import { TransferenciaComponent } from './component/transferencia/transferencia.component';
import { HistorialComponent } from './component/historial/historial.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,
    children: [
      { path: 'home/destinatario', component: DestinatarioComponent },
      { path: 'home/transferencia', component: TransferenciaComponent },
      { path: 'home/historial', component: HistorialComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
