import { createAction, props } from '@ngrx/store';
import { Curso } from '../models';

// Acción para cargar todos los cursos
export const loadCursos = createAction('[Cursos] Load Cursos');
export const loadCursosSuccess = createAction(
  '[Cursos] Load Cursos Success',
  props<{ cursos: Curso[] }>()
);
export const loadCursosFailure = createAction(
  '[Cursos] Load Cursos Failure',
  props<{ error: any }>()
);

export const loadCursoById = createAction(
  '[Cursos] Load Curso By ID',
  props<{ id: string }>() // Cambiar a string
);

export const loadCursoByIdSuccess = createAction(
  '[Cursos] Load Curso By ID Success',
  props<{ curso: Curso }>()
);

export const loadCursoByIdFailure = createAction(
  '[Cursos] Load Curso By ID Failure',
  props<{ error: any }>()
);

// Agregar curso
export const addCurso = createAction(
  '[Cursos] Add Curso',
  props<{ curso: Curso }>()
);
export const addCursoSuccess = createAction(
  '[Cursos] Add Curso Success',
  props<{ curso: Curso }>()
);
export const addCursoFailure = createAction(
  '[Cursos] Add Curso Failure',
  props<{ error: any }>()
);

// Editar curso
export const editCurso = createAction(
  '[Cursos] Edit Curso',
  props<{ curso: Curso }>()
);
export const editCursoSuccess = createAction(
  '[Cursos] Edit Curso Success',
  props<{ curso: Curso }>()
);
export const editCursoFailure = createAction(
  '[Cursos] Edit Curso Failure',
  props<{ error: any }>()
);

// Eliminar curso
export const deleteCurso = createAction(
  '[Cursos] Delete Curso',
  props<{ id: number }>()
);
export const deleteCursoSuccess = createAction(
  '[Cursos] Delete Curso Success',
  props<{ id: number }>()
);
export const deleteCursoFailure = createAction(
  '[Cursos] Delete Curso Failure',
  props<{ error: any }>()
);
