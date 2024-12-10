import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../models';

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
  styleUrls: ['./alumnos-dialog.component.scss'],
})
export class AlumnosDialogComponent implements OnInit {
  alumnoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AlumnosDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Alumno | null
  ) {
    this.alumnoForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.alumnoForm.patchValue(this.data);
    }
  }

  save(): void {
    if (this.alumnoForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.alumnoForm.value });
    }
  }
}
