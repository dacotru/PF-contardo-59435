import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss'],
})
export class AlumnoDetailComponent implements OnInit {
  @Input() alumno?: Alumno; // Permitir recibir datos por @Input
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos del modal
    private dialogRef: MatDialogRef<AlumnoDetailComponent> // Referencia al modal
  ) {}

  ngOnInit(): void {
    if (this.data) {
      // Si los datos se pasan al modal, simplemente los usa
      this.alumno = this.data;
    } else if (!this.alumno) {
      // Si no hay datos, carga por ID desde la ruta
      const idAlumno = this.activatedRoute.snapshot.params['id'];
      if (idAlumno) {
        this.isLoading = true;
        this.alumnoService
          .getById(idAlumno)
          .subscribe({
            next: (alumno) => {
              this.alumno = alumno;
              this.isLoading = false;
            },
            error: () => {
              this.isLoading = false;
            },
          });
      }
    }
  }
}
