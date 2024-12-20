import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AlumnosActions } from './store/alumnos.actions';
import { selectAllAlumnos, selectIsLoadingAlumnos } from './store/alumnos.selectors';
import { Alumno } from './models';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { AlumnosDetailComponent } from './alumnos-detail/alumnos-detail.component';
import { selectAutheticatedUser } from '../../../store/selectors/auth.selector';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  dataSource = new MatTableDataSource<Alumno>([]);
  displayedColumns: string[] = ['id', 'nombreCompleto', 'mail', 'acciones'];
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.isLoading$ = this.store.select(selectIsLoadingAlumnos);
    this.isAdmin$ = this.store.select(selectAutheticatedUser).pipe(
      map((user) => user?.role === 'Administrator')
    );
  }

  ngOnInit(): void {
    this.store.dispatch(AlumnosActions.loadAlumnos());
    this.store.select(selectAllAlumnos).subscribe((alumnos) => {
      this.dataSource.data = alumnos;
    });
  }

  openDialog(alumno?: Alumno): void {
    const dialogRef = this.dialog.open(AlumnosDialogComponent, {
      width: '400px',
      data: alumno || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (alumno) {
          this.store.dispatch(
            AlumnosActions.editAlumno({ alumno: { ...alumno, ...result } })
          );
        } else {
          const newAlumno = {
            ...result,
            createdAt: new Date().toISOString(),
          };
          this.store.dispatch(AlumnosActions.createAlumno({ alumno: newAlumno }));
        }
      }
    });
  }

  openDetail(alumno: Alumno): void {
    this.dialog.open(AlumnosDetailComponent, {
      width: '400px',
      data: { alumno },
    });
  }

  deleteAlumno(id: string): void {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.store.dispatch(AlumnosActions.deleteAlumno({ id }));
    }
  }
}
