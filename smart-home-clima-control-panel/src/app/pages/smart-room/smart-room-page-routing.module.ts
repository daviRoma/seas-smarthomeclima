import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';

const SmartRoomPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'detail',
    pathMatch: 'full',
  },
  {
    path: 'detail/:smartroom_id',
    component: DetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SmartRoomPageRoutes)],
  exports: [RouterModule],
})
export class SmartRoomPageRoutingModule {}