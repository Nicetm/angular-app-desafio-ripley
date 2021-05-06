import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HistorialResponse } from '@shared/models/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private historial = new BehaviorSubject<HistorialResponse>(null);

  constructor(private http: HttpClient, private router: Router) { }


  obtenerHistorial(id) {
    return this.http
      .get<HistorialResponse>(environment.historialUrl + '/' + id)
      .pipe(
        map((historial: HistorialResponse) => {
          this.historial.next(historial);
          return historial;
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
