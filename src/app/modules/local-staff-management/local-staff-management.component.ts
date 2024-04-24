import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  NgZone,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
// import { AuditTrailDialogComponent } from 'src/app/shared/dialogs/audit-trail-dialog/audit-trail-dialog.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { GetsterAuditTrailComponent } from './getster-audit-trail/getster-audit-trail.component';

declare var GoogleTranslate: Function;
@Component({
  selector: 'app-app-name',
  templateUrl: './local-staff-management.component.html',
  styleUrls: ['./local-staff-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalStaffManagementComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  headerTitle$: Subscription;
  getsterAccessControlForm: UntypedFormGroup = new UntypedFormGroup({});
  tabName: string = 'Table';

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  firstFormGroup!: UntypedFormGroup;
  formvalue: any;
  showTranslate: boolean = true;
  audit_trail_btn_state: boolean;
  audit_trail$: Observable<any>;
  audit_trail_type: string;
  menuName: any;

  constructor(
    private _cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private _headerTitle: HeaderTitleService,
    private _formBuilder: UntypedFormBuilder,
    private _dataSharingService: DataSharingService,
    private _apiService: ApiService,
    media: MediaMatcher,
    private _router: Router,
    private _ngZone: NgZone
  ) {
    this.firstFormGroup = this._formBuilder.group({
      languageControl: [''],
    });
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => _cdRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.sidenav;

    this.audit_trail$ = this._dataSharingService.audit_trail_data;
  }

  ngAfterViewInit() {
    this.headerTitle$ = this._headerTitle.title.subscribe((title) => {
      this.menuName = title;
      // this._cdRef.detectChanges();
    });

    // this._headerTitle.setTitle('hello');
  }

  stopClose($event: any) {
    $event.stopPropagation();
    //Another instructions
  }

  sideOnclickClose() {
    if (this.sidenav.mode == 'side') {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

  menu = [
    // {
    //   label: 'New GETSTERs',
    //   link: '/new-getster/new-getster',
    // },
    // {
    //   label: 'Existing GETSTERs',
    //   link: '/new-getster/existing-getster',
    // },
    // {
    //   label: 'Blocked GETSTERs',
    //   link: '/new-getster/blocked-getster',
    // },
    // {
    //   label: 'GETster.Tech Administrators',
    //   link: '/new-getster/console-getster',
    // },
    {
      label: 'Recruit/Approve New Staff',
      link: '/login-page/getster-profile',
    },
  ];

  getName(data: any) {
    this.menuName = data;
  }
  onClick(link: string) {
    this._ngZone.run(() => {
      this._router.navigate([link]);
    });
  }

  openAuditTrail() {
    let config: MatDialogConfig = {
      disableClose: true,
      // minWidth: '400px',
      // minHeight: 'calc(100vh - 500px)',
      minWidth: '360px',
      minHeight: 'auto',
    };

    const auditTrailDialog = this.dialog.open(
      GetsterAuditTrailComponent,
      config
    );
  }

  ngOnDestroy(): void {
    if (this.headerTitle$) {
      this.headerTitle$.unsubscribe();
    }
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  get writer() {
    return this.firstFormGroup.get('languageControl');
  }

  onlanguagechange() {
    console.log(this.writer.value);
    this.formvalue = this.writer.value;
    localStorage.setItem('googleTranslate', this.formvalue);
    GoogleTranslate();
  }

  showbtn() {
    this.showTranslate = !this.showTranslate;
  }

  googleLanguage: lang[] = [
    {
      value: 'af',
      label: 'Afrikaans',
    },
    {
      value: 'sq',
      label: 'Albanian',
    },
    {
      value: 'ar',
      label: 'Arabic',
    },
    {
      value: 'az',
      label: 'Azerbaijani',
    },
    {
      value: 'eu',
      label: 'Basque',
    },
    {
      value: 'bn',
      label: 'Bengali',
    },
    {
      value: 'be',
      label: 'Belarusian',
    },
    {
      value: 'bg',
      label: 'Bulgarian',
    },
    {
      value: 'ca',
      label: 'Catalan',
    },
    {
      value: 'zh-CN',
      label: 'Chinese Simplified',
    },
    {
      value: 'zh-TW',
      label: 'Chinese Traditional',
    },
    {
      value: 'hr',
      label: 'Croatian',
    },
    {
      value: 'cs',
      label: 'Czech',
    },
    {
      value: 'da',
      label: 'Danish',
    },
    {
      value: 'nl',
      label: 'Dutch',
    },
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'eo',
      label: 'Esperanto',
    },
    {
      value: 'et',
      label: 'Estonian',
    },
    {
      value: 'tl',
      label: 'Filipino',
    },
    {
      value: 'fi',
      label: 'Finnish',
    },
    {
      value: 'fr',
      label: 'French',
    },
    {
      value: 'gl',
      label: 'Galician',
    },
    {
      value: 'ka',
      label: 'Georgian',
    },
    {
      value: 'de',
      label: 'German',
    },
    {
      value: 'el',
      label: 'Greek',
    },
    {
      value: 'gu',
      label: 'Gujarati',
    },
    {
      value: 'ht',
      label: 'Haitian Creole',
    },
    {
      value: 'iw',
      label: 'Hebrew',
    },
    {
      value: 'hi',
      label: 'Hindi',
    },
    {
      value: 'hu',
      label: 'Hungarian',
    },
    {
      value: 'is',
      label: 'Icelandic',
    },
    {
      value: 'id',
      label: 'Indonesian',
    },
    {
      value: 'ga',
      label: 'Irish',
    },
    {
      value: 'it',
      label: 'Italian',
    },
    {
      value: 'ja',
      label: 'Japanese',
    },
    {
      value: 'kn',
      label: 'Kannada',
    },
    {
      value: 'ko',
      label: 'Korean',
    },
    {
      value: 'la',
      label: 'Latin',
    },
    {
      value: 'lv',
      label: 'Latvian',
    },
    {
      value: 'lt',
      label: 'Lithuanian',
    },
    {
      value: 'mk',
      label: 'Macedonian',
    },
    {
      value: 'ms',
      label: 'Malay',
    },
    {
      value: 'mt',
      label: 'Maltese',
    },
    {
      value: 'no',
      label: 'Norwegian',
    },
    {
      value: 'fa',
      label: 'Persian',
    },
    {
      value: 'pl',
      label: 'Polish',
    },
    {
      value: 'pt',
      label: 'Portuguese',
    },
    {
      value: 'ro',
      label: 'Romanian',
    },
    {
      value: 'ru',
      label: 'Russian',
    },
    {
      value: 'sr',
      label: 'Serbian',
    },
    {
      value: 'sk',
      label: 'Slovak',
    },
    {
      value: 'sl',
      label: 'Slovenian',
    },
    {
      value: 'es',
      label: 'Spanish',
    },
    {
      value: 'sw',
      label: 'Swahili',
    },
    {
      value: 'sv',
      label: 'Swedish',
    },
    {
      value: 'ta',
      label: 'Tamil',
    },
    {
      value: 'te',
      label: 'Telugu',
    },
    {
      value: 'th',
      label: 'Thai',
    },
    {
      value: 'tr',
      label: 'Turkish',
    },
    {
      value: 'uk',
      label: 'Ukrainian',
    },
    {
      value: 'ur',
      label: 'Urdu',
    },
    {
      value: 'vi',
      label: 'Vietnamese',
    },
    {
      value: 'cy',
      label: 'Welsh',
    },
    {
      value: 'yi',
      label: 'Yiddish',
    },
  ];
}

interface lang {
  value: string;
  label: string;
}
