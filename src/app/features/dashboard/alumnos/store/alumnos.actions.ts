import { createAction, props } from '@ngrx/store';
import { Alumno } from '../models';

// Cargar Alumnos
export const loadAlumnos = createAction('[Alumnos] Load Alumnos');
export const loadAlumnosSuccess = createAction(
  '[Alumnos] Load Alumnos Success',
  props<{ alumnos: Alumno[] }>()
);
export const loadAlumnosFailure = createAction(
  '[Alumnos] Load Alumnos Failure',
  props<{ error: any }>()
);

// Cargar un Alumno por ID
export const loadAlumnoById = createAction(
  '[Alumnos] Load Alumno By ID',
  props<{ id: string }>()
);
export const loadAlumnoByIdSuccess = createAction(
  '[Alumnos] Load Alumno By ID Success',
  props<{ alumno: Alumno }>()
);
export const loadAlumnoByIdFailure = createAction(
  '[Alumnos] Load Alumno By ID Failure',
  props<{ error: any }>()
);

// Agregar Alumno
export const addAlumno = createAction(
  '[Alumnos] Add Alumno',
  props<{ alumno: Omit<Alumno, 'id' | 'createdAt'> }>()
);
export const addAlumnoSuccess = createAction(
  '[Alumnos] Add Alumno Success',
  props<{ alumno: Alumno }>()
);
export const addAlumnoFailure = createAction(
  '[Alumnos] Add Alumno Failure',
  props<{ error: any }>()
);

// Actualizar Alumno
export const editAlumno = createAction(
  '[Alumnos] Edit Alumno',
  props<{ alumno: Alumno }>()
);
export const editAlumnoSuccess = createAction(
  '[Alumnos] Edit Alumno Success',
  props<{ alumno: Alumno }>()
);
export const editAlumnoFailure = createAction(
  '[Alumnos] Edit Alumno Failure',
  props<{ error: any }>()
);

// Eliminar Alumno
export const deleteAlumno = createAction(
  '[Alumnos] Delete Alumno',
  props<{ id: string }>()
);
export const deleteAlumnoSuccess = createAction(
  '[Alumnos] Delete Alumno Success',
  props<{ id: string }>()
);
export const deleteAlumnoFailure = createAction(
  '[Alumnos] Delete Alumno Failure',
  props<{ error: any }>()
);
