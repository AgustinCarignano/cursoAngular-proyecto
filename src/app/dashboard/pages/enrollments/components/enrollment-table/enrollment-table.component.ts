import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseEdition } from '../../../courses/models';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Enrollment } from '../../models';

@Component({
  selector: 'app-enrollment-table',
  templateUrl: './enrollment-table.component.html',
  styleUrls: ['./enrollment-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EnrollmentTableComponent {
  @Input() dataSource: CourseEdition[] = [];
  @Output() addStudent: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteEnrollment: EventEmitter<Enrollment> =
    new EventEmitter<Enrollment>();
  @Output() editEdition: EventEmitter<number> = new EventEmitter<number>();
  columnsToDisplay = ['course', 'startDate', 'endDate', 'professor', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedEdition!: CourseEdition | null;

  constructor() {}

  onAddStudent(editionId: number): void {
    this.addStudent.emit(editionId);
  }

  onEditEdition(editionId: number): void {
    this.editEdition.emit(editionId);
  }

  onDeleteStudent(enrollment: Enrollment): void {
    this.deleteEnrollment.emit(enrollment);
  }
}
