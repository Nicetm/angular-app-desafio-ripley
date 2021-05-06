import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@services/auth.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
        if ([401, 403].includes(err.status) && this.authSvc.userValue) {
            this.authSvc.logout();
        }
        if (req.url.includes('home')) {
          const userValue = this.authSvc.userValue;
          const authReq = req.clone({
            setHeaders: {
              auth: userValue.token,
            },
          });
          return next.handle(authReq);
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        console.error(err);
        return throwError(error);
    }))



    /*if (req.url.includes('home')) {
      const userValue = this.authSvc.userValue;
      const authReq = req.clone({
        setHeaders: {
          auth: userValue.token,
        },
      });

      return next.handle(authReq);
    }
    
    return next.handle(req);*/
  }
}