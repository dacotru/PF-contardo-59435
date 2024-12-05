import { createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../models';

export interface AlumnosState {
  alumnos: Alumno[];
  alumnosOptions?: any[];
  loading: boolean;
  error: any;
}


export const alumnosFeatureKey = 'alumnos';  

export const initialState: AlumnosState = {
  alumnos: [],
  alumnosOptions: [],
  loading: false,
  error: null,
};

export const alumnosReducer = createReducer(
  initialState,

  // Cargar alumnos
  on(AlumnosActions.loadAlumnos, (state) => ({
    ...state,
    loading: true,
  })),
  on(AlumnosActions.loadAlumnosSuccess, (state, { alumnos }) => ({
    ...state,
    alumnos,
    loading: false,
  })),
  on(AlumnosActions.loadAlumnosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Crear alumno
  on(AlumnosActions.createAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: [...state.alumnos, alumno],
  })),

  // Editar alumno
  on(AlumnosActions.editAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: state.alumnos.map((a) =>
      a.id === alumno.id ? { ...a, ...alumno } : a
    ),
  })),

  // Eliminar alumno
  on(AlumnosActions.deleteAlumnoSuccess, (state, { id }) => ({
    ...state,
    alumnos: state.alumnos.filter((alumno) => alumno.id !== id),
  }))
);
