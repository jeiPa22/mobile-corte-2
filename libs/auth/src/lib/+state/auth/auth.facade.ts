import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { AuthState } from './auth.reducer';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  user$!: Observable<User | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store<AuthState>) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  login(email: string, password: string) {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  register(email: string, password: string) {
    this.store.dispatch(AuthActions.register({ email, password }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
