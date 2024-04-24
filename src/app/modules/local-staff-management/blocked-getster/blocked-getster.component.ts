import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-blocked-getster',
  templateUrl: './blocked-getster.component.html',
  styleUrls: ['./blocked-getster.component.scss'],
})
export class BlockedGetsterComponent implements OnInit {
  constructor(
    private _dataSharingService: DataSharingService,
    private _headerTitle: HeaderTitleService
  ) {}

  ngOnInit(): void {
    // this._headerTitle.setTitle('Blocked GETster');
    this._dataSharingService.updateAuditTrailData('audit_trail');
  }

  tabIndex: number = 0;

  tabChanged(_data: any) {
    this.tabIndex = _data.index;
  }
}
