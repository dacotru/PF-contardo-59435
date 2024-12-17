import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../features/dashboard/inscripciones/models/';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private apiUrl = `${environment.apiBaseURL}/inscripciones`;

  constructor(private http: HttpClient) {}

  // Obtener todas las inscripciones
  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?_embed=alumno&_embed=curso`);
  }

  // Crear una nueva inscripción
  createInscripcion(payload: { alumnoId: string; cursoId: string }): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, payload);
  }

  // Editar una inscripción por ID
  updateInscripcionById(id: string, payload: Partial<Inscripcion>): Observable<Inscripcion> {
    return this.http.patch<Inscripcion>(`${this.apiUrl}/${id}`, payload);
  }

  // Eliminar una inscripción por ID
  removeInscripcionById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
