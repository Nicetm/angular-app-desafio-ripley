import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { UserResponse } from '@shared/models/user.interface';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isLogged = false;
  private storage: string = null;
  private destroy$ = new Subject<any>();

  constructor(
    private router: Router,
    public authSvc: AuthService
  ) {}

  ngOnInit() {
    this.storage = localStorage.getItem('user')
    if (this.storage == null) {
      this.router.navigate(['/']);
    }
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isLogged = true;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  
}
