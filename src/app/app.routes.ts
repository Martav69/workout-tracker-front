import { Routes } from '@angular/router';
import { LoginPage } from './auth/login.page';
import { DashboardPage } from './workout/dashboard.page';
import { HomeComponent } from './pages/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },

];
