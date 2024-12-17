import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlumnosState } from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<AlumnosState>('alumnos');

export const selectAllAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.alumnos
);

export const selectIsLoadingAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.isLoading
);
