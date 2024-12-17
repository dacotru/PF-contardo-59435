import { createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../models';

export interface AlumnosState {
  alumnos: Alumno[];
  isLoading: boolean;
  error: any;
}

export const initialState: AlumnosState = {
  alumnos: [],
  isLoading: false,
  error: null,
};

export const alumnosReducer = createReducer(
  initialState,
  on(AlumnosActions.loadAlumnos, (state) => ({ ...state, isLoading: true })),
  on(AlumnosActions.loadAlumnosSuccess, (state, { alumnos }) => ({
    ...state,
    alumnos,
    isLoading: false,
  })),
  on(AlumnosActions.loadAlumnosFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AlumnosActions.createAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: [...state.alumnos, alumno],
  })),
  on(AlumnosActions.editAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: state.alumnos.map((a) => (a.id === alumno.id ? alumno : a)),
  })),
  on(AlumnosActions.deleteAlumnoSuccess, (state, { id }) => ({
    ...state,
    alumnos: state.alumnos.filter((a) => a.id !== id),
  }))
);
