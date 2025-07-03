import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { WorkoutService } from '../../../core/workout.service';
import { ExerciseService } from '../../../core/exercise.service';
import { WorkoutDTO, ExerciseDTO } from '../../../shared/models/models';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastService } from 'ngx-french-toast';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-workout-detail',
  imports: [CommonModule, NgIf, NgFor, NgxChartsModule, ReactiveFormsModule],
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ws = inject(WorkoutService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);
  private es = inject(ExerciseService);

  workout?: WorkoutDTO;
  exerciseVolumeData: { name: string; value: number }[] = [];
  context7ColorScheme = { domain: ['#1e40af', '#00b8b0', '#f59e42', '#10b981', '#f43f5e', '#6366f1', '#fbbf24', '#14b8a6'] };
  editingExerciseIndex: number | null = null;
  exerciseEditForm: FormGroup | null = null;

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ws.getById(id).subscribe(w => {
      this.workout = w;
      this.computeExerciseVolume();
    }, () => this.router.navigate(['/workouts']));
  }

  edit() {
    this.router.navigate(['/workouts', this.workout!.id, 'edit']);
  }

  delete() {
    if (!confirm('Confirmer la suppression de cette séance ?')) return;
    this.ws.delete(this.workout!.id!).subscribe({
      next: () => {
        this.toast.success({ title: 'Supprimé', content: 'Séance supprimée.' });
        this.router.navigate(['/workouts']);
      },
      error: () => {
        this.toast.danger({ title: 'Erreur', content: 'Erreur lors de la suppression.' });
      }
    });
  }

  editExercise(ex: ExerciseDTO) {
    if (!this.workout) return;
    const idx = this.workout.exercises.findIndex(e => e === ex);
    if (idx !== -1) {
      this.editingExerciseIndex = idx;
      const exObj = this.workout.exercises[idx];
      this.exerciseEditForm = this.fb.group({
        name: [exObj.name],
        sets: [exObj.sets],
        reps: [exObj.reps],
        weight: [exObj.weight]
      });
    }
  }

  saveExerciseEdit(index: number) {
    if (!this.workout || !this.exerciseEditForm) return;
    const ex = this.workout.exercises[index];
    if (typeof ex.id !== 'number') {
      this.toast.danger({ title: 'Erreur', content: 'ID de l\'exercice manquant.' });
      return;
    }
    const changes = this.exerciseEditForm.value;
    this.es.partialUpdate(ex.id, changes).subscribe({
      next: (updated) => {
        this.toast.success({ title: 'Succès', content: 'Exercice mis à jour !' });
        this.workout!.exercises[index] = { ...ex, ...changes };
        this.editingExerciseIndex = null;
        this.exerciseEditForm = null;
        this.computeExerciseVolume();
      },
      error: () => {
        this.toast.danger({ title: 'Erreur', content: 'Erreur lors de la mise à jour de l\'exercice.' });
      }
    });
  }

  cancelExerciseEdit() {
    this.editingExerciseIndex = null;
    this.exerciseEditForm = null;
  }

  deleteExercise(ex: ExerciseDTO) {
    if (!this.workout) return;
    const idx = this.workout.exercises.findIndex(e => e === ex);
    if (idx !== -1) {
      if (!confirm('Supprimer cet exercice ?')) return;
      this.workout.exercises.splice(idx, 1);
      this.computeExerciseVolume();
      this.ws.partialUpdate(this.workout.id!, { exercises: this.workout.exercises }).subscribe({
        next: () => {
          this.toast.success({ title: 'Supprimé', content: 'Exercice supprimé.' });
        },
        error: () => {
          this.toast.danger({ title: 'Erreur', content: 'Erreur lors de la suppression de l\'exercice.' });
        }
      });
    }
  }

  computeExerciseVolume() {
    if (!this.workout) return;
    this.exerciseVolumeData = this.workout.exercises.map(ex => ({
      name: ex.name,
      value: (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0)
    }));
  }
}

