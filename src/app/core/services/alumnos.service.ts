import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private baseURL = `${environment.apiBaseURL}/alumnos`;

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(this.baseURL).pipe(
      map((alumnos) =>
        alumnos.map((alumno) => ({
          ...alumno,
          createdAt: alumno.createdAt ? new Date(alumno.createdAt) : null, 
        }))
      )
    );
  }

  getById(id: string): Observable<Alumno> {
    return this.httpClient.get<Alumno>(`${this.baseURL}/${id}`).pipe(
      map((alumno) => ({
        ...alumno,
        createdAt: alumno.createdAt ? new Date(alumno.createdAt) : null,
      }))
    );
  }

  removeAlumnoById(id: string): Observable<{ id: string }> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`).pipe(
      map(() => ({ id })) 
    );
  }

  updateAlumnoById(id: string, update: Partial<Alumno>): Observable<Alumno> {
    return this.httpClient.patch<Alumno>(`${this.baseURL}/${id}`, update).pipe(
      map((alumno) => ({
        ...alumno,
        createdAt: alumno.createdAt ? new Date(alumno.createdAt) : null, 
      }))
    );
  }

  addAlumno(newAlumno: Omit<Alumno, 'id' | 'createdAt'>): Observable<Alumno> {
    const generatedId = Math.random().toString(36).substring(2, 8);
    const alumnoWithId = {
      ...newAlumno,
      id: generatedId,
      createdAt: new Date().toISOString(),
    };
  
    return this.httpClient.post<Alumno>(this.baseURL, alumnoWithId).pipe(
      map((alumno) => ({
        ...alumno,
        createdAt: alumno.createdAt ? new Date(alumno.createdAt) : null,
      }))
    );
  }
  
}
