import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlPanelRoutingModule } from './control-panel-page-routing.module';

import { ControlPanelComponent } from './../../control-panel/control-panel.component';

import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    ControlPanelRoutingModule, 
    MatGridListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ControlPanelPageModule {}