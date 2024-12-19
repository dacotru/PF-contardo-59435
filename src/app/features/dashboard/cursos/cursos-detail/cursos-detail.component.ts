import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../models/';

interface CursosDetailData {
  curso: Curso;
}

@Component({
  selector: 'app-cursos-detail',
  templateUrl: './cursos-detail.component.html',
  styleUrls: ['./cursos-detail.component.scss'],
})
export class CursosDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<CursosDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CursosDetailData
  ) {}
}
