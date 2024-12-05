import { createSelector } from '@ngrx/store';
import { cursosFeature } from './cursos.reducer';

export const selectCursosState = cursosFeature.selectCursosState;

export const selectCursosList = createSelector(
  selectCursosState,
  (state) => state.cursos
);

export const selectCursosLoading = createSelector(
  selectCursosState,
  (state) => state.loading
);

export const selectCursosError = createSelector(
  selectCursosState,
  (state) => state.error
);
