import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los alumnos
  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${environment.apiBaseURL}/alumnos`);
  }

  // Crear un alumno
  createAlumno(payload: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.httpClient.post<Alumno>(`${environment.apiBaseURL}/alumnos`, payload);
  }

  // Editar un alumno
  updateAlumnoById(id: string, update: Partial<Alumno>): Observable<Alumno> {
    return this.httpClient.patch<Alumno>(
      `${environment.apiBaseURL}/alumnos/${id}`,
      update
    );
  }

  // Eliminar un alumno
  removeAlumnoById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseURL}/alumnos/${id}`);
  }
}
