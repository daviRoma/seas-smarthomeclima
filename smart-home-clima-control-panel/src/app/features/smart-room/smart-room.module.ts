import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SmartRoomRoutingModule } from './smart-room-routing.module';
import { PolicyGroupModule } from '../policy-group/policy-group.module';
import { PolicyModule } from '../policy/policy.module';
import { SensorModule } from 'src/app/features/sensor/sensor.module';
import { ActuatorModule } from 'src/app/features/actuator/actuator.module';

import { SmartRoomDetailComponent } from './components/smart-room-detail/smart-room-detail.component';
import { SmartRoomListComponent } from './components/smart-room-list/smart-room-list.component';
import { EditSmartRoomComponent } from './components/dialogs/edit-smart-room/edit-smart-room.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DeleteSmartRoomComponent } from './components/dialogs/delete-smart-room/delete-smart-room.component';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SmartRoomDetailComponent,
    SmartRoomListComponent,
    EditSmartRoomComponent,
    DeleteSmartRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SmartRoomRoutingModule,
    PolicyGroupModule,
    PolicyModule,
    SensorModule,
    ActuatorModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SmartRoomDetailComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class SmartRoomModule {}