import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormTransferecia{

  private numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  error = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    id: ['',],
    id_destinatario: ['', Validators.required],
    id_cliente:['',],
    id_banco:['',],
    monto: ['', [Validators.required, Validators.pattern(this.numericNumberReg)]],
    nuevoSaldo: ['',]
  });

  validarCampo(field: string): boolean {
    this.errorMensaje(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) && !this.baseForm.get(field).valid
    );
  }

  validarSaldoCero(monto: number, saldo: number): boolean {
    const resta = monto - saldo;
    if (resta < 0) {
      return this.baseForm.invalid;
    } else {
      return true;
    }
  }

  validarFormulario(): boolean {
    return this.baseForm.valid;
  }

  private errorMensaje(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Campo obligatorio.',
        pattern: 'No es un numero valido.',
        minlength: `Ingrese más de ${minlenght} caracteres`
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.error = messages[errorKey];
    }
  }
}