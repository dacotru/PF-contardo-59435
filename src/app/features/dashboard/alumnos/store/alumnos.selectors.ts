import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnos from './alumnos.reducer';

// Selector base para el estado de alumnos
export const selectAlumnosState = createFeatureSelector<fromAlumnos.AlumnosState>(
  fromAlumnos.alumnosFeatureKey
);

// Selector para obtener la lista de alumnos
export const selectAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.alumnos
);

// Selector para obtener las opciones de alumnos
export const selectAlumnosOptions = createSelector(
  selectAlumnosState,
  (state) => state.alumnosOptions
);

// Selector para verificar si los alumnos están cargándose
export const selectIsLoadingAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.loading
);

// Selector para verificar si las opciones de alumnos están cargándose
export const selectIsLoadingAlumnosOptions = createSelector(
  selectAlumnosState,
  (state) => state.loadingOptions
);

// Selector para obtener errores de carga relacionados con alumnos
export const selectAlumnosError = createSelector(
  selectAlumnosState,
  (state) => state.error
);
