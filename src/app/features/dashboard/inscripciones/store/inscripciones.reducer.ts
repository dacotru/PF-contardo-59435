import { createReducer, on } from '@ngrx/store';
import { createFeature } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../models/';
import { Alumno } from '../../alumnos/models/';
import { Curso } from '../../cursos/models/';

// Feature Key
export const inscripcionesFeatureKey = 'inscripciones';

// Interface for State
export interface InscripcionesState {
  inscripciones: Inscripcion[]; // List of inscripciones
  alumnosOptions: Alumno[];    // Available alumnos for options
  cursosOptions: Curso[];      // Available cursos for options
  isLoadingInscripciones: boolean; // Loading state for inscripciones
  loadInscripcionesError: Error | null; // Error during load operations
}

// Initial State
export const initialState: InscripcionesState = {
  inscripciones: [],
  alumnosOptions: [],
  cursosOptions: [],
  isLoadingInscripciones: false,
  loadInscripcionesError: null,
};

// Reducer
export const inscripcionesReducer = createReducer(
  initialState,

  // Load Inscripciones
  on(InscripcionesActions.loadInscripciones, (state) => ({
    ...state,
    isLoadingInscripciones: true,
    loadInscripcionesError: null, // Clear previous errors
  })),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, { inscripciones }) => ({
    ...state,
    inscripciones,
    isLoadingInscripciones: false,
  })),
  on(InscripcionesActions.loadInscripcionesFailure, (state, { error }) => ({
    ...state,
    isLoadingInscripciones: false,
    loadInscripcionesError: error,
  })),

  // Create Inscripcion
  on(InscripcionesActions.createInscripcionSuccess, (state, { inscripcion }) => ({
    ...state,
    inscripciones: [...state.inscripciones, inscripcion],
  })),

  // Edit Inscripcion
  on(InscripcionesActions.editInscripcionSuccess, (state, { inscripcion }) => ({
    ...state,
    inscripciones: state.inscripciones.map((i) =>
      i.id === inscripcion.id ? { ...i, ...inscripcion } : i
    ),
  })),

  // Delete Inscripcion
  on(InscripcionesActions.deleteInscripcionSuccess, (state, { id }) => ({
    ...state,
    inscripciones: state.inscripciones.filter((i) => i.id !== id),
  })),

  // Load Alumnos and Cursos Options
  on(InscripcionesActions.loadAlumnosAndCursosOptionsSuccess, (state, { alumnos, cursos }) => ({
    ...state,
    alumnosOptions: alumnos,
    cursosOptions: cursos,
  })),
  on(InscripcionesActions.loadAlumnosAndCursosOptionsFailure, (state, { error }) => ({
    ...state,
    loadInscripcionesError: error, // Retain the existing inscripciones state
    alumnosOptions: [], // Clear affected options
    cursosOptions: [],
  }))
);

// Feature Registration
export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer: inscripcionesReducer,
});
