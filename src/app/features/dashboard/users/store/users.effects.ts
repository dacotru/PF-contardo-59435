import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersService } from '../../../../core/services/users.service';

@Injectable()
export class UsersEffects {
  loadUsers$: any;
  createUser$: any;
  editUser$: any;
  deleteUser$: any;

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {
    // Cargar usuarios
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.loadUsers),
        concatMap(() =>
          this.usersService.getUsers().pipe(
            map((users) => UsersActions.loadUsersSuccess({ users })),
            catchError((error) =>
              of(UsersActions.loadUsersFailure({ error }))
            )
          )
        )
      )
    );

    // Crear usuario
    this.createUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.createUser),
        concatMap((action) =>
          this.usersService.createUser(action.user).pipe(
            map((user) => UsersActions.createUserSuccess({ user })),
            catchError((error) =>
              of(UsersActions.createUserFailure({ error }))
            )
          )
        )
      )
    );

    // Editar usuario
    this.editUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.editUser),
        concatMap((action) =>
          this.usersService
            .updateUserById(action.user.id, action.user)
            .pipe(
              map(() => UsersActions.editUserSuccess({ user: action.user })),
              catchError((error) =>
                of(UsersActions.editUserFailure({ error }))
              )
            )
        )
      )
    );

    // Eliminar usuario
    this.deleteUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.deleteUser),
        concatMap((action) =>
          this.usersService.removeUserById(action.id).pipe(
            map(() => UsersActions.deleteUserSuccess({ id: action.id })),
            catchError((error) =>
              of(UsersActions.deleteUserFailure({ error }))
            )
          )
        )
      )
    );
  }
}
