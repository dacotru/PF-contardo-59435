import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnos from './alumnos.reducer';

// Selector para acceder al estado de alumnos usando el feature key
export const selectAlumnosState = createFeatureSelector<fromAlumnos.AlumnosState>(
  fromAlumnos.alumnosFeatureKey  // Usamos alumnosFeatureKey aquí
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

// Selector para obtener el error de carga
export const selectLoadAlumnosError = createSelector(
  selectAlumnosState,
  (state) => state.error
);

// Selector para verificar si se está cargando
export const selectIsLoadingAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.loading
);
