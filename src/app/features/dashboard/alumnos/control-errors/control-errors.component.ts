import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'control-errors',
  templateUrl: './control-errors.component.html',
})
export class ControlErrorComponent {
  @Input() control: AbstractControl | null = null;

  get validationErrors(): ValidationErrors | null {
    return this.control?.errors ?? null;
  }
}
