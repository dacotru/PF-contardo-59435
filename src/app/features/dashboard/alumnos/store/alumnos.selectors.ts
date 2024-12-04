import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlumnosState } from './alumnos.reducer';

// Selecciona el estado de la característica 'alumnos'
export const selectAlumnosState = createFeatureSelector<AlumnosState>('alumnos');

// Selecciona la lista completa de alumnos
export const selectAlumnosList = createSelector(
  selectAlumnosState,
  (state: AlumnosState) => state.alumnos
);

// Selecciona el estado de carga (loading)
export const selectAlumnosLoading = createSelector(
  selectAlumnosState,
  (state: AlumnosState) => state.loading
);

// Selecciona los errores
export const selectAlumnosError = createSelector(
  selectAlumnosState,
  (state: AlumnosState) => state.error
);
