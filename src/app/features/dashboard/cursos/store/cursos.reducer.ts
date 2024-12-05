import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
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
  
  on(CursosActions.loadCursos, (state) => ({
    ...state,
    loading: true,
  })),
  on(CursosActions.loadCursosSuccess, (state, { cursos }) => ({
    ...state,
    cursos,
    loading: false,
  })),
  on(CursosActions.loadCursosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(CursosActions.deleteCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter((curso) => curso.id !== id),
  })),
  

  on(CursosActions.editCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map((c) =>
      c.id === curso.id ? { ...c, ...curso } : c
    ),
  })),

  on(CursosActions.deleteCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter((curso) => curso.id !== id), 
  })),
);

export const cursosFeature = createFeature({
  name: 'cursos',
  reducer: createReducer(
    initialState,
    on(CursosActions.loadCursosSuccess, (state, { cursos }) => ({
      ...state,
      cursos,
    }))
  ),
});
