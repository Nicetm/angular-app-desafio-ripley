import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BaseFormDestinatario } from '@shared/utils/base.form.destinatario';
import { BancoService } from '@services/banco.service';
import { DestinatarioService } from '@services/destinatario.service';
import { BancoResponse, TipoCuentasResponse, TipoCuentas } from '@shared/models/banco.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinatario',
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.css']
})
export class DestinatarioComponent implements OnInit {

  public bancos: BancoResponse;
  public tipoCuentas: TipoCuentas;

  private subscription: Subscription = new Subscription();
  public err: string;
  public showError: boolean = false;
  public isLogged: boolean = false;
  private idUsuario: number;

  constructor(
    private bancoService: BancoService,
    private destinatarioService: DestinatarioService,
    public destinatarioForm: BaseFormDestinatario,
  ) {}

  ngOnInit() {
    this.idUsuario = Number(localStorage.getItem('id'));
    this.getBancos();
    this.getTipoCuentas();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getBancos(): void {
    this.subscription.add(
      this.bancoService.getBancos().subscribe((res: BancoResponse) => {
        this.bancos = res['banks'];
      })
    );
  }

  getTipoCuentas() {
    this.subscription.add(
      this.bancoService.getTipoCuentas().subscribe((res: TipoCuentas) => {
        this.tipoCuentas = res;
      })
    );
  }
  
  onCreate(): void {
    const formValue = this.destinatarioForm.baseForm.value;
    formValue.id_cliente = this.idUsuario;

    Swal.fire({
      title: 'Crear Nuevo Destinatario',  
      text: 'Esta seguro que desea crear el nuevo destinatario?',  
      icon: 'info',  
      showCancelButton: true,  
      confirmButtonText: 'Sí, crear!',  
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value == true){
        if (this.destinatarioForm.validarFormulario()){
          this.subscription.add(
            this.destinatarioService.guardarDestinarario(formValue).subscribe((res: TipoCuentasResponse) => {
              if(res.status == 200)
                  Swal.fire(res.message)
                    .then((result) => window.location.reload());
            }, err => console.log(err))
          );
        }
      }
    })
  }

  validarCampo(field: string): boolean {
    const valid = this.destinatarioForm.validarCampo(field);
    return valid;
  }
}
