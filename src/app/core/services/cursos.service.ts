import { Injectable } from '@angular/core';
import { Curso } from '../../features/dashboard/cursos/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from '../../shared/utils';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private baseURL = `${environment.apiBaseURL}/cursos`;

  constructor(private httpClient: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.baseURL);
  }

  removeCursoById(id: string): Observable<Curso[]> {
    return this.httpClient.delete<Curso[]>(`${this.baseURL}/${id}`);
  }

  addCurso(newCurso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.httpClient.post<Curso>(this.baseURL, {
      ...newCurso,
      id: generateRandomString(4),
    });
  }

  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso> {
    return this.httpClient.patch<Curso>(`${this.baseURL}/${id}`, update);
  }
    
}
