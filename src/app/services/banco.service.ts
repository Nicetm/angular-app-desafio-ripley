import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BancoResponse, TipoCuentas } from '@shared/models/banco.interface';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private banco = new BehaviorSubject<BancoResponse>(null);
  private tipoCuenta = new BehaviorSubject<TipoCuentas>(null);

  constructor(private http: HttpClient, private router: Router) { }

  getBancos() {
    return this.http
      .get<BancoResponse>(environment.bancosURL)
      .pipe(
        map((banco: BancoResponse) => {
          this.banco.next(banco);
          return banco;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  getTipoCuentas() {
    return this.http
      .get<TipoCuentas>(environment.tipoCuentasURL)
      .pipe(
        map((tipoCuenta: TipoCuentas) => {
          this.tipoCuenta.next(tipoCuenta);
          return tipoCuenta;
        }),
        catchError((err) => this.handlerError(err))
      );
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
