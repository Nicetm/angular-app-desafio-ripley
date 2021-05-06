import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { takeUntil } from 'rxjs/operators';

import { UserResponse } from '@shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged = false;
  private destroy$ = new Subject<any>();

  constructor(public authSvc: AuthService) { }

  ngOnInit(): void {
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

  onLogout(): void {
    this.authSvc.logout();
  }

}
