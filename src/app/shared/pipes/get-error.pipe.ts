import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'getError',
  pure: false,
})
export class GetErrorPipe implements PipeTransform {
  transform(
    form: FormGroup<any>,
    controlName: string
  ): ValidationErrors | null {
    return form.get(controlName)?.errors || null;
  }
}
