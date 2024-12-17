import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../features/dashboard/cursos/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = `${environment.apiBaseURL}/cursos`;

  constructor(private http: HttpClient) {}

  // Cargar cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  // Crear curso
  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  // Editar curso
  updateCursoById(id: string, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  // Eliminar curso
  removeCursoById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
