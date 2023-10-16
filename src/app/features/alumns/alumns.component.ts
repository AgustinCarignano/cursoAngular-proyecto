import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnsFormComponent } from './components/alumns-form/alumns-form.component';
import { Alumn } from './models/alumn.model';
import { alumnsData } from 'src/assets/mockData/alumns/alumnsData';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnsTableDataSource } from './components/alumns-table/alumns-table-datasource';

@Component({
  selector: 'app-alumns',
  templateUrl: './alumns.component.html',
  styleUrls: ['./alumns.component.scss'],
})
export class AlumnsComponent implements OnInit {
  public data: Alumn[] = alumnsData.map((a) => new Alumn(a));
  public dataSource!: AlumnsTableDataSource;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.dataSource = new AlumnsTableDataSource(this.data);
  }

  public showNotification(message: string): void {
    this.snackBar.open(message, 'ACEPTAR', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  public openFormDialog(alumn?: Alumn): void {
    this.dialog
      .open(AlumnsFormComponent, {
        data: {
          title: 'New Alumn',
          alumn,
        },
      })
      .afterClosed()
      .subscribe({
        next: (data: Alumn) => data && this.editAlumnList(data),
      });
  }

  public openConfirmDialog(alumnId: number): void {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe({
        next: (resp) => resp && this.deleteAlumn(alumnId),
      });
  }

  private editAlumnList(alumn: Alumn): void {
    let message: string;
    if (alumn.id) {
      const data = this.data.map((a) => (a.id === alumn.id ? alumn : a));
      this.dataSource = new AlumnsTableDataSource(data);
      message = 'Alumn edited';
    } else {
      const newId = this.data[this.data.length - 1].id + 1;
      const data = [...this.data, { ...alumn, id: newId }];
      this.dataSource = new AlumnsTableDataSource(data);
      message = 'New Alumn added';
    }
    this.showNotification(message);
  }

  private deleteAlumn(alumnId: number): void {
    const data = this.data.filter((a) => a.id !== alumnId);
    this.dataSource = new AlumnsTableDataSource(data);
    this.showNotification('Alumn deleted');
  }
}
