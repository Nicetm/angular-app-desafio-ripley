import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HistorialService } from '@services/historial.service';
import { HistorialResponse } from '@shared/models/historial.interface';
import { BancoService } from '@services/banco.service';
import { BancoResponse } from '@shared/models/banco.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public historial: HistorialResponse;
  public bancos: BancoResponse;
  private idUsuario: number;
  public idBancoDestinatario: string;
  public banco = [];

  private subscription: Subscription = new Subscription();

  constructor(
      private historialService: HistorialService,
      private bancoService: BancoService,
    ) { }

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('id'));
    this.obtenerHistorial(this.idUsuario);
  }

  buscarBanco(): void {
    this.subscription.add(
      this.bancoService.getBancos().subscribe((res: BancoResponse) => {
        this.bancos = res;
        this.bancos['banks'].forEach(element => {
          this.banco.push(element);
        });
      })
    );
  }
  
  obtenerHistorial(idUsuario: number): void {
    this.subscription.add(
      this.historialService.obtenerHistorial(idUsuario).subscribe((res: HistorialResponse) => {
        this.historial = res;
        this.buscarBanco();
      })
    );
  }

  buscarBancoPorId(idBanco: string): string {
    var nombreBanco = this.banco.find(e => e.id === idBanco);
    return nombreBanco['name'];
  }
}
