import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../+state/auth/auth.facade';

@Component({
  selector: 'lib-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
      this.authFacade.register(email, password);
    }
  }
}
