import { createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Curso } from '../models/';

export interface CursosState {
  cursos: Curso[];
  isLoading: boolean;
  error: any;
}

export const initialState: CursosState = {
  cursos: [],
  isLoading: false,
  error: null,
};

export const cursosReducer = createReducer(
  initialState,
  on(CursosActions.loadCursos, (state) => ({ ...state, isLoading: true })),
  on(CursosActions.loadCursosSuccess, (state, { cursos }) => ({
    ...state,
    cursos,
    isLoading: false,
  })),
  on(CursosActions.loadCursosFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(CursosActions.createCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso],
  })),
  on(CursosActions.editCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map((c) => (c.id === curso.id ? curso : c)),
  })),
  on(CursosActions.deleteCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter((c) => c.id !== id),
  }))
);
