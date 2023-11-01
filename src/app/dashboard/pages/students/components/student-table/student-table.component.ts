import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentsTableDataSource } from './student-table-datasource';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-students-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
})
export class StudentsTableComponent implements OnChanges, AfterViewInit {
  @Input() public dataSource!: StudentsTableDataSource;
  @Input() public data: Student[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Student>;
  @Output() public onEdit: EventEmitter<Student> = new EventEmitter<Student>();
  @Output() public onDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onDetail: EventEmitter<number> = new EventEmitter<number>();

  displayedColumns = [
    'id',
    'fullName',
    'email',
    'birthdate',
    'dni',
    'city',
    'actions',
  ];

  public ngOnChanges(): void {
    this.dataSource = new StudentsTableDataSource(this.data);
    if (this.table) {
      this.setTableData();
    }
  }

  public ngAfterViewInit(): void {
    this.setTableData();
  }

  public editElumn(student: Student): void {
    this.onEdit.emit(student);
  }

  public deleteStudent(studentId: number): void {
    this.onDelete.emit(studentId);
  }

  private setTableData(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
