import { Pipe, PipeTransform } from '@angular/core';
import { Person } from 'src/app/dashboard/commons/person/models/person.model';
import { Student } from 'src/app/dashboard/pages/students/models/student.model';
import { User } from 'src/app/dashboard/pages/users/models/user.model';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value?: Person | User, capitalize = true): string {
    if (!value) return '';
    const copyOfValue = structuredClone(value);
    if (capitalize) {
      copyOfValue.lastName = this.capitalize(copyOfValue.lastName);
      copyOfValue.firstName = this.capitalize(copyOfValue.firstName);
    }
    return `${copyOfValue.lastName}, ${copyOfValue.firstName}`;
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
