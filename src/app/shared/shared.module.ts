import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import {
  NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  NgxMatMomentAdapter,
  NgxMomentDateModule,
} from '@angular-material-components/moment-adapter';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { RouterModule } from '@angular/router';
// import { MomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
// import {
//   DatetimeAdapter,
//   MTX_DATETIME_FORMATS,
// } from '@ng-matero/extensions/core';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { TimeFormatPipe } from '../modules/local-staff-management/new-getster/new-getster.component';
import { LoginComponent } from './dialogs/login/login.component';
import { NoInternetComponent } from './dialogs/no-internet/no-internet.component';
import { AddAllToPaginator } from './directives/add-all-to-paginator/add-all-to-paginator.directive';
import { NumbersOnly } from './directives/allowNumbersDecimals/allowNumbersDecimals.directive';
import { SeparatorDirective } from './directives/numberSeparatorByComma/numberSeparatorByComma.directive';
import { SpecialCharacterDirective } from './directives/specialCharacter/specialCharacter.directive';
import { AuthGuard } from './guards/auth-guard/auth.guard';
// import { AuthGuard } from './guards/auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';

export const Material_Date_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const Mtx_Date_FORMATs = {
  parse: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'DD MMM YYYY HH:mm A',
    monthYearLabel: 'YYYY MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    popupHeaderDateLabel: 'MMM DD, ddd',
  },
};

export const ngx_Date_FORMATs = {
  parse: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
  display: {
    dateInput: 'DD MMM YYYY HH:mm A',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'DD MMM YYYY HH:mm A',
    monthYearLabel: 'YYYY MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    popupHeaderDateLabel: 'MMM DD, ddd',
  },
};

const BASE_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  // FlexLayoutModule,
  MaterialModule,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMomentDateModule,
  NgxMatIntlTelInputComponent,
];

const Guards = [UnsavedChangesGuard, AuthGuard];

const Pipes = [EllipsisPipe, NoSanitizePipe, TimeFormatPipe];

const Directives = [
  AddAllToPaginator,
  NumbersOnly,
  SeparatorDirective,
  SpecialCharacterDirective,
];

@NgModule({
  declarations: [
    Pipes,
    Directives,
    LoginComponent,
    SpinnerComponent,
    NoInternetComponent,
  ],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [
    Guards,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: Material_Date_FORMATS },
    // {
    //   provide: DatetimeAdapter,
    //   useClass: MomentDatetimeAdapter,
    // },
    // {
    //   provide: MTX_DATETIME_FORMATS,
    //   useValue: Mtx_Date_FORMATs,
    // },
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: ngx_Date_FORMATs },
  ],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
