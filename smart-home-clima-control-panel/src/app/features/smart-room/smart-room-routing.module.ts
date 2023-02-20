import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { SmartRoomDetailComponent } from './components/smart-room-detail/smart-room-detail.component';
import { SmartRoomListComponent } from './components/smart-room-list/smart-room-list.component';

const SmartRoomRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: SmartRoomListComponent,
  },
  {
    path: 'detail/:smartroom_id',
    component: SmartRoomDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SmartRoomRoutes)],
  exports: [RouterModule],
})
export class SmartRoomRoutingModule {}