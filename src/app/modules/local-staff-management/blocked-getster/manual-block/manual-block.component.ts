import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/shared/services/api/api.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import * as XLSX from 'xlsx';
import { GetsterProfileCardComponent } from '../../getster-profile-card/getster-profile-card.component';
import { NewGetsterComponent } from '../../new-getster/new-getster.component';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
const { DateTime } = require('luxon');

@Component({
  selector: 'app-manual-block',
  templateUrl: './manual-block.component.html',
  styleUrls: ['./manual-block.component.scss'],
})
export class ManualBlockComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio: MatRadioButton;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  @ViewChild('paginatorElement', { read: ElementRef })
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  getsterId: number;
  radioClick = false;
  firstName: any;
  lastName: any;
  regMobileNumber: any;
  additionalData: any;
  additionalData1: any = [];
  id: any;
  gesterCategory: any;
  rowValue: any[] = [];
  imageURL: any = 'https://ceph1.getwow.cloud/getwow-education/';
  getProfile: any;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private _snackBar: SnackBarService,
    private _cdf: ChangeDetectorRef,
    private dialog: MatDialog,
    private _dataSharingService:DataSharingService,
    private spinner:CustomSpinnerService
  ) {}
  @Input() unblock_table_ref!: NewGetsterComponent;
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  cam_id:any;
  ngOnInit() {
    this.cam_id = sessionStorage.getItem('camp_id');
    this._headerTitle.setTitle('GETster Profile / Login / E Identity');
    this.getManualBlockGetster();
    this._dataSharingService.updateAuditTrailData('audit_trail');
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  getManualBlockGetster() {
    // this.spinner.open();
    this._apiService
      .getManualBlockGetster(this.currentPage,this.pageSize,this.cam_id)
      .subscribe({
        next: (res) => {
          // console.log(res);

          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = res.data[0].row_count;
          });
          this.dataSource.data = res.data;
          // this.spinner.close();
        },
        error: () => {
          // this.spinner.close();

          this._snackBar.success('Data Not Found');
        },
      });
  }
  getGesterId(res: any) {
    this.getsterId = res.blocked_getster_id;
    // console.log('log', res);

    this.getProfile = this.imageURL + res.blacked_user_profile;
    this.getGetsterProfile();
    this.firstName = res.first_name;
    this.firstName = res.last_name;
  }

  openGetsterProfile(getster_id: number) {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: '320px',
      // minWidth: '400px',
      // minHeight: 'calc(100vh - 500px)',
      minHeight: 'auto',
      // maxHeight: '500px',
      // width: '320px',
      data: {
        getster_id,
      },
    };
    const dialogRef = this.dialog.open(GetsterProfileCardComponent, config);
  }

  getGetsterProfile() {
    this._apiService.getGetsterProfile(this.getsterId).subscribe((data) => {
      this.firstName = data.data[0].first_name;
      this.lastName = data.data[0].last_name;
      this.regMobileNumber = data.data[0].registered_mobile_number;
      this.additionalData1 = [];
      this.gesterCategory = data.data[0].getster_category_name;

      let getAdditionalData = data.data[0].additional_getster_data_field_values;
      for (const key in getAdditionalData) {
        // console.log(key);
        if (Object.prototype.hasOwnProperty.call(getAdditionalData, key)) {
          const element = getAdditionalData[key];
          //  console.log(element);
          this.additionalData1.push(element);
        }
      }

      this.radioClick = true;
      this._cdf.detectChanges();
    });
  }

  updateGetsterRemoveApprovalRegistrationStatus() {
    this.radioClick = false;

    this._apiService
      .updateGetsterRemoveApprovalRegistrationStatus(this.getsterId)
      .subscribe((data) => {
        this.unblock_table_ref.getNewGetster();
        this._snackBar.success('Data Updated Successfully');
        // this._snackBar.success(
        //   this.firstName + ' ' + this.lastName + ' ' + 'Un Blocked'
        // );
        this.getManualBlockGetster();
      });
  }
  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['name', 'user_id', 'getster_category'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  paginatorHtmlElement!: ElementRef;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(this.selection.selected);
    this.rowValue = this.selection.selected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  ngDoCheck(): void {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }

  table_json_data: any;

  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getManualBlockGetster();
  }
  showPageSizeOptions: boolean = true;

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  onPrint() {
    window.print();
  }

  onRowClicked(row: any) {
    // console.log(row);
  }

  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);

    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '.mat-radio-button {' +
        'visibility: hidden;' +
        '}' +
        '</style>' +
        `</head>

        <body onload="window.print()">
          <style>
          .mat-column-select{display:none}
          </style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
          <img style="width:100px;height:100px" src="assets/icons/getstertech/icon-72x72.png" alt="app-logo" />
          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline; margin-left: auto; margin-right: auto;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;">Manual Blocked GETSTERs</span>
            <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${
          this.paginator.length
        } ) ${
          this.filterValue.length >= 1
            ? `(Filtered by -" ${this.filterValue} ")`
            : ''
        } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
          </div>
          </div>

          ` +
        printContents +
        '</body>' +
        `
         <div>
          <footer style="position: fixed; bottom: 0; width: 100%;">
          <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Jr Plaza Fourth Floor, Tank Street, </span>
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Hosur, Tamil Nadu 635109</span>
          </div>
          </footer>
         </div>
        ` +
        '</html>'
    );
    popupWin.document.close();
  }
  // ngOnDestroy() {
  //   this._dataSharingService.updateAuditTrailData(undefined);
  //   this.spinner.close();
  // }
  //! -------------------------------  End  --------------------------------!//
}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}
