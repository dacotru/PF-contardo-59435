import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Curso } from '../models/';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ cursos: Curso[] }>(),
    'Load Cursos Failure': props<{ error: any }>(),

    'Create Curso': props<{ curso: Curso }>(),
    'Create Curso Success': props<{ curso: Curso }>(),
    'Create Curso Failure': props<{ error: any }>(),

    'Edit Curso': props<{ curso: Curso }>(),
    'Edit Curso Success': props<{ curso: Curso }>(),
    'Edit Curso Failure': props<{ error: any }>(),

    'Delete Curso': props<{ id: string }>(),
    'Delete Curso Success': props<{ id: string }>(),
    'Delete Curso Failure': props<{ error: any }>(),
  },
});
