import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from './cursos.reducer';

export const selectCursosState = createFeatureSelector<CursosState>('cursos');

export const selectCursosList = createSelector(
  selectCursosState,
  (state: CursosState) => state.cursos
);

export const selectCursosLoading = createSelector(
  selectCursosState,
  (state: CursosState) => state.loading
);
