import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from '../../features/dashboard/cursos/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private baseURL = `${environment.apiBaseURL}/cursos`;

  constructor(private httpClient: HttpClient) {}

  // Obtener todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.baseURL).pipe(
      map((cursos) =>
        cursos.map((curso) => ({
          ...curso,
          createdAt: curso.createdAt ? new Date(curso.createdAt).toISOString() : undefined,
        }))
      )
    );
  }

  // Obtener curso por ID
  getById(id: string): Observable<Curso> { // ID como string
    return this.httpClient.get<Curso>(`${this.baseURL}/${id}`).pipe(
      map((curso) => ({
        ...curso,
        createdAt: curso.createdAt ? new Date(curso.createdAt).toISOString() : undefined,
      }))
    );
  }
  

  removeCursoById(id: number): Observable<{ id: number }> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`).pipe(
      map(() => ({ id })) // Asegúrate de que esto devuelva un objeto con el `id`
    );
  }
  
  

  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso> {
    return this.httpClient.patch<Curso>(`${this.baseURL}/${id}`, update).pipe(
      map((curso) => ({
        ...curso,
        createdAt: curso.createdAt ? new Date(curso.createdAt).toISOString() : undefined,
      }))
    );
  }
  

  addCurso(newCurso: Omit<Curso, 'id'>): Observable<Curso> {
    const generatedId = Math.random().toString(36).substring(2, 8);
    const cursoWithId = {
      ...newCurso,
      id: generatedId,
    };

    return this.httpClient.post<Curso>(this.baseURL, cursoWithId).pipe(
      map((curso) => ({
        ...curso,
      }))
    );
  }
}
