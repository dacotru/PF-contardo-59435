import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from './cursos.reducer';

// Selecciona el estado de la característica 'cursos'
export const selectCursosState = createFeatureSelector<CursosState>('cursos');

// Selecciona la lista completa de cursos
export const selectCursosList = createSelector(
  selectCursosState,
  (state: CursosState) => state.cursos
);

// Selecciona el estado de carga (loading)
export const selectCursosLoading = createSelector(
  selectCursosState,
  (state: CursosState) => state.loading
);

// Selecciona los errores
export const selectCursosError = createSelector(
  selectCursosState,
  (state: CursosState) => state.error
);
