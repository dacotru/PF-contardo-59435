import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from '../models/';

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
})
export class AlumnosDialogComponent implements OnInit {
  alumnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AlumnosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) {
    this.alumnoForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      mail: [data?.mail || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.alumnoForm.valid) {
      this.dialogRef.close(this.alumnoForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
