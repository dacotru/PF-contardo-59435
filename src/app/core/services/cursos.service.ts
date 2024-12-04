import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from '../../features/dashboard/cursos/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseURL = `${environment.apiBaseURL}/cursos`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Obtener todos los cursos y transformar las fechas.
   */
  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.baseURL).pipe(
      map((cursos) =>
        cursos.map((curso) => ({
          ...curso,
          startDate: curso.startDate ? new Date(curso.startDate) : new Date(), // Validar null
          endDate: curso.endDate ? new Date(curso.endDate) : new Date(),       // Validar null
        }))
      )
    );
  }

  /**
   * Obtener un curso por ID y transformar las fechas.
   */
  getById(id: string): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.baseURL}/${id}`).pipe(
      map((curso) => ({
        ...curso,
        startDate: curso.startDate ? new Date(curso.startDate) : new Date(), // Validar null
        endDate: curso.endDate ? new Date(curso.endDate) : new Date(),       // Validar null
      }))
    );
  }

  /**
   * Eliminar un curso por ID.
   */
  removeCursoById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  /**
   * Actualizar un curso por ID.
   * Recibe un objeto parcial del curso a actualizar.
   */
  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso> {
    return this.httpClient.patch<Curso>(`${this.baseURL}/${id}`, update).pipe(
      map((curso) => ({
        ...curso,
        startDate: curso.startDate ? new Date(curso.startDate) : new Date(), // Validar null
        endDate: curso.endDate ? new Date(curso.endDate) : new Date(),       // Validar null
      }))
    );
  }

  /**
   * Agregar un nuevo curso.
   */
  addCurso(newCurso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.httpClient.post<Curso>(this.baseURL, newCurso).pipe(
      map((curso) => ({
        ...curso,
        startDate: curso.startDate ? new Date(curso.startDate) : new Date(), // Validar null
        endDate: curso.endDate ? new Date(curso.endDate) : new Date(),       // Validar null
      }))
    );
  }
}
