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
  
  // Acción para cargar cursos
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

  // Acción para agregar curso
  on(CursosActions.addCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso],
  })),

  // Acción para editar curso
  on(CursosActions.editCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map((c) =>
      c.id === curso.id ? { ...c, ...curso } : c // Comparación exacta
    ),
  })),

  // Acción para eliminar curso
  on(CursosActions.deleteCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter((curso) => curso.id !== id),
  }))
);
