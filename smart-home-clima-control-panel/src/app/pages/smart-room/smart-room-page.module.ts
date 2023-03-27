import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartRoomPageRoutingModule } from './smart-room-page-routing.module';
import { SmartRoomModule } from 'src/app/features/smart-room/smart-room.module';

import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS, 
} from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DetailComponent } from './detail/detail.component';

import { NgChartsModule } from 'ng2-charts'; 

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    SmartRoomPageRoutingModule,
    SmartRoomModule,
    NgChartsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ]
})
export class SmartRoomPageModule {}