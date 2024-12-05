import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../features/dashboard/cursos/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los cursos con relaciones de profesor y alumnos
  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(
      `${environment.apiBaseURL}/cursos?_embed=profesor&_embed=alumnos`
    );
  }

  // Crear un curso
  createCurso(payload: Omit<Curso, 'id'>): Observable<Curso> {
    return this.httpClient.post<Curso>(`${environment.apiBaseURL}/cursos`, payload);
  }

  // Editar un curso
  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso> {
    return this.httpClient.patch<Curso>(`${environment.apiBaseURL}/cursos/${id}`, update);
  }

  // Eliminar un curso
  removeCursoById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseURL}/cursos/${id}`);
  }
}
