import { createReducer, on } from '@ngrx/store';
import { createFeature } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../models/';
import { Alumno } from '../../alumnos/models/';
import { Curso } from '../../cursos/models/';

export interface InscripcionesState {
  inscripciones: Inscripcion[];        // Lista de inscripciones
  alumnosOptions: Alumno[];           // Opciones de alumnos disponibles
  cursosOptions: Curso[];             // Opciones de cursos disponibles
  isLoadingInscripciones: boolean;    // Estado de carga
  loadInscripcionesError: Error | null; // Error en la carga de inscripciones
}

export const initialState: InscripcionesState = {
  inscripciones: [],
  alumnosOptions: [],
  cursosOptions: [],
  isLoadingInscripciones: false,
  loadInscripcionesError: null,
};

export const inscripcionesReducer = createReducer(
  initialState,

  // Cargar inscripciones
  on(InscripcionesActions.loadInscripciones, (state) => ({
    ...state,
    isLoadingInscripciones: true,
  })),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, { inscripciones }) => ({
    ...state,
    inscripciones,
    isLoadingInscripciones: false,
    loadInscripcionesError: null,
  })),
  on(InscripcionesActions.loadInscripcionesFailure, (state, { error }) => ({
    ...state,
    isLoadingInscripciones: false,
    loadInscripcionesError: error,
  })),

  // Crear inscripción
  on(InscripcionesActions.createInscripcionSuccess, (state, { inscripcion }) => ({
    ...state,
    inscripciones: [...state.inscripciones, inscripcion],
  })),

  // Editar inscripción
  on(InscripcionesActions.editInscripcionSuccess, (state, { inscripcion }) => ({
    ...state,
    inscripciones: state.inscripciones.map((i) =>
      i.id === inscripcion.id ? { ...i, ...inscripcion } : i
    ),
  })),

  // Eliminar inscripción
  on(InscripcionesActions.deleteInscripcionSuccess, (state, { id }) => ({
    ...state,
    inscripciones: state.inscripciones.filter((i) => i.id !== id),
  })),

  // Cargar opciones de alumnos y cursos
  on(InscripcionesActions.loadAlumnosAndCursosOptionsSuccess, (state, { alumnos, cursos }) => ({
    ...state,
    alumnosOptions: alumnos,
    cursosOptions: cursos,
  })),
  on(InscripcionesActions.loadAlumnosAndCursosOptionsFailure, (state, { error }) => ({
    ...state,
    loadInscripcionesError: error,
  }))
);

export const inscripcionesFeature = createFeature({
  name: 'inscripciones',
  reducer: inscripcionesReducer,
});
