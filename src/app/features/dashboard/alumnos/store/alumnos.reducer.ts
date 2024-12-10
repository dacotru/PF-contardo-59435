import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../models';

export const alumnosFeatureKey = 'alumnos';

// Estructura del estado
export interface AlumnosState {
  alumnos: Alumno[]; // Lista de alumnos principales
  alumnosOptions: Alumno[]; // Opciones de alumnos para formularios
  loading: boolean; // Indicador de carga general
  loadingOptions: boolean; // Indicador de carga de opciones
  error: any; // Almacena el último error
}

// Estado inicial
export const initialState: AlumnosState = {
  alumnos: [],
  alumnosOptions: [],
  loading: false,
  loadingOptions: false,
  error: null,
};

// Reducer
export const alumnosReducer = createReducer(
  initialState,

  // Cargar opciones de alumnos
  on(AlumnosActions.loadAlumnosOptions, (state) => ({
    ...state,
    loadingOptions: true,
  })),
  on(AlumnosActions.loadAlumnosOptionsSuccess, (state, { alumnosOptions }) => ({
    ...state,
    alumnosOptions,
    loadingOptions: false,
  })),
  on(AlumnosActions.loadAlumnosOptionsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingOptions: false,
  })),

  // Cargar lista de alumnos
  on(AlumnosActions.loadAlumnos, (state) => ({
    ...state,
    loading: true,
    error: null, // Limpia el error anterior
  })),
  on(AlumnosActions.loadAlumnosSuccess, (state, { alumnos }) => ({
    ...state,
    alumnos,
    loading: false,
  })),
  on(AlumnosActions.loadAlumnosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Crear un nuevo alumno
  on(AlumnosActions.createAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: [...state.alumnos, alumno],
  })),

  // Editar un alumno existente
  on(AlumnosActions.editAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: state.alumnos.map((a) =>
      a.id === alumno.id ? { ...a, ...alumno } : a
    ),
  })),

  // Eliminar un alumno
  on(AlumnosActions.deleteAlumnoSuccess, (state, { id }) => ({
    ...state,
    alumnos: state.alumnos.filter((alumno) => alumno.id !== id),
  }))
);

// Registro de la característica
export const alumnosFeature = createFeature({
  name: alumnosFeatureKey, // Usando la clave correcta para la característica
  reducer: alumnosReducer, 
});
