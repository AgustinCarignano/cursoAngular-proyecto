import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input() title!: string;
  @Input() addButtonLabel!: string;
  @Input() persons!: Person[];
  @Input() public isLoading!: boolean;
  @Output() onAdd: EventEmitter<void> = new EventEmitter();
  @Output() onEdit: EventEmitter<Person> = new EventEmitter();
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  newPerson(): void {
    this.onAdd.next();
  }
  editPerson(person: Person): void {
    this.onEdit.next(person);
  }
  deletePerson(personId: number): void {
    this.onDelete.next(personId);
  }
}
