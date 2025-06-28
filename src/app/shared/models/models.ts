export interface WorkoutDTO {
  id?: number;
  name: string;
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
