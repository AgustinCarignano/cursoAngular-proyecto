import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Person } from '../../models/person.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PersonTableDataSource } from './person-table-datasource';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss'],
})
export class PersonTableComponent {
  @Input() public dataSource!: PersonTableDataSource;
  @Input() public data: Person[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Person>;
  @Output() public onEdit: EventEmitter<Person> = new EventEmitter<Person>();
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
    this.dataSource = new PersonTableDataSource(this.data);
    if (this.table) {
      this.setTableData();
    }
  }

  public ngAfterViewInit(): void {
    this.setTableData();
  }

  public editPerson(person: Person): void {
    this.onEdit.emit(person);
  }

  public deletePerson(personId: number): void {
    this.onDelete.emit(personId);
  }

  private setTableData(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
