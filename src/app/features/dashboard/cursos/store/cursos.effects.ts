import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { CursosActions } from './cursos.actions';
import { CursosService } from '../../../../core/services/cursos.service';
import { Action } from '@ngrx/store';

@Injectable()
export class CursosEffects {
  loadCursos$: Actions<Action<string>>;
  createCurso$: Actions<Action<string>>;
  createCursoSuccess$: Actions<Action<string>>;
  editCurso$: Actions<Action<string>>;
  deleteCurso$: Actions<Action<string>>;

  constructor(private actions$: Actions, private cursosService: CursosService) {
    // Efecto para cargar los cursos
    this.loadCursos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.loadCursos),
        concatMap(() =>
          this.cursosService.getCursos().pipe(
            map((cursos) =>
              CursosActions.loadCursosSuccess({ cursos })
            ),
            catchError((error) =>
              of(CursosActions.loadCursosFailure({ error }))
            )
          )
        )
      );
    });

    // Efecto para crear un curso
    this.createCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.createCurso),
        concatMap((action) =>
          this.cursosService
            .createCurso({
              nombre: action.nombre,
              modalidad: action.modalidad,
              profesor: action.profesor,
            })
            .pipe(
              map((curso) =>
                CursosActions.createCursoSuccess({ curso })
              ),
              catchError((error) =>
                of(CursosActions.createCursoFailure({ error }))
              )
            )
        )
      );
    });

    // Efecto para manejar la creación exitosa de un curso
    this.createCursoSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.createCursoSuccess),
        map(() => CursosActions.loadCursos())
      );
    });

    // Efecto para editar un curso
    this.editCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.editCurso),
        concatMap((action) =>
          this.cursosService
            .updateCursoById(action.curso.id, action.curso)
            .pipe(
              map((curso) =>
                CursosActions.editCursoSuccess({ curso })
              ),
              catchError((error) =>
                of(CursosActions.editCursoFailure({ error }))
              )
            )
        )
      );
    });

    // Efecto para eliminar un curso
    this.deleteCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.deleteCurso),
        concatMap((action) =>
          this.cursosService
            .removeCursoById(action.id)
            .pipe(
              map(() =>
                CursosActions.deleteCursoSuccess({ id: action.id })
              ),
              catchError((error) =>
                of(CursosActions.deleteCursoFailure({ error }))
              )
            )
        )
      );
    });
  }
}


