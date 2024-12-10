import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AlumnosActions } from './store/alumnos.actions';
import { selectAlumnos, selectAlumnosError } from './store/alumnos.selectors';
import { Alumno } from './models';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  // DataSource para la tabla de alumnos
  dataSource = new MatTableDataSource<Alumno>([]);

  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['id', 'nombreCompleto', 'mail', 'acciones'];

  // Observables para los alumnos y errores
  alumnos$: Observable<Alumno[]>;
  loadError$: Observable<any>;

  constructor(private store: Store, private dialog: MatDialog) {
    // Inicializando los observables
    this.alumnos$ = this.store.select(selectAlumnos);
    this.loadError$ = this.store.select(selectAlumnosError);
  }

  ngOnInit(): void {
    // Cargar alumnos desde el store
    this.store.dispatch(AlumnosActions.loadAlumnos());

    // Suscribirse a los alumnos y actualizar el dataSource
    this.alumnos$.subscribe((alumnos) => {
      this.dataSource.data = alumnos ?? []; // Si alumnos es null, asignamos un arreglo vacío
    });
  }

  // Abre el diálogo para agregar o editar un alumno
  openDialog(alumno?: Alumno): void {
    const dialogRef = this.dialog.open(AlumnosDialogComponent, {
      width: '400px',
      data: alumno || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (alumno) {
          // Editar alumno existente
          this.store.dispatch(
            AlumnosActions.editAlumno({ alumno: { ...alumno, ...result } })
          );
        } else {
          // Crear un nuevo alumno
          this.store.dispatch(AlumnosActions.createAlumno({ alumno: result }));
        }
      }
    });
  }

  // Eliminar un alumno
  deleteAlumno(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este alumno?')) {
      this.store.dispatch(AlumnosActions.deleteAlumno({ id }));
    }
  }
}
