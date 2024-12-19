import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { User } from '../models';

interface UserDialogData {
  editingUser?: User;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
})

export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
  ) {
    this.userForm = this.formBuilder.group({
      firstName: [
        data?.editingUser?.firstName || '',
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [
        data?.editingUser?.lastName || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        data?.editingUser?.email || '',
        [Validators.required, Validators.email],
      ],
      role: [
        data?.editingUser?.role || '',
        [Validators.required],
      ],
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.data?.editingUser?.id || generateRandomString(8),
        createdAt: this.data?.editingUser?.createdAt || new Date(),
      });
    }
  }
}
