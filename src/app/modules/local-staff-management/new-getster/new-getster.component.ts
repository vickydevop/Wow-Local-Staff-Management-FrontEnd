import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import * as XLSX from 'xlsx';
import { GetsterProfileCardComponent } from '../getster-profile-card/getster-profile-card.component';
import { MatSort } from '@angular/material/sort';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { ExistingGetsterComponent } from '../existing-getster/existing-getster.component';
import { AutoBlockComponent } from '../blocked-getster/auto-block/auto-block.component';
import { GetsterProfileLoginComponent } from '../getster-profile/getster-profile-login/getster-profile-login.component';
import { ManualBlockComponent } from '../blocked-getster/manual-block/manual-block.component';
const { DateTime } = require('luxon');
@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(time: string): string {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }
}
@Component({
  selector: 'app-new-getster',
  templateUrl: './new-getster.component.html',
  styleUrls: ['./new-getster.component.scss'],
})
export class NewGetsterComponent implements OnInit, AfterViewInit,OnDestroy {
  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio: MatRadioButton;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
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
  additionalData1: any;
  profileUrl: any;
  id: any;
  gesterCategory: any;
  imageURL: any = 'https://ceph1.getwow.cloud/getwow-education/';
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private _snackBar: SnackBarService,
    private _dataSharingService: DataSharingService,
    private _cdf: ChangeDetectorRef,
    private spinner: CustomSpinnerService,
    private dialog: MatDialog
  ) {}
  @Input() approve_table_ref: ExistingGetsterComponent;
  @Input() block_table_ref: ManualBlockComponent;
  @Input() getster_table_ref: GetsterProfileLoginComponent;
  @Input() auto_block_table1_ref: AutoBlockComponent;
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  camp_id:any;
  ngOnInit() {
    this._headerTitle.setTitle('Approve New GETsters');
    this._dataSharingService.updateAuditTrailData('audit_trail');
    this.camp_id = sessionStorage.getItem('camp_id');
    // console.log(this.camp_id,'cam_id');
    this.getNewGetster();
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  getNewGetster() {
    // this.spinner.open();
    // console.log(this.camp_id,'cam_id');
    this._apiService.getNewGetster(this.currentPage,this.pageSize,this.camp_id).subscribe({
      next: (res) => {
        // console.log(res);
        // if(res) {

        // }
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          // this.paginator.length = res.data[0].row_count;
          this.paginator.length = res.data[0]?.row_count;
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
  openGetsterProfile(getster_id: number) {
    let config: MatDialogConfig = {
      disableClose: true,

      minWidth: '320px',
      // minHeight: 'calc(100vh - 500px)',
      minHeight: 'auto',
      // maxHeight: '500px',

      data: {
        getster_id,
      },
    };
    const dialogRef = this.dialog.open(GetsterProfileCardComponent, config);
  }

  getProfile: any;
  getGesterId(res: any) {
    this.getsterId = res.getster_id;
    this.getProfile =
      this.imageURL + res.previous_login_image_of_the_day_ceph_object_id;
    this.getGetsterProfile();
    this.firstName = res.first_name;
    this.firstName = res.last_name;
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

  UpdateGetsterApprovalRegistrationStatus() {
    this.radioClick = false;
    this._apiService
      .updateGetsterApprovalRegistrationStatus(this.getsterId)
      .subscribe((data) => {
        this.approve_table_ref.getExistingGetster();
        this.getster_table_ref.loadData();
        this._snackBar.success('Data Update Successfully');
        // this._snackBar.success(
        //   this.firstName +
        //     ' ' +
        //     this.lastName +
        //     ' ' +
        //     'Removed To Approval Registration'
        // );
        this.getNewGetster();
      });
  }
  updateGetsterApprovalBlockStatus() {
    this.radioClick = false;
    this._apiService
      .updateGetsterApprovalStatus(this.getsterId)
      .subscribe((data) => {
        this.block_table_ref.getManualBlockGetster();
        this.auto_block_table1_ref.getAutoBlockedGetster();
        this._snackBar.success('Data Updated Successfully');
        // this._snackBar.error(
        //   this.firstName + ' ' + this.lastName + ' ' + 'Blocked'
        // );
        this.getNewGetster();
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

  displayedColumns: string[] = ['user_id', 'name', 'getster_category'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  rowValue: any[] = [];

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

  // ngAfterViewInit() {
  //   this.getNewGetster();
  //   setTimeout(() => {
  //     this.dataSource.paginator = this.paginator;
  //     this.translateMatPaginator(this.paginator);
  //   }, 1000);
  // }
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.translateMatPaginator(this.paginator);
  }

  ngDoCheck(): void {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }

  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getNewGetster();
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
        '.mat-table {' +
        'width: 75%;' +
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
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;">Approve GETSTERs</span>
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
          <div style=" display: flex;flex-direction: column; width:100%; align-items:center; margin-left: auto; margin-right: auto;">
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

  //! -------------------------------  End  --------------------------------!//
  ngOnDestroy() {
    this._dataSharingService.updateAuditTrailData(undefined);
    this.spinner.close();
  }
}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}
