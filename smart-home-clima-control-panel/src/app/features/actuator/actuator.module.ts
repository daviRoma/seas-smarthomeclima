import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';

import { EditActuatorDialogComponent } from './components/dialogs/edit-actuator-dialog/edit-actuator-dialog.component';
import { DeleteActuatorDialogComponent } from './components/dialogs/delete-actuator-dialog/delete-actuator-dialog.component';

@NgModule({
  declarations: [
    EditActuatorDialogComponent,
    DeleteActuatorDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [EditActuatorDialogComponent, DeleteActuatorDialogComponent],
  providers: [
    MatDatepickerModule,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
})
export class ActuatorModule {}