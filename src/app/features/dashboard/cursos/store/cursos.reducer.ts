import { createReducer, on } from '@ngrx/store';
import * as CursosActions from './cursos.actions';
import { Curso } from '../models';

export interface CursosState {
  cursos: Curso[];
  loading: boolean;
  error: any;
}

export const initialState: CursosState = {
  cursos: [],
  loading: false,
  error: null,
};

export const cursosReducer = createReducer(
  initialState,
  on(CursosActions.loadCursos, (state) => ({ ...state, loading: true })),
  on(CursosActions.loadCursosSuccess, (state, { cursos }) => ({
    ...state,
    cursos, // Actualizamos los cursos con los datos obtenidos
    loading: false,
    error: null,
  })),
  on(CursosActions.loadCursosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
