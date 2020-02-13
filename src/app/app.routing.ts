import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  AppComponent
} from './app.component';
import {
  TraineeListComponent
} from './trainee-list/trainee-list.component';
import {
  TraineeFormComponent
} from './trainee-form/trainee-form.component';

const appRoutes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: TraineeListComponent
}, {
  path: 'traineeForm',
  component: TraineeFormComponent
}];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
