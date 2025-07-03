import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, LineChartModule, PieChartModule, AreaChartModule } from '@swimlane/ngx-charts';
import { WorkoutService } from '../../core/workout.service';
import { WorkoutDTO, ExerciseDTO } from '../../shared/models/models';

@Component({
  selector: 'app-progress-page',
  standalone: true,
  imports: [NgxChartsModule, LineChartModule, PieChartModule, AreaChartModule],
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss']
})
export class ProgressPage implements OnInit {
  workouts: WorkoutDTO[] = [];

  // Chart 1: Workout frequency over last 30 days
  workoutFrequencyData: { name: string; value: number }[] = [];
  // Chart 2: Pie chart of exercise types
  exerciseTypeData: { name: string; value: number }[] = [];
  // Chart 3: Area chart of max weight per exercise over time
  prProgressionData: { name: string; series: { name: string; value: number }[] }[] = [];

  // Alias for template compatibility
  get exerciseDistributionData() {
    return this.exerciseTypeData;
  }

  colorScheme = 'vivid';
  view: [number, number] = [700, 300];

  constructor(private ws: WorkoutService) {}

  ngOnInit() {
    this.ws.getAll().subscribe({
      next: (workouts) => {
        this.workouts = Array.isArray(workouts) ? workouts : [];
        this.computeWorkoutFrequency();
        this.computeExerciseTypeDistribution();
        this.computePRProgression();
      },
      error: () => {
        this.workouts = [];
        this.workoutFrequencyData = [];
        this.exerciseTypeData = [];
        this.prProgressionData = [];
      }
    });
  }

  // Chart 1: Workout frequency (last 30 days)
  computeWorkoutFrequency() {
    const days: { [date: string]: number } = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = 0;
    }
    (this.workouts || []).forEach(w => {
      if (!w || !w.date) return;
      const key = w.date.slice(0, 10);
      if (days[key] !== undefined) days[key]++;
    });
    this.workoutFrequencyData = Object.entries(days)
      .map(([name, value]) => ({ name, value }))
      .filter(d => typeof d.value === 'number' && !isNaN(d.value));
  }

  // Chart 2: Exercise type distribution (pie)
  computeExerciseTypeDistribution() {
    const counts: { [name: string]: number } = {};
    (this.workouts || []).forEach(w => {
      (w.exercises || []).forEach(ex => {
        if (!ex || !ex.name) return;
        counts[ex.name] = (counts[ex.name] || 0) + 1;
      });
    });
    this.exerciseTypeData = Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .filter(d => typeof d.value === 'number' && !isNaN(d.value) && d.value > 0);
  }

  // Chart 3: PR progression (area)
  computePRProgression() {
    // For each exercise name, show max weight per workout date
    const prMap: { [exName: string]: { [date: string]: number } } = {};
    (this.workouts || []).forEach(w => {
      const date = w.date ? w.date.slice(0, 10) : null;
      (w.exercises || []).forEach(ex => {
        if (!ex || !ex.name || !date) return;
        if (!prMap[ex.name]) prMap[ex.name] = {};
        const prev = prMap[ex.name][date] || 0;
        prMap[ex.name][date] = Math.max(prev, ex.weight || 0);
      });
    });
    this.prProgressionData = Object.entries(prMap)
      .map(([name, dateMap]) => ({
        name,
        series: Object.entries(dateMap)
          .map(([date, value]) => ({ name: date, value }))
          .filter(d => typeof d.value === 'number' && !isNaN(d.value))
          .sort((a, b) => a.name.localeCompare(b.name))
      }))
      .filter(seriesObj => seriesObj.series.length > 0); // Show all exercises with at least 1 data point
  }
} 