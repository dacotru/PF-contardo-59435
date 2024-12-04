import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AlumnosSelectors from './store/alumnos.selectors';
import * as AlumnosActions from './store/alumnos.actions';
import { Alumno } from './models';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { AlumnoDetailComponent } from './alumnos-detail/alumnos-detail.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Alumno>();
  isLoading$: Observable<boolean>;

  constructor(private matDialog: MatDialog, private store: Store) {
    this.isLoading$ = this.store.select(AlumnosSelectors.selectAlumnosLoading);
  }

  ngOnInit(): void {
    this.loadAlumnos();
    this.store
      .select(AlumnosSelectors.selectAlumnosList)
      .subscribe((alumnos) => {
        this.dataSource.data = alumnos || [];
      });
  }

  loadAlumnos(): void {
    this.store.dispatch(AlumnosActions.loadAlumnos());
  }

  openModal(alumno?: Alumno): void {
    const dialogRef = this.matDialog.open(AlumnosDialogComponent, {
      data: { editingAlumno: alumno || null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.store.dispatch(AlumnosActions.editAlumno({ alumno: result }));
        } else {
          this.store.dispatch(AlumnosActions.addAlumno({ alumno: result }));
        }
      }
    });
  }

  openDetail(alumno: Alumno): void {
    this.matDialog.open(AlumnoDetailComponent, {
      data: { alumno },
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro que quieres eliminar este alumno?')) {
      this.store.dispatch(AlumnosActions.deleteAlumno({ id }));
    }
  }
}
