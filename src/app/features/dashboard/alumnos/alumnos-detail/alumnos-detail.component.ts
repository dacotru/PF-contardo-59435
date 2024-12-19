import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../models/';

interface AlumnosDetailData {
  alumno: Alumno;
}

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss'],
})
export class AlumnosDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<AlumnosDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlumnosDetailData
  ) {}
}
