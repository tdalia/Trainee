import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { TraineeFormComponent } from '../trainee-form/trainee-form.component';
import { TraineeService } from './../trainee.service';
import { ITrainee } from './../model/trainee';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';

@Component({
  selector: 'app-trainee-list',
  templateUrl: './trainee-list.component.html',
  styleUrls: ['./trainee-list.component.css']
})
export class TraineeListComponent implements OnInit {

  trainees: ITrainee[];
  trainee: ITrainee;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;

  // Set columns that are displayed in table
  displayedCols = ['name', 'email', 'gender', 'birth', 'experiencedTechno', 'message', 'action'];
  dataSource = new MatTableDataSource<ITrainee>();

  constructor(public snackBar: MatSnackBar, private _traineeService: TraineeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadingState = true;
    this.loadTrainees();
  }

  openDialog(): void {
    const dlgRef = this.dialog.open(TraineeFormComponent, {
      width: '500px', height: '700px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, trainee: this.trainee}
    });

    dlgRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');

      if (result === 'success') {
        this.loadingState = true;
        this.loadTrainees();

        switch (this.dbops) {
          case DBOperation.create:
            this.showMessage('Trainee successfully added.');
            break;
          case DBOperation.update:
            this.showMessage('Trainee successfully updated.');
            break;
          case DBOperation.delete:
            this.showMessage('Trainee successfully deletef.');
            break;
        }
      } else if (result === 'error') {
        this.showMessage('Some problem occured while saving records. Please contact system administrator!');
      } else { }
    });
  } // openDialog

  // Load Traiineed in data source for the table
  loadTrainees(): void {
    this._traineeService.getAllTrainee(Global.BASE_USER_ENDPOINT + 'getAllTrainee')
      .subscribe(trainees => {
        this.loadingState = false;
        this.dataSource.data = trainees;
      });
  }

  getGender(genderNum: number): string {
    return Global.genders.filter(ele => ele.id === genderNum).map(ele => ele.name)[0];
  }
  // Prepare to open Trainee Form for respective actions.
  addTraine() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Trainee';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }

  editTrainee(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Trainee';
    this.modalBtnTitle = 'Update';
    this.trainee = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }

  deleteTrainee(id: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm Delete ?';
    this.modalBtnTitle = 'Delete';
    this.trainee = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000 });
  }

}
