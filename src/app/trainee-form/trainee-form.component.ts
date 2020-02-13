import { TraineeService } from './../trainee.service';
import { TraineeListComponent } from './../trainee-list/trainee-list.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';

import { ITrainee} from '../model/trainee';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';


@Component({
  selector: 'app-trainee-form',
  templateUrl: './trainee-form.component.html',
  styleUrls: ['./trainee-form.component.css']
})

export class TraineeFormComponent implements OnInit {

  msg: string;
  indLoading = false;
  traineeFrm: FormGroup;
  listFilter: string;
  selectedOption: string;
  genders = [];
  expTechnos = [];

  // Form Errors model
  formErrors = {
    'name': '',
    'email': '',
    'gender': '',
    'birth': '',
    'message': '',
    'experiencedTechno': ''
  };

  // Custom Validation messages
  validationMessages = {
    'name': {
      'maxlength': 'Name cannot be larger than 50 characters.',
      'required': 'Name is required.'
    },
    'email': {
      'email': 'Invalid Email format.',
      'required': 'Email is required.'
    },
    'gender': {
     'required': 'Gender is required.'
    },
    'experiencedTechno': {
      'required': 'Select Experienced Technology'
    },
    'birth': {
      'required': 'Birthday is required.'
    },
    'message': {
      'required': 'message is required.'
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private _traineeService: TraineeService,
  public dialogRef: MatDialogRef<TraineeListComponent>) { }

  ngOnInit() {
    // build form
    this.traineeFrm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      message: ['', [Validators.required]],
      experiencedTechno: ['', [Validators.required]]
    });

    this.genders = Global.genders;
    this.expTechnos = Global.expTechnos;

    // To show validatons, value change Event
    this.traineeFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    console.log('***** Into Form Init,  dbops = ' + this.data.dbops);
    // console.log('IS dbops equals Create ? ' + this.data.dbops.equals(DBOperation.create));
    console.log('IS dbops === Create ? ' + (this.data.dbops === DBOperation.create));
    if (this.data.dbops === DBOperation.create) {
      this.traineeFrm.reset();
    } else {
      console.log('***** Should populate Fields');
      this.traineeFrm.setValue(this.data.trainee);
    }


    this.SetControlState(this.data.dbops === DBOperation.delete ? false : true);

  }

  // Enable/Disable form
  SetControlState(enable: boolean) {
    console.log('Form State Enable :' + enable);
    enable ? this.traineeFrm.enable() : this.traineeFrm.disable();
  }

  // Map Data Obj to/from Form data
  mapDateData(trainee: ITrainee): ITrainee {
    trainee.birth = new Date(trainee.birth).toISOString();
    return trainee;
  }

  // Form Value change Event
  onValueChanged(data?: any): void {
    if (! this.traineeFrm) {
      return;
    }

    const form = this.traineeFrm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // Clear all previous error msgs, if any
      this.formErrors[field] = '';
      // Get control of field
      const ctrl = form.get(field);
      // If ctrl is changed & not valid
      if (ctrl && ctrl.dirty && !ctrl.valid) {
        // Retieve & Set custom validation msg
        const msgs = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in ctrl.errors) {
          this.formErrors[field] += msgs[key] + ' ';
        }
      }

    } // for

  }

  // Submit
  onSubmit(formData: any) {
    const traineeData = this.mapDateData(formData.value);

    switch (this.data.dbops) {
      case DBOperation.create:
        console.log('**** Calling ADD');
        this._traineeService.addTrainee(Global.BASE_USER_ENDPOINT + 'addTrainee', traineeData)
            .subscribe( data => {
          // Success
          if (data.message) {
            this.dialogRef.close('success');
          } else {
            this.dialogRef.close('error');
          }
        },
        error => {
          this.dialogRef.close('error');
        });
        break;
      case DBOperation.update:
      console.log('**** Calling UPDATE');
      this._traineeService.updateTrainee(Global.BASE_USER_ENDPOINT + 'updateTrainee', traineeData.id, traineeData)
            .subscribe(data => {
           // Success
           if (data.message) {
            this.dialogRef.close('success');
          } else {
            this.dialogRef.close('error');
          }
        },
        error => {
          this.dialogRef.close('error');
        });
        break;
      case DBOperation.delete:
        console.log('**** Calling DELETE');
        this._traineeService.deleteTrainee(Global.BASE_USER_ENDPOINT + 'deleteTrainee', traineeData.id)
            .subscribe(data => {
           // Success
           if (data.message) {
            this.dialogRef.close('success');
          } else {
            this.dialogRef.close('error');
          }
        },
        error => {
          this.dialogRef.close('error');
        });
        break;
    } // Switch
  } // onSubmit

}
