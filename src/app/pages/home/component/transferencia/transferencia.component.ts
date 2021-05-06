import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { from, Subscription } from 'rxjs';

import { BaseFormTransferecia } from '@shared/utils/base.form.transferencia';
import { BancoService } from '@services/banco.service';
import { DestinatarioResponse, Destinatario} from '@shared/models/destinatario.interface';
import { DestinatarioService } from '@services/destinatario.service';
import { BancoResponse } from '@shared/models/banco.interface';
import { TransaccionService } from '@services/transaccion.service';
import { TransaccionResponse, Transaccion  } from '@shared/models/transaccion.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  public bancos: BancoResponse;
  public destinatarios: DestinatarioResponse;
  public destinatario: DestinatarioResponse;
  private idUsuario: number;
  private subscription: Subscription = new Subscription();
  private des = [];
  private des2 = [];
  public banco = [];
  public bancoDestinatario: string;
  public idBancoDestinatario: string;
  public saldoCliente;
  public formatoMonto;
  public nuevoSaldo;
  public errorSaldo: boolean = false;

  constructor(
    private bancoService: BancoService,
    private destinatarioService: DestinatarioService,
    public transferenciaForm: BaseFormTransferecia,
    public transaccionService: TransaccionService
  ) { }

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('id'));
    this.destinatarioPorUsuario(this.idUsuario);
    this.buscarBanco();
    this.obtenerSaldoCliente(this.idUsuario);
  }

  destinatarioPorUsuario(idUsuario: Number) {
    this.subscription.add(
      this.destinatarioService.destinatarioPorUsuario(idUsuario).subscribe((res: DestinatarioResponse) => {
        this.destinatarios = res;
        this.des.push(res);
      })
    );
  }

  buscarBanco() {
    this.subscription.add(
      this.bancoService.getBancos().subscribe((res: BancoResponse) => {
        this.bancos = res;
      })
    );
  }

  buscarDestinatario(idDestinatario) {
    this.des.forEach(e => {
      e.forEach(x => {
        this.des2.push(x);
      });
    });
    this.bancos['banks'].forEach(element => {
      this.banco.push(element);
    });

    this.destinatario = this.des2.find(x => x.id_destinatario == idDestinatario);
    this.bancoDestinatario = this.banco.find(e => e.id == this.destinatario.id_banco)['name'];
    this.idBancoDestinatario = this.banco.find(e => e.id == this.destinatario.id_banco)['id'];
  }

  obtenerSaldoCliente(idCliente) {
    this.subscription.add(
      this.transaccionService.obtenerSaldoCliente(idCliente).subscribe((res: TransaccionResponse) => {
        this.saldoCliente = res.saldo;
      })
    );
  }

  onCreate(): void {
    const formValue = this.transferenciaForm.baseForm.value;
    let nuevoSaldo = Number(this.saldoCliente) - Number(formValue.monto)
    this.nuevoSaldo = nuevoSaldo;
    
    formValue.id = 1;
    formValue.id_cliente = this.idUsuario;
    formValue.id_banco = this.idBancoDestinatario;
    formValue.nuevoSaldo = nuevoSaldo;

    const saldoCero = this.validarSaldoCero(Number(this.saldoCliente), Number(formValue.monto));

    if (Number(formValue.monto == 0)) {
      Swal.fire({
        title: 'Transferencia de Dinero',  
        text: 'El monto a transferir debe ser mayor a cero!',  
        icon: 'error'
      });
      return;
    }
    
    if (saldoCero == true) {
      if (this.transferenciaForm.validarFormulario()){
        Swal.fire({
          title: 'Transferencia de Dinero',  
          text: 'Esta seguro que desea realizar la transferencia?',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonText: 'Sí, transferir!',  
          cancelButtonText: 'No, cancelar'
        }).then ((result) =>{
          if (result.value == true){
            this.subscription.add(
              this.transaccionService.guardarTransferencia(formValue).subscribe((res: TransaccionResponse) => {
                if(res.status == 200)
                  Swal.fire(res.message)
                    .then((result) => window.location.reload());
              }, err => console.log(err))
            );
            this.errorSaldo = false;
          }
        });
      } else {
        this.errorSaldo = true;
      }
    } else {
      Swal.fire({
        title: 'Transferencia de Dinero',  
        text: 'El monto a transferir no puede superar el saldo disponible!',  
        icon: 'error'
      })
    }
  }

  validarSaldoCero(monto: number, saldo: number): boolean {
    const valid = this.transferenciaForm.validarSaldoCero(monto, saldo);
    return valid;
  }

  validarCampo(field: string): boolean {
    const valid = this.transferenciaForm.validarCampo(field);
    return valid;
  }

  formatoMoneda(montoInput) {
    const formValue = this.transferenciaForm.baseForm.value;
    let nuevoSaldo = Number(this.saldoCliente) - Number(formValue.monto)
    this.nuevoSaldo = nuevoSaldo;

    //const monto = montoInput.toString().replaceAll('.', '');
    //this.formatoMonto = monto.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
