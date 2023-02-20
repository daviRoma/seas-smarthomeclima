import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ControlPanelComponent } from 'src/app/pages/control-panel/control-panel.component';
import { SmartRoomModule } from './../../../features/smart-room/smart-room.module';

const ControlPanelPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'smart-room/list',
    pathMatch: 'full',
  },
  {
    path: 'smart-room',
    component: ControlPanelComponent,
    loadChildren: () => import(`src/app/features/smart-room/smart-room.module`).then((m) => m.SmartRoomModule),
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ControlPanelPageRoutes)],
  exports: [RouterModule],
})
export class ControlPanelRoutingModule {}