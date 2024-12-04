import { createReducer, on } from '@ngrx/store';
import * as AlumnosActions from './alumnos.actions';
import { Alumno } from '../models';

export interface AlumnosState {
  alumnos: Alumno[];
  loading: boolean;
  error: any;
}

export const initialState: AlumnosState = {
  alumnos: [],
  loading: false,
  error: null,
};

export const alumnosReducer = createReducer(
  initialState,
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
  on(AlumnosActions.addAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: [...state.alumnos, alumno],
  })),
  on(AlumnosActions.editAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: state.alumnos.map((a) =>
      a.id === alumno.id ? { ...a, ...alumno } : a
    ),
  })),
  on(AlumnosActions.deleteAlumnoSuccess, (state, { id }) => ({
    ...state,
    alumnos: state.alumnos.filter((alumno) => alumno.id !== id),
  }))
);
