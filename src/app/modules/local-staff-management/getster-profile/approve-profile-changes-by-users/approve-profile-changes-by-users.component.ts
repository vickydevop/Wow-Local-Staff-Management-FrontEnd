import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GetsterProfileLoginComponent } from '../getster-profile-login/getster-profile-login.component';
import { ApproveGetsterService } from 'src/app/shared/services/approve-getster/approve-getster.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetsterProfileCardComponent } from '../../getster-profile-card/getster-profile-card.component';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
const { DateTime } = require('luxon');

@Component({
  selector: 'app-approve-profile-changes-by-users',
  templateUrl: './approve-profile-changes-by-users.component.html',
  styleUrls: ['./approve-profile-changes-by-users.component.scss'],
})
export class ApproveProfileChangesByUsersComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @Input() getsterprofile_table_ref1: GetsterProfileLoginComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  rowValue: any[] = [];
  firstName: any;
  lastName: any;
  arrayForm: FormGroup;
  categoriesIds: any;
  disabledBtn: boolean = true;
  disabledBtn1: boolean = true;
  id: any;
  cardUrl: any;
  rowvalues: any;
  datavalue: any;
  getster_category_id: any;
  arr: any = [];
  selected_category_val: any[] = [];
  categoryid: any;
  getster_photo = false;
  app_icon = false;
  barcode = false;
  dob = false;
  category = false;
  institution: false;
  mobile1 = false;
  mobile2 = false;
  bldg = false;
  email = false;
  add = false;
  country_code_to_number: any;
  bgclr: any;
  textclr1: any;
  textclr2: any;
  textclr3: any;
  fontclr: any;
  displaySection: boolean = false;
  getGetsterCategoryWiseAdditionalFields: any[] = [];
  individualGetster: any;
  additionalInfoList: any;
  selected_getster_id: any = null;
  max_date = new Date();
  subtractDays(days: number, fromDate: Date = new Date()): Date {
    return new Date(fromDate.getTime() - days * 24 * 60 * 60 * 1000);
  }
  getster = this.formbuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    pass: ['', Validators.required],
    // dob1:['',Validators.required],
    aditional_field_user: ['', Validators.required],
    // number:['',Validators.required],
  });
  regmob = this.formbuilder.group({
    phone: ['', Validators.required],
  });
  table_json_data: any;
  imageURL: any = 'https://ceph1.getwow.cloud/getwow-education/';
  getProfile: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private _cdf: ChangeDetectorRef,
    private _snakbar: SnackBarService,
    private _approveGetsterService: ApproveGetsterService,
    private dialog: MatDialog,
    private spinner: CustomSpinnerService
  ) {
    this.arrayForm = this.formbuilder.group({
      // dynamicForm_1: this.formbuilder.array([]),
      // dynamicForm_2: this.formbuilder.array([]),
      // dynamicForm_3: this.formbuilder.array([]),
    });
  }

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this.regmob.disable();
    this.loadData();
    this.getster.disable();
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  loadData() {
    // this.spinner.open();
    this.api.approveprofilechangesByUsers_table().subscribe((res) => {
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = res.data[0]?.row_count;
      });
      this.dataSource.data = res.data;
      if (res.data.length == 0) {
        this._snakbar.success('Data Not Found');
      }
    });
  }
  datapass(element: any, getster_id: any) {
    this.displaySection = true;
    this.disabledBtn = false;
    this.disabledBtn1 = false;
    this.id = getster_id;
    this.rowvalues = element;
    this.datavalue = [element];
    this.firstName = this.datavalue[0].name;
    this.lastName = this.datavalue[0].lastName;
    this.getProfile =
      this.imageURL +
      this.datavalue[0].previous_login_image_of_the_day_ceph_object_id;
    this.getster.controls['name'].setValue(this.rowvalues.name);
    this.getster.controls['lastName'].setValue(this.rowvalues.lastName);
    this.getster.controls['dob'].setValue(this.rowvalues.dob);
    this.getster.controls['gender'].setValue(this.rowvalues.gender);
    this.regmob.controls['phone'].setValue(this.rowvalues.mobile);
    this.getster.controls['phone'].setValue(this.rowvalues.mobile);
    this.getster.controls['aditional_field_user'].setValue(
      this.rowvalues.aditional_field_user
    );
    this.country_code_to_number = this.rowvalues.coutry_code;
    this.api
      .getsterProfileLoginResetTable1CategoryId(this.id)
      .subscribe((res) => {
        this.categoryid = res.data[0].getster_category_id;
        this.cardUrl = res.data[0].card_url;

        // for(let i=0;i<res.data.length; i++){
        //    this.getster_category_id = res.data[i].getster_category_id;
        //    this.arr.push(this.getster_category_id);
        // }
        this.api.getsterProfileUrl(this.id).subscribe((res) => {
          this.cardUrl = res.data;
        });
        this.api
          .getCardBooleanValues(res.data[0].getster_category_id)
          .subscribe((res) => {
            // console.log(this.categoryid);
            (this.getster_photo = res.data[0].getster_photo),
              (this.app_icon = res.data[0].app_icon),
              (this.barcode = res.data[0].barcode),
              (this.dob = res.data[0].dob),
              (this.category = res.data[0].category),
              (this.institution = res.data[0].institution),
              (this.mobile1 = res.data[0].mobile1),
              (this.mobile2 = res.data[0].mobile2),
              (this.bldg = res.data[0].bldg),
              (this.email = res.data[0].email),
              (this.add = res.data[0].add),
              // (this.bgclr = res.data[0].bg_color),
              // (this.textclr1 = res.data[0].text1),
              // (this.textclr2 = res.data[0].text2),
              // (this.textclr3 = res.data[0].text3),
              // (this.fontclr = res.data[0].fontclr);
              this._cdf.detectChanges();
          });
      });

    setTimeout(() => {
      this.api
        .getster_profile_login_reset_table1_category_ids(getster_id)
        .subscribe((res) => {
          // console.log('res', res, res.data.length);

          this.categoriesIds = res.data;

          // for (let index = 0; index < this.categoriesIds.length; index++) {
          //   let arrayFormField = this.categoriesIds[index].getster_category_id;
          //   this.arrayForm.addControl(arrayFormField, this.formbuilder.array([]));
          // }

          this.onGetGetsterCategoryWiseAdditionalFields();
          this._cdf.detectChanges();
        });
    }, 5);
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

  dynamicFormsField(control: any): FormArray {
    return this.arrayForm.get(control) as FormArray;
  }
  onGetGetsterCategoryWiseAdditionalFields() {
    setTimeout(() => {
      this.api.GetManageGetsterCategoryWiseAdditionalFields(this.id).subscribe({
        next: (next) => {
          this.getGetsterCategoryWiseAdditionalFields = [];

          for (let index = 0; index < this.categoriesIds.length; index++) {
            this.arrayForm.removeControl(
              this.categoriesIds[index].getster_category_id
            );
          }
          for (let index = 0; index < this.categoriesIds.length; index++) {
            let arrayFormField = this.categoriesIds[index].getster_category_id;
            this.arrayForm.addControl(
              arrayFormField,
              this.formbuilder.array([])
            );
          }

          if (this.categoriesIds) {
            for (let i = 0; i < this.categoriesIds.length; i++) {
              const element = next.data[i];
              let fieldName = this.categoriesIds[i].getster_category_id;
              let dynamicArray = this.arrayForm.get(fieldName) as FormArray;
              //  console.log(element.additional_getster_data_field_name.length);

              for (
                let j = 0;
                j < element.additional_getster_data_field_name.length;
                j++
              ) {
                const field = element.additional_getster_data_field_name[j];
                const header = this.formbuilder.group({
                  headerKey: [field.headerKey, Validators.required],
                  headerLabel: [field.headerKey, Validators.required],
                  headerType: [field.headerType, Validators.required],
                  headerValue: [field.headerValue],
                  isMandatory: [field.isMandatory],
                });
                dynamicArray.push(header);
              }
            }
            this.getGetsterCategoryWiseAdditionalFields = next.data;
            // setTimeout(() => {

            // }, 10);
          }

          this.arrayForm.disable();
        },
      });
    }, 5);
  }

  denychanges() {
    this.api.approveprofilechangesByUsers_table_delete(this.id).subscribe({
      next: () => {
        // console.log('deleted');
        this.loadData();
        this.disabledBtn = true;
        this.disabledBtn1 = true;
        this._snakbar.success('Data Updated Successfully');
        // this._snakbar.success(
        //   this.firstName + ' ' + this.lastName + ' ' + 'Removed Changes'
        // );
        // this.getsterprofile_table_ref1.loadData();
      },
    });
    this.displaySection = false;
  }

  approvechanges() {
    let data: any = {
      name: this.getster.controls['name'].value,
      lastName: this.getster.controls['lastName'].value,
      dob: new Date(this.getster.controls['dob'].value)
        .toISOString()
        .toString()
        .slice(0, 19)
        .replace(/T/g, ' '),
      gender: this.getster.controls['gender'].value,
      mobile: this.getster.controls['phone'].value,
      aditionaldata: this.getster.controls['aditional_field_user'].value,
      additionalDataFields: JSON.stringify(this.arrayForm.value),
    };
    this.api
      .approveprofilechangesByUsers_table_update(this.id, data)
      .subscribe({
        next: () => {
          setTimeout(() => {
            this._approveGetsterService.getExistingGetster();
          }, 5);
          this._snakbar.success('Data Updated Successfully');

          this.loadData();
          this.disabledBtn = true;
          this.disabledBtn1 = true;
          // this.getsterprofile_table_ref1.loadData();
        },
        error: (res) => {
          console.log(res);
          this._snakbar.success('While Error Updating!');
        },
      });

    this.displaySection = false;
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

  displayedColumns: string[] = ['getster_id', 'name', 'getster_category'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

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

  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
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
      '.mat-radio-button {' +
      'visibility: hidden;' +
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
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;">GETster PROFILE CHANGES THAT ARE PENDING FOR APPROVAL
            </span>
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

  //! -------------------------------  End  --------------------------------!/
}

export interface PeriodicElement {
  name: string;
  user_id: number;
  user_category_name: string;
}
