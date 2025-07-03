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
  },
  {
    path: 'workouts/create',
    loadComponent: () =>
      import('./pages/workout/workout-create/step1/workout-create-step1/workout-create-step1.component')
        .then(m => m.WorkoutCreateStep1Component)
  },
  {
    path: 'workouts/:id/exercises',
    loadComponent: () =>
      import('./pages/workout/workout-create/step2/workout-create-step2/workout-create-step2.component')
        .then(m => m.WorkoutCreateStep2Component)
  },
  {
  path: 'workouts/:id',
  loadComponent: () =>
    import('./pages/workout/workout-detail/workout-detail.component')
      .then(m => m.WorkoutDetailComponent)
},
{
  path: 'workouts/:id/edit',
  loadComponent: () => import('./pages/workout/workout-edit/workout-edit.component').then(m => m.WorkoutEditComponent),
  canActivate: [AuthGuard]
},
{
  path: 'progress',
  loadComponent: () => import('./pages/progress/progress.page').then(m => m.ProgressPage),
  canActivate: [AuthGuard]
}


];
