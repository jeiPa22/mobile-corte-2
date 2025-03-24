import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '@angular/fire/auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { user }) => ({
      ...state,
      loading: false,
      user,
    })
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(AuthActions.logout, (state) => ({ ...state, user: null }))
);
