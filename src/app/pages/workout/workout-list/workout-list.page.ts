// src/app/pages/workout/workout-list/workout-list.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterLink, Router }        from '@angular/router';    // ← importer la directive
import { WorkoutService }           from '../../../core/workout.service';
import { WorkoutDTO }               from '../../../shared/models/models';
import { Observable }               from 'rxjs';
import { ToastService } from 'ngx-french-toast';
import { HlmCardModule } from '@spartan-ng/helm/card';
import { HlmButtonModule } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-workout-list-page',
  standalone: true,
  imports: [
    CommonModule,RouterLink, HlmCardModule, HlmButtonModule],
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss']
})
export class WorkoutListPage implements OnInit {
  workouts$!: Observable<WorkoutDTO[]>;

  constructor(private workoutService: WorkoutService, private router: Router, private toast: ToastService) {}

  ngOnInit(): void {
    this.workouts$ = this.workoutService.getAll();
  }

  trackByWorkoutId(index: number, workout: WorkoutDTO): number {
    return workout.id!;
  }

  editWorkout(workout: WorkoutDTO) {
    // Navigate to workout edit page (to be implemented)
    this.router.navigate(['/workouts', workout.id, 'edit']);
  }

  deleteWorkout(workout: WorkoutDTO) {
    if (confirm(`Supprimer l'entraînement "${workout.name}" ?`)) {
      this.workoutService.delete(workout.id!).subscribe({
        next: () => {
          this.toast.success({ title: 'Supprimé', content: 'Entraînement supprimé.' });
          this.workouts$ = this.workoutService.getAll();
        },
        error: () => {
          this.toast.danger({ title: 'Erreur', content: 'Erreur lors de la suppression.' });
        }
      });
    }
  }

  createWorkout() {
    this.router.navigate(['/workouts/create']);
  }
}
