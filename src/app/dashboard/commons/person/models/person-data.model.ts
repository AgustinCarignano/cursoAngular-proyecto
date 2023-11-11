import { FormGroup } from '@angular/forms';
import { Person } from './person.model';

export interface PersonDialog {
  title: string;
  form: FormGroup;
  person?: Person;
}
