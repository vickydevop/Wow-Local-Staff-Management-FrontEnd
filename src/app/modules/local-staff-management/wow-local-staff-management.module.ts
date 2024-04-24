import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNameRoutingModule } from './wow-local-staff-management.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { PortalModule } from '@angular/cdk/portal';
import { AudiTrailTableComponent } from './audit-trail-table/audit-trail-table.component';
import { NewGetsterComponent } from './new-getster/new-getster.component';
import { ExistingGetsterComponent } from './existing-getster/existing-getster.component';
import { BlockedGetsterComponent } from './blocked-getster/blocked-getster.component';

import { LocalStaffManagementComponent } from './local-staff-management.component';
import { AutoBlockComponent } from './blocked-getster/auto-block/auto-block.component';
import { ManualBlockComponent } from './blocked-getster/manual-block/manual-block.component';
import { GetsterAuditTrailComponent } from './getster-audit-trail/getster-audit-trail.component';
// import { AuditTrailDialogComponent } from 'src/app/shared/dialogs/audit-trail-dialog/audit-trail-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  NgxMatDatetimeContent,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { UserEIdentityCardEligibilityComponent } from './getster-profile/user-e-identity-card-eligibility/user-e-identity-card-eligibility.component';
import { ApproveProfileChangesByUsersComponent } from './getster-profile/approve-profile-changes-by-users/approve-profile-changes-by-users.component';
import { GetsterProfileLoginComponent } from './getster-profile/getster-profile-login/getster-profile-login.component';
import { GetsterProfileComponent } from './getster-profile/getster-profile.component';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddEditLocationComponent } from './getster-profile/add-edit-location/add-edit-location.component';
import { ApproveGetsterService } from 'src/app/shared/services/approve-getster/approve-getster.service';
// import { ConsoleGetstersComponent } from './console-getsters/console-getsters.component';
import { GetsterProfileCardComponent } from './getster-profile-card/getster-profile-card.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    GetsterAuditTrailComponent,
    LocalStaffManagementComponent,
    AudiTrailTableComponent,
    // AudiTrailTableComponent,
    NewGetsterComponent,
    ExistingGetsterComponent,
    BlockedGetsterComponent,
    AutoBlockComponent,
    ManualBlockComponent,
    GetsterProfileComponent,
    ApproveProfileChangesByUsersComponent,
    GetsterProfileLoginComponent,
    UserEIdentityCardEligibilityComponent,
    AddEditLocationComponent,
    // ConsoleGetstersComponent,
    GetsterProfileCardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AppNameRoutingModule,
    SharedModule,
    PortalModule,
    ColorPickerModule,
    NgxMatIntlTelInputComponent,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    QRCodeModule,
    MatTabsModule,
    NgxMatDatetimePickerModule,
    LeafletModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
  ],
  providers: [ApproveGetsterService],
})
export class NewCustomerDevelopmentVerificationModule {}
