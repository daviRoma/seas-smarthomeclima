import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutsRoutes } from './layouts.routing';

import { MainbarComponent } from './mainbar/mainbar.component';
import { FooterComponent } from './footer/footer.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BaseLayoutComponent,
    MainbarComponent,
    FooterComponent,
    BaseLayoutComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule.forChild(LayoutsRoutes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule { }