import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InscripcionesState } from './inscripciones.reducer';

// Selector para el estado completo de inscripciones
export const selectInscripcionesState =
  createFeatureSelector<InscripcionesState>('inscripciones');

// Selector para la lista completa de inscripciones
export const selectInscripcionesList = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.inscripciones
);

// Selector para opciones de alumnos
export const selectAlumnosOptions = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.alumnosOptions
);

// Selector para opciones de cursos
export const selectCursosOptions = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.cursosOptions
);


// Selector para el estado de carga
export const selectIsLoadingInscripciones = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.isLoadingInscripciones
);

// Selector para errores de carga
export const selectLoadInscripcionesError = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.loadInscripcionesError
);
