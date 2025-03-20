import { Routes } from '@angular/router';
import { LoginComponent } from '@ionic-firebase-monorepo/auth';
import { RegisterComponent } from '@ionic-firebase-monorepo/auth';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'register',
    loadComponent: () => RegisterComponent,
  },
];
