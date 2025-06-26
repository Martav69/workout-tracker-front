import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/workout.service';
import { WorkoutDTO } from '../../../shared/models/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workout-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss']
})
export class WorkoutListPage implements OnInit {
  workouts$!: Observable<WorkoutDTO[]>;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workouts$ = this.workoutService.getAll();
  }
}
