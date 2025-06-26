export interface WorkoutDTO {
  id?: number;
  date: string;
  durationMinutes: number;
  notes?: string;
  exercises: ExerciseDTO[];
}

export interface ExerciseDTO {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
