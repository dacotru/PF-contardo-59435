import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private baseURL = 'http://localhost:3000/inscripciones'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  getInscripciones(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL);
  }
}
