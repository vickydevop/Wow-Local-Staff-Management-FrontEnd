import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-getster-profile',
  templateUrl: './getster-profile.component.html',
  styleUrls: ['./getster-profile.component.scss'],
})
export class GetsterProfileComponent implements OnInit {
 mobileQuery: MediaQueryList;

  constructor(
    private _headerTitle: HeaderTitleService,
    private _dataSharingService: DataSharingService,
    private _cdf: ChangeDetectorRef,
    private media: MediaMatcher,
    private spinner:CustomSpinnerService
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 800px)');

  }
  camp_site_name:any;
  ngOnInit(): void {
    setTimeout(() => {
      this._headerTitle.setTitle('Recruit/Approve New Staff');
    }, 10);
    this._dataSharingService.updateAuditTrailData('audit_trail');
    // throw new Error('Method not implemented.');
    const camp_name = sessionStorage.getItem('camp_name');
    // const camp_id = sessionStorage.getItem('camp_id');
    this.camp_site_name = camp_name;
    // console.log(camp_name,'campname');
    // console.log(camp_id,'camp_id');
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // //Add 'implements DoCheck' to the class.
    // this._dataSharingService.for_check_campsite_name_data .subscribe ((res) => {
    //   this.camp_site_name = res;
    //   // console.log(this.camp_site_name,'ooop');
    // })
  }
  tabIndex: number = 0;
  getsterprofiletable1:any;
  getsterapprovetable:any;
  unblocktable:any;
  blockTable:any;
  unblockTable:any;
  approveTable:any;
  tabChanged(_data: any) {
    this.tabIndex = _data.index;
  }

  ngOnDestroy() {
    this._dataSharingService.updateAuditTrailData(undefined);
    this.spinner.close();
  }
}
