import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersActions } from './store/users.actions';
import { selectAllUsers, selectIsLoading } from './store/users.selectors';
import { selectAutheticatedUser } from '../../../store/selectors/auth.selector';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: User[] = [];
  isLoading = false;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.isAdmin$ = this.store.select(selectAutheticatedUser).pipe(
      map((user) => user?.role === 'Administrator')
    );
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
    this.store.select(selectAllUsers).subscribe((users) => {
      this.dataSource = users;
    });
    this.store.select(selectIsLoading).subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  openModal(editingUser?: User): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: { editingUser },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (editingUser) {
            this.store.dispatch(
              UsersActions.editUser({ user: { ...editingUser, ...result } })
            );
          } else {
            this.store.dispatch(UsersActions.createUser({ user: result }));
          }
        }
      });
  }

  openDetail(user: User): void {
    this.matDialog.open(UserDetailComponent, {
      data: { user },
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.store.dispatch(UsersActions.deleteUser({ id }));
    }
  }
}
