import { Routes } from '@angular/router';
import { LoginPage } from './auth/login.page';
import { DashboardPage } from './workout/dashboard.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },
];
