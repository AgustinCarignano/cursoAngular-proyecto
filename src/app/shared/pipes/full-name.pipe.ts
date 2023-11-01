import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/pages/students/models/student.model';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: Student, capitalize = true): string {
    if (capitalize) {
      value.lastName = this.capitalize(value.lastName);
      value.firstName = this.capitalize(value.firstName);
    }
    return `${value.lastName}, ${value.firstName}`;
  }

  private capitalize(v: string): string {
    let result = '';
    for (let i = 0, n = v.length; i < n; i++) {
      if (i === 0) result += v[i].toUpperCase();
      else if (v[i - 1] === ' ') result += v[i].toUpperCase();
      else result += v[i].toLowerCase();
    }
    return result;
  }
}
