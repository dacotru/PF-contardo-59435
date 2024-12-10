import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Curso } from '../models';

// Clave del estado
export const cursosFeatureKey = 'cursos';

// Interfaz del estado
export interface CursosState {
  cursos: Curso[]; // Lista de cursos principales
  cursosOptions: Curso[]; // Opciones de cursos para formularios
  loading: boolean; // Indicador de carga general
  loadingOptions: boolean; // Indicador de carga de opciones
  error: any; // Almacena el último error
}

// Estado inicial
export const initialState: CursosState = {
  cursos: [],
  cursosOptions: [],
  loading: false,
  loadingOptions: false,
  error: null,
};

// Reducer principal
export const cursosReducer = createReducer(
  initialState,

  // Cargar opciones de cursos
  on(CursosActions.loadCursosOptions, (state) => ({
    ...state,
    loadingOptions: true,
  })),
  on(CursosActions.loadCursosOptionsSuccess, (state, { cursosOptions }) => ({
    ...state,
    cursosOptions,
    loadingOptions: false,
  })),
  on(CursosActions.loadCursosOptionsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingOptions: false,
  })),

  // Cargar lista de cursos
  on(CursosActions.loadCursos, (state) => ({
    ...state,
    loading: true,
    error: null, // Limpia el error anterior
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

  // Eliminar curso
  on(CursosActions.deleteCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter((curso) => curso.id !== id),
  })),

  // Editar curso
  on(CursosActions.editCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map((c) =>
      c.id === curso.id ? { ...c, ...curso } : c
    ),
  }))
);

// Registro de la característica
export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer: cursosReducer, // Usa el reducer principal
});
