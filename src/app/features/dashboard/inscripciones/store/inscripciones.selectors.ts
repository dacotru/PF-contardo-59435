import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

// Selector for the Inscripciones state
export const selectInscripcionesState = createFeatureSelector<fromInscripciones.InscripcionesState>(
  fromInscripciones.inscripcionesFeatureKey
);

// Selector for the list of inscripciones
export const selectInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.inscripciones
);

// Selector for alumno options
export const selectAlumnosOptions = createSelector(
  selectInscripcionesState,
  (state) => state.alumnosOptions
);

// Selector for curso options
export const selectCursosOptions = createSelector(
  selectInscripcionesState,
  (state) => state.cursosOptions
);

// Selector for errors in loading inscripciones
export const selectLoadInscripcionesError = createSelector(
  selectInscripcionesState,
  (state) => state.loadInscripcionesError
);

// Selector for checking if inscripciones are being loaded
export const selectIsLoadingInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.isLoadingInscripciones
);
