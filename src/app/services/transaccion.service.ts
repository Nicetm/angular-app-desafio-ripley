import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TransaccionResponse, Transaccion } from '@shared/models/transaccion.interface';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private transaccion = new BehaviorSubject<TransaccionResponse>(null);

  constructor(private http: HttpClient, private router: Router) { }


  obtenerSaldoCliente(id) {
    return this.http
      .get<TransaccionResponse>(environment.transaccionUrl + '/' + id)
      .pipe(
        map((transaccion: TransaccionResponse) => {
          this.transaccion.next(transaccion);
          return transaccion;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  guardarTransferencia(formData: TransaccionResponse) {
    console.log(formData)
    return this.http.post(environment.transaccionUrl, formData)
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
