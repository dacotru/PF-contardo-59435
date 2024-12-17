import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InscripcionesState } from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<InscripcionesState>('inscripciones');

export const selectInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.inscripciones
);

export const selectAlumnosOptions = createSelector(
  selectInscripcionesState,
  (state) => state.alumnosOptions
);

export const selectCursosOptions = createSelector(
  selectInscripcionesState,
  (state) => state.cursosOptions
);

export const selectIsLoadingInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.isLoading
);
