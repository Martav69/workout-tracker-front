import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkoutDTO } from '../shared/models/models'; 
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private readonly API = `${environment.apiUrl}/workouts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkoutDTO[]> {
    return this.http.get<WorkoutDTO[]>(this.API);
  }

  getById(id: number): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(`${this.API}/${id}`);
  }

  create(dto: WorkoutDTO): Observable<WorkoutDTO> {
    return this.http.post<WorkoutDTO>(this.API, dto);
  }

  update(id: number, dto: WorkoutDTO): Observable<WorkoutDTO> {
    return this.http.put<WorkoutDTO>(`${this.API}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  partialUpdate(id: number, updates: Partial<WorkoutDTO>): Observable<WorkoutDTO> {
    return this.http.patch<WorkoutDTO>(`${this.API}/${id}`, updates);
  }

}
