import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/workout.service';
import { WorkoutDTO } from '../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'ngx-french-toast';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss']
})
export class WorkoutEditComponent implements OnInit {
  form!: FormGroup;
  workoutId!: number;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ws: WorkoutService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.workoutId = +this.route.snapshot.paramMap.get('id')!;
    this.ws.getById(this.workoutId).subscribe(workout => {
      this.form = this.fb.group({
        name: [workout.name],
        durationMinutes: [workout.durationMinutes],
        notes: [workout.notes]
      });
      this.loading = false;
    });
  }

  save() {
    if (this.form.valid) {
      const changes = this.form.value;
      this.ws.partialUpdate(this.workoutId, changes).subscribe({
        next: () => {
          this.toast.success({ title: 'Succès', content: 'Entraînement mis à jour !' });
          this.router.navigate(['/workouts', this.workoutId]);
        },
        error: () => {
          this.toast.danger({ title: 'Erreur', content: 'Erreur lors de la mise à jour.' });
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/workouts', this.workoutId]);
  }
} 