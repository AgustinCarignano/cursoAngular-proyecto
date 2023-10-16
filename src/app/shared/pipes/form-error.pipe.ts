import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError',
})
export class FormErrorPipe implements PipeTransform {
  private requiredError = 'This field is required';
  private emailError = 'Must provide a valid email';
  private maxLengthError = (n: number) =>
    `The maximum length of this field is ${n} characters.`;
  private minLengthError = (n: number) =>
    `The minimun length of this field is ${n} characters.`;

  transform(value: ValidationErrors | null): string {
    const errorMessage: string[] = [];
    if (value?.['required']) errorMessage.push(this.requiredError);
    if (value?.['email']) errorMessage.push(this.emailError);
    if (value?.['maxlength'])
      errorMessage.push(
        this.maxLengthError(value['maxlength']['requiredLength'])
      );
    if (value?.['minlength'])
      errorMessage.push(
        this.minLengthError(value['minlength']['requiredLength'])
      );
    return errorMessage.join('. ');
  }
}
