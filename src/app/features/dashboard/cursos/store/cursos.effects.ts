import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { CursoService } from '../../../../core/services/cursos.service';

@Injectable()
export class CursosEffects {
  constructor(private actions$: Actions, private cursoService: CursoService) {}

  loadCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.loadCursos), // Escucha la acción de carga
      mergeMap(() =>
        this.cursoService.getCursos().pipe(
          map((cursos) => {
            if (!cursos || cursos.length === 0) {
              throw new Error('No se encontraron cursos'); // Manejar si cursos es null o vacío
            }
            return CursosActions.loadCursosSuccess({ cursos });
          }),
          catchError((error) => {
            console.error('Error al cargar cursos:', error); // Log para depuración
            return of(CursosActions.loadCursosFailure({ error }));
          })
        )
      )
    )
  );

  addCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.addCurso),
      mergeMap(({ curso }) =>
        this.cursoService.addCurso(curso).pipe(
          map((newCurso) => CursosActions.addCursoSuccess({ curso: newCurso })),
          catchError((error) => {
            console.error('Error al agregar curso:', error); // Log de error
            return of(CursosActions.addCursoFailure({ error }));
          })
        )
      )
    )
  );

  editCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.editCurso),
      mergeMap(({ curso }) =>
        this.cursoService.updateCursoById(curso.id, curso).pipe(
          map((updatedCurso) =>
            CursosActions.editCursoSuccess({ curso: updatedCurso })
          ),
          catchError((error) => {
            console.error('Error al editar curso:', error); // Log de error
            return of(CursosActions.editCursoFailure({ error }));
          })
        )
      )
    )
  );

  deleteCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.deleteCurso),
      mergeMap(({ id }) =>
        this.cursoService.removeCursoById(id).pipe(
          map(() => CursosActions.deleteCursoSuccess({ id })),
          catchError((error) => {
            console.error('Error al eliminar curso:', error); // Log de error
            return of(CursosActions.deleteCursoFailure({ error }));
          })
        )
      )
    )
  );
}
