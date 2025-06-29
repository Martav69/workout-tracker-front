import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { WorkoutService } from '../../../core/workout.service';
import { ExerciseService } from '../../../core/exercise.service';
import { WorkoutDTO } from '../../../shared/models/models';


@Component({
  standalone: true,
  selector: 'app-workout-detail',
  imports: [CommonModule, RouterLink, NgIf, NgFor],
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ws = inject(WorkoutService);
  private router = inject(Router);

  workout?: WorkoutDTO;

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ws.getById(id).subscribe(w => this.workout = w, () => this.router.navigate(['/workouts']));
  }

  edit() {
    this.router.navigate(['/workouts', this.workout!.id, 'edit']);
  }

  delete() {
    if (!confirm('Confirmer la suppression de cette séance ?')) return;
    this.ws.delete(this.workout!.id!).subscribe(() => this.router.navigate(['/workouts']));
  }
}
