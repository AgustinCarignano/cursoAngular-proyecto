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
import { AlumnsTableDataSource } from './alumns-table-datasource';
import { Alumn } from '../../models/alumn.model';

@Component({
  selector: 'app-alumns-table',
  templateUrl: './alumns-table.component.html',
  styleUrls: ['./alumns-table.component.scss'],
})
export class AlumnsTableComponent implements OnChanges, AfterViewInit {
  @Input() public dataSource!: AlumnsTableDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Alumn>;
  @Output() public onEdit: EventEmitter<Alumn> = new EventEmitter<Alumn>();
  @Output() public onDelete: EventEmitter<number> = new EventEmitter<number>();

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
    if (this.table) {
      this.setTableData();
    }
  }

  public ngAfterViewInit(): void {
    this.setTableData();
  }

  public editElumn(alumn: Alumn): void {
    this.onEdit.emit(alumn);
  }

  public deleteAlumn(alumnId: number): void {
    this.onDelete.emit(alumnId);
  }

  private setTableData(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
