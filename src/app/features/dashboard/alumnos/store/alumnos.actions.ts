import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from '../models/';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ alumnos: Alumno[] }>(),
    'Load Alumnos Failure': props<{ error: Error }>(),

    'Create Alumno': props<{ alumno: Alumno }>(),
    'Create Alumno Success': props<{ alumno: Alumno }>(),
    'Create Alumno Failure': props<{ error: Error }>(),

    'Edit Alumno': props<{ alumno: Alumno }>(),
    'Edit Alumno Success': props<{ alumno: Alumno }>(),
    'Edit Alumno Failure': props<{ error: Error }>(),

    'Delete Alumno': props<{ id: string }>(),
    'Delete Alumno Success': props<{ id: string }>(),
    'Delete Alumno Failure': props<{ error: Error }>(),
  },
});
