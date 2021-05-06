import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base.form.user';
import { AuthService } from '@services/auth.service';
import { UserResponse, User } from '@shared/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription();
  public err: string;
  public showError: boolean = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public loginForm: BaseFormUser,
    
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    const formValue = this.loginForm.baseForm.value;

    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res: UserResponse) => {
        if (res.status == 200) {
          this.showError = false;
          this.router.navigate(['/home']);
        } else {
          this.showError = true;
          this.err = res.message;
        }
      })
    );
  }

  validarCampo(field: string): boolean {
    return this.loginForm.validarCampo(field);
  }
}
