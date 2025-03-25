/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../+state/auth/auth.facade';

@Component({
  selector: 'lib-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;
  loading$;
  error$;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loading$ = this.authFacade.loading$;
    this.error$ = this.authFacade.error$;
  }

  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authFacade.login(email, password);
    }
  }
}
