import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {DestinatarioResponse, Destinatario } from '@shared/models/destinatario.interface';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  public destinatarios = new BehaviorSubject<DestinatarioResponse>(null);

  constructor(private http: HttpClient) { }

  destinatarioPorUsuario(idUsuario: Number) {
    return this.http
      .get<DestinatarioResponse>(environment.destinatariosURL +'/'+ idUsuario)
      .pipe(
        map((destinatarios: DestinatarioResponse) => {
          this.destinatarios.next(destinatarios);
          return destinatarios;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  guardarDestinarario(formData: Destinatario) {
    return this.http.post(environment.destinatariosURL, formData)
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'Ha ocurrido un error al obtener los datos';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
