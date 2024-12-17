import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';

import { InscripcionesActions } from './store/inscripciones.actions';
import {
  selectInscripciones,
  selectAlumnosOptions,
  selectCursosOptions,
} from './store/inscripciones.selectors';
import { InscripcionesDialogComponent } from './inscripciones-dialog/inscripciones-dialog.component';
import { Inscripcion } from './models/';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'alumnoNombre', 'cursoNombre', 'acciones'];

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadAlumnosAndCursosOptions());
    this.store.dispatch(InscripcionesActions.loadInscripciones());

    combineLatest([
      this.store.select(selectInscripciones),
      this.store.select(selectAlumnosOptions),
      this.store.select(selectCursosOptions),
    ]).subscribe(([inscripciones, alumnos, cursos]) => {
      this.dataSource.data = inscripciones.map((inscripcion) => ({
        ...inscripcion,
        alumnoNombre: `${alumnos.find((a) => a.id === inscripcion.alumnoId)?.firstName || ''} ${
          alumnos.find((a) => a.id === inscripcion.alumnoId)?.lastName || ''
        }`,
        cursoNombre: cursos.find((c) => c.id === inscripcion.cursoId)?.nombre || '',
      }));
    });
  }

  openDialog(inscripcion?: Inscripcion): void {
    const dialogRef = this.dialog.open(InscripcionesDialogComponent, {
      width: '400px',
      data: inscripcion || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (inscripcion) {
          this.store.dispatch(
            InscripcionesActions.editInscripcion({
              inscripcion: { ...inscripcion, ...result },
            })
          );
        } else {
          this.store.dispatch(InscripcionesActions.createInscripcion(result));
        }
      }
    });
  }

  deleteInscripcion(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
      this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
    }
  }
}
