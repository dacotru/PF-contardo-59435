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
  styles: ``,
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
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)],
      ],
      lastName: [
        data?.editingUser?.lastName || '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)],
      ],
      email: [
        data?.editingUser?.email || '',
        [Validators.required, Validators.email],
      ],
      role: [
        data?.editingUser?.role || '',
        Validators.required,
      ],
      password: [
        data?.editingUser ? '' : '',
        Validators.required,
      ],
    });

    if (this.isEditing) {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.isEditing ? this.data!.editingUser!.id : generateRandomString(4),
        createdAt: this.isEditing ? this.data!.editingUser!.createdAt : new Date(),
      });
    }
  }
}
