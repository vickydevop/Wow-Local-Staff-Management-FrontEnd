import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingGetsterComponent } from './existing-getster/existing-getster.component';

import { LocalStaffManagementComponent } from './local-staff-management.component';
import { NewGetsterComponent } from './new-getster/new-getster.component';

import { BlockedGetsterComponent } from './blocked-getster/blocked-getster.component';
import { GetsterProfileComponent } from './getster-profile/getster-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'getster-profile', pathMatch: 'full' },
  {
    path: 'getster-profile',
    component: LocalStaffManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'getster-profile',
        pathMatch: 'full',
      },
      {
        path: 'getster-profile',
        component: GetsterProfileComponent,
      },
      {
        path: 'new-getster',
        component: NewGetsterComponent,
      },
      {
        path: 'existing-getster',
        component: ExistingGetsterComponent,
      },
      {
        path: 'blocked-getster',
        component: BlockedGetsterComponent,
      },
      // {
      //   path: 'console-getster',
      //   component: ConsoleGetstersComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppNameRoutingModule {}
