// src/app/pages/workout/workout-create/step2/workout-create-step2.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../../../../core/exercise.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastService } from 'ngx-french-toast';

@Component({
  standalone: true,
  selector: 'app-workout-create-step2',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './workout-create-step2.component.html',
  styleUrls: ['./workout-create-step2.component.scss']
})
export class WorkoutCreateStep2Component implements OnInit {
  form!: FormGroup;
  workoutId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire après injection de fb
    this.form = this.fb.group({
      exercises: this.fb.array([])
    });
    // Récupérer l'ID créé à l'étape 1
    this.workoutId = +this.route.snapshot.paramMap.get('id')!;
  }

  get exercises(): FormArray {
    return this.form.get('exercises') as FormArray;
  }

  addExercise(): void {
    this.exercises.push(
      this.fb.group({
        name: ['', Validators.required],
        sets: [1, [Validators.required, Validators.min(1)]],
        reps: [1, [Validators.required, Validators.min(1)]],
        weight: [0, [Validators.required, Validators.min(0)]]
      })
    );
    this.toast.info({ title: 'Exercice ajouté', content: 'Nouvel exercice ajouté.' });
  }

  removeExercise(index: number): void {
    this.exercises.removeAt(index);
    this.toast.warning({ title: 'Exercice supprimé', content: 'Exercice retiré du programme.' });
  }

  saveAll(): void {
    if (this.exercises.length === 0) {
      this.toast.danger({ title: 'Erreur', content: 'Ajoutez au moins un exercice.' });
      return;
    }
    this.loading = true;
    const calls = this.exercises.controls.map(ctrl =>
      this.exerciseService.create(this.workoutId, ctrl.value)
    );
    forkJoin(calls).subscribe({
      next: () => {
        this.loading = false;
        this.toast.success({ title: 'Succès', content: 'Exercices enregistrés !' });
        this.router.navigate(['/workouts']);
      },
      error: () => {
        this.loading = false;
        this.toast.danger({ title: 'Erreur', content: 'Erreur lors de l\'enregistrement.' });
      }
    });
  }
}
