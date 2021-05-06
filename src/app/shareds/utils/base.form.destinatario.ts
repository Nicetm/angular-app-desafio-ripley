import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormDestinatario{

  private isValidEmail = /\S+@\S+\.\S+/;
  error = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    id_cliente: ['',],
    rut: ['',Validators.required],
    nombre: ['', Validators.required],
    apellido_materno: ['',],
    aoellido_paterno: ['',],
    correo: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    telefono: ['', Validators.required],
    numero_cuenta: ['', Validators.required],
    id_banco: ['', Validators.required],
    id_tipo_cuenta: ['', Validators.required],
  });

  validarCampo(field: string): boolean {
    this.errorMensaje(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) && !this.baseForm.get(field).valid
    );
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
        pattern: 'No es un correo valido.',
        minlength: `Ingrese más de ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.error = messages[errorKey];
    }
  }
}
