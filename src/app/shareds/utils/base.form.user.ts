import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {

  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    rut: ['', Validators.required],
    clave: ['', [Validators.required, Validators.minLength(5)]]
  });

  validarCampo(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) && !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Campo requerido.',
        pattern: '',
        minlength: `No puede ingresar menos de ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
