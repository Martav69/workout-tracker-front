import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseDTO } from '../shared/models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private readonly API =`${environment.apiUrl}exercises`;

  constructor(private http: HttpClient) {}

  getAll(workoutId?: number): Observable<ExerciseDTO[]> {
    const url = workoutId ? `${this.API}?workoutId=${workoutId}` : this.API;
    return this.http.get<ExerciseDTO[]>(url);
  }

  getById(id: number): Observable<ExerciseDTO> {
    return this.http.get<ExerciseDTO>(`${this.API}/${id}`);
  }

  create(workoutId: number, dto: ExerciseDTO): Observable<ExerciseDTO> {
    return this.http.post<ExerciseDTO>(`${this.API}?workoutId=${workoutId}`, dto);
  }

  update(dto: ExerciseDTO): Observable<ExerciseDTO> {
    return this.http.put<ExerciseDTO>(`${this.API}/${dto.id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
