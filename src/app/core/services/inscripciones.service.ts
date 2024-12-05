import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../features/dashboard/inscripciones/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todas las inscripciones
  getInscripciones(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(
      `${environment.apiBaseURL}/inscripciones?_embed=alumno&_embed=curso`
    );
  }

  // Crear una inscripción
  createInscripcion(
    payload: Omit<Inscripcion, 'id' | 'alumno' | 'curso'>
  ): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(
      `${environment.apiBaseURL}/inscripciones`,
      payload
    );
  }

  // Editar una inscripción
  updateInscripcionById(
    id: string,
    update: Partial<Inscripcion>
  ): Observable<Inscripcion> {
    return this.httpClient.patch<Inscripcion>(
      `${environment.apiBaseURL}/inscripciones/${id}`,
      update
    );
  }

  // Eliminar una inscripción
  removeInscripcionById(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiBaseURL}/inscripciones/${id}`
    );
  }
}
