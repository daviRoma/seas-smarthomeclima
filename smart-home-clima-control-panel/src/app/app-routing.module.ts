import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'control-panel',
    pathMatch: 'full',
  },
  {
    path: 'control-panel',
    component: BaseLayoutComponent,
    loadChildren: () =>
      import(`./pages/control-panel/modules/control-panel-page.module`).then((m) => m.ControlPanelPageModule)
  },
  {
    path: 'smart-room',
    component: BaseLayoutComponent,
    loadChildren: () =>
      import(`./pages/smart-room/smart-room-page.module`).then((m) => m.SmartRoomPageModule)
  },
  {
    path: '**',
    redirectTo: '/errors/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}