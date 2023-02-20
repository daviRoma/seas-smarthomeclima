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

import { EditSensorDialogComponent } from './components/dialogs/edit-sensor-dialog/edit-sensor-dialog.component';


@NgModule({
  declarations: [
    EditSensorDialogComponent
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
  exports: [EditSensorDialogComponent],
  providers: [
    MatDatepickerModule,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
})
export class SensorModule {}