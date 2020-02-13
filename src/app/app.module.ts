import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app.material.module';
import { TraineeFormComponent } from './trainee-form/trainee-form.component';
import { TraineeListComponent } from './trainee-list/trainee-list.component';
import { TraineeService } from './trainee.service';
import { Routing } from './app.routing';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TraineeFormComponent,
    TraineeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    Routing
  ],
  providers: [TraineeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
