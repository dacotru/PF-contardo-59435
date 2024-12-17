import { createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../models/';
import { Alumno } from '../../alumnos/models/';
import { Curso } from '../../cursos/models/';

export interface InscripcionesState {
  inscripciones: Inscripcion[];
  alumnosOptions: Alumno[];
  cursosOptions: Curso[];
  isLoading: boolean;
  error: any;
}

export const initialState: InscripcionesState = {
  inscripciones: [],
  alumnosOptions: [],
  cursosOptions: [],
  isLoading: false,
  error: null,
};

export const inscripcionesReducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, { inscripciones }) => ({
    ...state,
    inscripciones,
    isLoading: false,
  })),
  on(InscripcionesActions.loadInscripcionesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(InscripcionesActions.loadAlumnosAndCursosOptionsSuccess, (state, { alumnos, cursos }) => ({
    ...state,
    alumnosOptions: alumnos,
    cursosOptions: cursos,
  }))
);
