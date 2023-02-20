import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditPolicyGroupDialogComponent } from './components/dialogs/edit-policy-group-dialog/edit-policy-group-dialog.component';
import { DeletePolicyGroupDialogComponent } from './components/dialogs/delete-policy-group-dialog/delete-policy-group-dialog.component';

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


@NgModule({
  declarations: [
    EditPolicyGroupDialogComponent,
    DeletePolicyGroupDialogComponent
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
  exports: [EditPolicyGroupDialogComponent, DeletePolicyGroupDialogComponent],
  providers: [
    MatDatepickerModule,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
})
export class PolicyGroupModule {}