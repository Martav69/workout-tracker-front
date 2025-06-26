export interface WorkoutDTO {
  id?: number;
  notes?: string;
  date: string;
  durationMinutes: number;
  exercises: ExerciseDTO[];
}

export interface ExerciseDTO {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
