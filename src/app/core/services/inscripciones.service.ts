import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../features/dashboard/inscripciones/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  constructor(private httpClient: HttpClient) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(
      `${environment.apiBaseURL}/inscripciones?_embed=alumno&_embed=curso`
    );
  }

  createInscripcion(
    payload: Omit<Inscripcion, 'id' | 'alumno' | 'curso'>
  ): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(
      `${environment.apiBaseURL}/inscripciones`,
      payload
    );
  }

  updateInscripcionById(id: string, update: Partial<Inscripcion & { alumnoNombre?: string; cursoNombre?: string }>): Observable<Inscripcion> {
    const { alumno, curso, alumnoNombre, cursoNombre, ...payload } = update;
    return this.httpClient.patch<Inscripcion>(
      `${environment.apiBaseURL}/inscripciones/${id}`,
      payload
    );
  }

  removeInscripcionById(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiBaseURL}/inscripciones/${id}`
    );
  }
}
