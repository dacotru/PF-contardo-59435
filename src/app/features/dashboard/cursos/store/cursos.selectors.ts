import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';

// Selector base para el estado de cursos
export const selectCursosState = createFeatureSelector<fromCursos.CursosState>(
  fromCursos.cursosFeatureKey
);

// Selector para obtener la lista de cursos
export const selectAllCursos = createSelector(
  selectCursosState,
  (state) => state.cursos
);

// Selector para obtener las opciones de cursos
export const selectCursosOptions = createSelector(
  selectCursosState,
  (state) => state.cursosOptions
);

// Selector para verificar si los cursos están cargándose
export const selectIsLoadingCursos = createSelector(
  selectCursosState,
  (state) => state.loading
);

// Selector para obtener errores relacionados con cursos
export const selectCursosError = createSelector(
  selectCursosState,
  (state) => state.error
);
