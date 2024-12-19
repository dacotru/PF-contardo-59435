import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inscripcion } from '../models/';
import { selectAlumnosOptions, selectCursosOptions } from '../store/inscripciones.selectors';

interface InscripcionDetailData {
  inscripcion: Inscripcion;
}

@Component({
  selector: 'app-inscripciones-detail',
  templateUrl: './inscripciones-detail.component.html',
  styleUrls: ['./inscripciones-detail.component.scss'],
})
export class InscripcionesDetailComponent implements OnInit {
  alumnoData$: Observable<{ nombreCompleto: string; mail: string } | null> | null = null;
  cursoData$: Observable<{ profesor: string; modalidad: string; nombre: string } | null> | null = null;

  constructor(
    public dialogRef: MatDialogRef<InscripcionesDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InscripcionDetailData,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Obtener el nombre completo y el correo del alumno
    this.alumnoData$ = this.store.select(selectAlumnosOptions).pipe(
      map((alumnos) => {
        const alumno = alumnos.find((alumno) => alumno.id === this.data.inscripcion.alumnoId);
        return alumno
          ? {
              nombreCompleto: `${alumno.firstName} ${alumno.lastName}`,
              mail: alumno.mail || 'Sin correo',
            }
          : null;
      })
    );

    // Obtener los datos del curso (nombre, profesor y modalidad)
    this.cursoData$ = this.store.select(selectCursosOptions).pipe(
      map((cursos) => {
        const curso = cursos.find((curso) => curso.id === this.data.inscripcion.cursoId);
        return curso
          ? {
              nombre: curso.nombre || 'Sin nombre',
              profesor: curso.profesor || 'Desconocido',
              modalidad: curso.modalidad || 'No especificada',
            }
          : null;
      })
    );
  }
}
