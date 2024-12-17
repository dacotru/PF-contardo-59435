import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripcion } from '../models';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ inscripciones: Inscripcion[] }>(),
    'Load Inscripciones Failure': props<{ error: any }>(),

    'Create Inscripcion': props<{ alumnoId: string; cursoId: string }>(),
    'Create Inscripcion Success': props<{ inscripcion: Inscripcion }>(),
    'Create Inscripcion Failure': props<{ error: any }>(),

    'Edit Inscripcion': props<{ inscripcion: Inscripcion }>(),
    'Edit Inscripcion Success': props<{ inscripcion: Inscripcion }>(),
    'Edit Inscripcion Failure': props<{ error: any }>(),

    'Delete Inscripcion': props<{ id: string }>(),
    'Delete Inscripcion Success': props<{ id: string }>(),
    'Delete Inscripcion Failure': props<{ error: any }>(),

    'Load Alumnos And Cursos Options': emptyProps(),
    'Load Alumnos And Cursos Options Success': props<{ alumnos: Alumno[]; cursos: Curso[] }>(),
    'Load Alumnos And Cursos Options Failure': props<{ error: any }>(),
  },
});
