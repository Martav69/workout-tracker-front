import { Routes } from '@angular/router';
import { LoginPage } from './auth/login.page';
import { DashboardPage } from './pages/workout/dashboard.page';
import { HomeComponent } from './pages/home/home.component';
import { WorkoutListPage } from './pages/workout/workout-list/workout-list.page';
import { AuthGuard } from './core/auth.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage, canActivate:[AuthGuard] },
    {
    path: 'workouts',
    loadComponent: () =>
      import('./pages/workout/workout-list/workout-list.page').then(m => m.WorkoutListPage), canActivate:[AuthGuard] 
  }

];
