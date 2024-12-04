import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';

@Pipe({
  name: 'FullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: Alumno, transform?: 'uppercase'): string {
    const firstName = value.firstName.charAt(0).toUpperCase() + value.firstName.slice(1).toLowerCase();
    const lastName = value.lastName.charAt(0).toUpperCase() + value.lastName.slice(1).toLowerCase();
    const result = `${firstName} ${lastName}`;

    if (transform === 'uppercase') {
      return result.toUpperCase();
    }

    return result;
  }
}
