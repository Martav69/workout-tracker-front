import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutService } from '../../../../../core/workout.service';
import { WorkoutDTO } from '../../../../../shared/models/models';

@Component({
  standalone: true,
  selector: 'app-workout-create-step1',
  imports: [ReactiveFormsModule],
  templateUrl: './workout-create-step1.component.html',
  styleUrls: ['./workout-create-step1.component.scss']
})
export class WorkoutCreateStep1Component implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router
  ){}

  ngOnInit(): void {
    // J'initialise mon formulaire après l'injection de fb
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      durationMinutes: [30, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  onNext(): void {
    if(this.form.invalid){
      return;
    }

    const payload: WorkoutDTO = {
      ...this.form.value,
      exercises: []
    };

    this.workoutService.create(payload).subscribe(created => {
      this.router.navigate(['/workouts', created.id, 'exercises']);
    });
  }
}
