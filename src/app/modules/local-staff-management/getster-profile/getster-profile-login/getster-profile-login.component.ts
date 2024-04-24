import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
/*@ts-ignore*/
import {
  Component,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatTable, MatTableDataSource } from '@angular/material/table';

import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../shared/services/api/api.service';
// import { Loader } from '@googlemaps/js-api-loader';
import { catchError, map, of } from 'rxjs';
import 'leaflet-control-geocoder';
import { DataSharingService } from '../../../../shared/services/data-sharing/data-sharing.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeData } from 'src/app/models/tree.interface';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { AddEditLocationComponent } from '../add-edit-location/add-edit-location.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import * as L from 'leaflet';
import { ApproveGetsterService } from 'src/app/shared/services/approve-getster/approve-getster.service';
import { GetsterProfileCardComponent } from '../../getster-profile-card/getster-profile-card.component';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { ApproveProfileChangesByUsersComponent } from '../approve-profile-changes-by-users/approve-profile-changes-by-users.component';
const { DateTime } = require('luxon');

export interface Element {
  selected: boolean;
  selectable?: boolean;
}
interface BloodGroup {
  value: string;
  viewValue: string;
}
Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-getster-profile-login',
  templateUrl: './getster-profile-login.component.html',
  styleUrls: ['./getster-profile-login.component.scss'],
})
export class GetsterProfileLoginComponent implements OnInit, AfterViewInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild(NgxMatIntlTelInputComponent)
  phoneInput!: NgxMatIntlTelInputComponent;
  @ViewChild('reflen') input: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('existingGetster', { static: false }) pdfTable!: ElementRef;
  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;
  @Input() getsterapprove_table_ref1: ApproveProfileChangesByUsersComponent;

  //* -----------------------  Variable Declaration  -----------------------*//
  getster_CampDetails: any;
  let_data: any;
  lng_data: any;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 10,
    minZoom: 2,
    maxZoom: 18,
    center: { lat: 12.7277888, lng: 77.8238802 },
  };
  address: any;
  initialMarkers: any[] = [];
  changeGetsterMarker: any;
  categoriesIds: any;
  submitBtnStatus: boolean = false;
  treeCheckbox: boolean = true;
  phone: any = true;
  item: any[] = ['Male', 'Female'];
  id: any;
  rowValue: any[] = [];
  rowvalues: any;
  datavalue: any;
  disabledBtn: boolean = true;
  disabledBtn1: boolean = true;
  disabledBtn2: boolean = true;
  disabledBtn3: boolean = true;
  disabledBtn4: boolean = true;
  getster_category_id: any;
  arr: any = [];
  selected_category_val: any[] = [];
  getster_photo = false;
  app_icon = false;
  barcode = false;
  dob = false;
  category = false;
  institution!: false;
  mobile1 = false;
  mobile2 = false;
  bldg = false;
  email = false;
  add = false;
  bgclr: any;
  textclr1: any;
  textclr2: any;
  textclr3: any;
  fontclr: any;
  country_code_to_number: any;
  firstname: any;
  lastname: any;
  getster_id: any;
  additionalData1: any;
  keys: any;
  getsterMarker: any;
  locationAddress: any;
  displaySection: boolean = false;
  hide = true;
  categoryid: any;
  getGetsterCategoryWiseAdditionalFields: any[] = [];
  arrayForm: FormGroup;
  ActionBtn: string = 'Edit';
  element: any;
  table_json_data: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  showPageSizeOptions: boolean = true;
  getster_category_id_update: any;
  visible: boolean = false;
  cardEdit: boolean = true;
  saveButton: boolean = true;
  selectedValue: string;
  mapChange: boolean = true;
  email_id: any;
  getsterSelectedCategoryIds: any = [];
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  // cardAddress: any;
  max_date = new Date();
  subtractDays(days: number, fromDate: Date = new Date()): Date {
    return new Date(fromDate.getTime() - days * 24 * 60 * 60 * 1000);
  }
  imageURL: any = 'https://ceph1.getwow.cloud/getwow-education/';
  getProfile: any;
  bloodGroups: BloodGroup[] = [
    { value: 'O positive', viewValue: 'O positive' },
    { value: 'O negative', viewValue: 'O negative' },
    { value: 'A positive', viewValue: 'A positive' },
    { value: 'A negative', viewValue: 'A negative' },
    { value: 'B positive', viewValue: 'B positive' },
    { value: 'B negative', viewValue: 'B negative' },
    { value: 'AB positive', viewValue: 'AB positive' },
    { value: 'AB negative', viewValue: 'AB negative' },
  ];
  regMobileNo: any;
  cardUrl: any;
  getster = this.formbuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    // dob1:['',Validators.required],
    aditional_field_user: ['', Validators.required],
    // number:['',Validators.required],
    cardAddress: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    emailId: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
      ],
    ],
    emMobileMo: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
  });

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService,
    private api: ApiService,
    private formbuilder: FormBuilder,
    private _cdf: ChangeDetectorRef,
    private _snackbar: SnackBarService,
    public dialog: MatDialog,
    public _approveGetsterService: ApproveGetsterService,
    private spinner: CustomSpinnerService
  ) {
    this.arrayForm = this.formbuilder.group({
      // dynamicForm_1: this.formbuilder.array([]),
      // dynamicForm_2: this.formbuilder.array([]),
      // dynamicForm_3: this.formbuilder.array([]),
    });
  }

  // ngAfterViewInit(): void {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  cam_id:any;
  ngOnInit(): void {
    this.cam_id = sessionStorage.getItem('camp_id');
    this._headerTitle.setTitle('Access GETster Profile/Login Reset');
    // this.getster.valueChanges.subscribe( e => this.unloadHandler($event:any) = true );
    this.loadData();
    this.getster.disable();
    this.getpass.disable();
    this.regmob.disable();
    // this.getsterCampDetails();
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    // this.loadData1();

    this._approveGetsterService.clickMe.subscribe(() => {
      this.loadData();
    });
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  getAddress(lat: number, lng: number) {
    const geocoder = (Leaflet.Control as any).Geocoder.nominatim();
    return new Promise((resolve, reject) => {
      geocoder.reverse({ lat, lng }, this.map.getZoom(), (results: any) =>
        results.length ? resolve(results[0].name) : reject(null)
      );
    });
  }
  loadData() {
    // this.spinner.open();
    this.api
      .getsterProfileLoginResetTable1(this.currentPage,this.pageSize,this.cam_id)
      .subscribe((res) => {
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.data[0]?.row_count;
        });
        this.dataSource.data = res.data;
        if (res.data.length == 0) {
          this._snackbar.success('Data Not Found');
        }
      });
  }
  getsterAdditionlfields() {
    this.api
      .getsterProfileLoginResetTable1CategoryId(this.id)
      .subscribe((res) => {
        this.categoriesIds = res.data;

        // this.arrayForm =
        // for (let index = 0; index < this.categoriesIds.length; index++) {
        //   let arrayFormField = this.categoriesIds[index].getster_category_id;
        //   this.arrayForm.addControl(arrayFormField, this.formbuilder.array([]));
        // }

        this.onGetGetsterCategoryWiseAdditionalFields();
      });
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
  // radio button
  datapass(element: any, getster_id: any) {
    // console.log('ds', element);

    this.checklistSelection.clear();
    this.mapChange = true;
    this.getster.reset();
    this.getster.disable();
    this.disabledBtn1 = true;
    this.id = getster_id;
    this.rowvalues = element;
    this.email_id = this.rowvalues.ademail;
    this.datavalue = [element];
    //  console.log(this.id);
    // console.log('row', this.rowvalues);
    // this.locationAddress = this.datavalue[0].adlocationadd;
    this.getster_id = this.datavalue[0].getster_id;
    this.getProfile =
      this.imageURL +
      this.datavalue[0].previous_login_image_of_the_day_ceph_object_id;
    this.firstname = this.datavalue[0].name;
    this.lastname = this.datavalue[0].lastName;
    // this.cardAddress = this.datavalue[0].adlocationadd;
    this.locationAddress = this.datavalue[0].adlocationadd;
    let Country_Code: string = new String(
      this.datavalue[0].coutry_code
    ).toUpperCase();
    // this.country_code_to_number = country.getAll()[`${Country_Code}`].phone;
    // console.log( country.getAll()[`${Country_Code}`].phone);
    this.country_code_to_number = this.rowvalues.coutry_code;
    this.arr = [];
    // this.selected_category_val = [];
    //category id

    this.api
      .getsterProfileLoginResetTable1CategoryId(this.id)
      .subscribe((res) => {
        this.categoryid = res.data[0].getster_category_id;
        this.cardUrl = res.data[0].card_url;

        // console.log('lengtg', res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.getster_category_id = res.data[i].getster_category_id;
          this.arr.push(res.data[i].getster_category_id);
        }

        this.api.getsterprofiletreeview().subscribe((res) => {
          // console.log('lodss', res);

          this.nestedDataSource.data = res.data;
          this.nestedTreeControl.dataNodes = res.data;
          let a: any[] = [];
          a.push(res.data);
          while (a.length > 0) {
            let b: any[] = [];
            for (let i = 0; i < a.length; i++) {
              // console.log(a[i][i]);
              // console.log(a[0]);
              for (let j = 0; j < a[i].length; j++) {
                // console.log(a[i][j].getster_category_id);
                for (let k = 0; k < this.arr.length; k++) {
                  // console.log(this.arr);
                  if (a[i][j].getster_category_id == this.arr[k]) {
                    this.checklistSelection.select(a[i][j]);
                    this.nestedTreeControl.expandAll();
                    // this.selected_category_val
                  }
                }
                b.push(a[i][j].children);
              }
            }
            a = b;
          }

          this.nestedTreeControl.expandAll();
        });

        this.api.getsterProfileUrl(this.id).subscribe((res) => {
          this.cardUrl = res.data;
        });

        setTimeout(() => {
          this.api.getCardBooleanValues(this.categoryid).subscribe((res) => {
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
              (this.add = res.data[0].add);
            // (this.bgclr = res.data[0].bg_color),
            // (this.textclr1 = res.data[0].text1),
            // (this.textclr2 = res.data[0].text2),
            // (this.textclr3 = res.data[0].text3),
            // (this.fontclr = res.data[0].fontclr);
          });
          this._cdf.detectChanges();
        }, 5);
      });
    //treeview

    setTimeout(() => {
      if (this.getsterMarker != null) {
        this.map.removeLayer(this.getsterMarker);
      }
      if (this.rowvalues.gps != null) {
        this.let_data = this.rowvalues.gps.x;
        this.lng_data = this.rowvalues.gps.y;
        this.initialMarkers = [];
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.let_data}&lon=${this.lng_data}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.address = data.display_name;
            // this.locationAddress = data.display_name;
            this.map.flyTo([this.let_data, this.lng_data], 15);
            this.getsterMarker = new L.Marker([this.let_data, this.lng_data])
              .addTo(this.map)
              .bindPopup(this.address);
          });

        // this.api
        //   .getMapAddress(this.let_data, this.lng_data)
        //   .subscribe((res: any) => {
        //     this.map.flyTo([this.let_data, this.lng_data], 15);
        //     this.getsterMarker = new L.Marker([this.let_data, this.lng_data])
        //       .addTo(this.map)
        //       .bindPopup(res[0].display_name);
        //   });
      } else {
        this.initialMarkers = [];
        navigator.geolocation.getCurrentPosition((position: any) => {
          this.let_data = position.coords.latitude;
          this.lng_data = position.coords.longitude;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.let_data}&lon=${this.lng_data}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              this.address = data.display_name;
              // this.locationAddress = data.display_name;

              this.map.flyTo([this.let_data, this.lng_data], 15);
              this.getsterMarker = new L.Marker([this.let_data, this.lng_data])
                .addTo(this.map)
                .bindPopup(this.address);
            });
        });
        //   setTimeout(() => {

        //     this.api
        //       .getMapAddress(position.coords.latitude, position.coords.longitude)
        //       .subscribe((res: any) => {
        //         this.map.flyTo(
        //           [position.coords.latitude, position.coords.longitude],
        //           15
        //         );
        //         this.getsterMarker = new L.Marker([
        //           position.coords.latitude,
        //           position.coords.longitude,
        //         ])
        //           .addTo(this.map)
        //           .bindPopup(res[0].display_name);
        //       });
        //   }, 500);
        // });
      }
      this._cdf.detectChanges();
    }, 5);

    //card design

    this.getster.controls['name'].setValue(this.rowvalues.name);
    this.getster.controls['lastName'].setValue(this.rowvalues.lastName);
    this.getster.controls['dob'].setValue(this.rowvalues.dob);
    this.getster.controls['gender'].setValue(this.rowvalues.gender);
    this.getster.controls['cardAddress'].setValue(this.rowvalues.adlocationadd);
    this.getster.controls['bloodGroup'].setValue(this.rowvalues.bldgrup);
    this.getster.controls['emMobileMo'].setValue(this.rowvalues.emgcontact);
    this.getster.controls['emailId'].setValue(this.rowvalues.ademail);
    this.regmob.controls['phone'].setValue(this.rowvalues.mobile);
    this.getpass.controls['pass'].setValue(this.rowvalues.pass);

    // this.getster.controls["dob1"].setValue(this.rowvalues.additional_field[0].dob1);
    this.getster.controls['aditional_field_user'].setValue(
      this.rowvalues.aditional_field_user
    );

    // addtinal data
    this.onGetGetsterCategoryWiseAdditionalFields();
    // this.disabledBtn1 = true;
    this.disabledBtn = false;
    this.displaySection = true;
    this.visible = false;
    this.treeCheckbox = true;

    // this.addCategoryAdditionalFields(
    //   this.element,
    //   this.checklistSelection.selected
    // );

    // this.api.GetGetsterCategoryWiseAdditionalFields(this.id).subscribe({
    //   next: (next) => {
    //     this.getGetsterCategoryWiseAdditionalFields = [];

    //     for (let index = 0; index < this.categoriesIds.length; index++) {
    //       this.arrayForm.removeControl(
    //         this.categoriesIds[index].getster_category_id
    //       );
    //     }
    //     for (let index = 0; index < this.categoriesIds.length; index++) {
    //       let arrayFormField = this.categoriesIds[index].getster_category_id;
    //       this.arrayForm.addControl(arrayFormField, this.formbuilder.array([]));
    //     }

    //     if (this.categoriesIds) {
    //       console.log(this.categoriesIds);

    //       for (let i = 0; i < this.categoriesIds.length; i++) {
    //         const element = next.data[i];
    //         let fieldName = this.categoriesIds[i].getster_category_id;
    //         let dynamicArray = this.arrayForm.get(fieldName) as FormArray;
    //         // console.log(element.additional_getster_data_field_name.length);

    //         for (
    //           let j = 0;
    //           j < element.additional_getster_data_field_name.length;
    //           j++
    //         ) {
    //           const field = element.additional_getster_data_field_name[j];
    //           const header = this.formbuilder.group({
    //             headerKey: [field.headerKey, Validators.required],
    //             headerLabel: [field.headerKey, Validators.required],
    //             headerType: [field.headerType, Validators.required],
    //             headerValue: [field.headerValue],
    //             isMandatory: [field.isMandatory],
    //           });
    //           dynamicArray.push(header);
    //         }
    //       }
    //       this.getGetsterCategoryWiseAdditionalFields = next.data;
    //       setTimeout(() => {
    //         this.arrayForm.disable();
    //       }, 10);
    //     }

    //     // console.log(this.getGetsterCategoryWiseAdditionalFields);
    //   },
    // });

    // setTimeout(() => {
    //   this.getGetsterCategoryWiseAdditionalFields = [];
    //   let one: any = this.checklistSelection.selected;
    //   let two: any[] = [];
    //   one.map((e: any) => {
    //     e.category_id;
    //     two.push(e.getster_category_id);
    //   });

    //   for (let i = 0; i < two.length; i++) {
    //     this.arrayForm.removeControl(two[i]);
    //   }

    //   for (let index = 0; index < two.length; index++) {
    //     let arrayFormField = two[index];
    //     this.arrayForm.addControl(arrayFormField, this.formbuilder.array([]));
    //   }

    //   this.api.getGetsterCategory(two).subscribe((next) => {
    //     console.log(next.data);

    //     if (two) {
    //       for (let i = 0; i < two.length; i++) {
    //         const element = next.data[i];
    //         let fieldName = two[i];
    //         let dynamicArray = this.arrayForm.get(fieldName) as FormArray;
    //         // console.log(element.additional_getster_data_field_name.length);

    //         for (
    //           let j = 0;
    //           j < element.additional_getster_data_field_name.length;
    //           j++
    //         ) {
    //           const field = element.additional_getster_data_field_name[j];
    //           const header = this.formbuilder.group({
    //             headerKey: [field.headerKey, Validators.required],
    //             headerLabel: [field.headerKey, Validators.required],
    //             headerType: [field.headerType, Validators.required],
    //             headerValue: [field.headerValue],
    //             isMandatory: [field.isMandatory],
    //           });
    //           dynamicArray.push(header);
    //         }
    //       }
    //       this.getGetsterCategoryWiseAdditionalFields = next.data;
    //       this._cdf.detectChanges();
    //     }
    //   });
    // }, 500);
  }

  dynamicFormsField(control: any): FormArray {
    return this.arrayForm.get(control) as FormArray;
  }

  onGetGetsterCategoryWiseAdditionalFields() {
    this.api
      .getster_profile_login_reset_table1_category_ids(this.id)
      .subscribe((res) => {
        this.categoriesIds = res.data;

        // console.log('Lo', this.categoriesIds);

        this.api.GetGetsterCategoryWiseAdditionalFields1(this.id).subscribe({
          next: (next) => {
            this.getGetsterCategoryWiseAdditionalFields = [];
            for (let i = 0; i < this.categoriesIds.length; i++) {
              this.arrayForm.removeControl(
                this.categoriesIds[i].getster_category_id
              );
            }

            for (let index = 0; index < this.categoriesIds.length; index++) {
              let arrayFormField =
                this.categoriesIds[index].getster_category_id;
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
                // console.log(element.additional_getster_data_field_name.length);

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
              this.getsterSelectedCategoryIds = [];
              for (
                let i = 0;
                i < this.getGetsterCategoryWiseAdditionalFields.length;
                i++
              ) {
                this.getsterSelectedCategoryIds.push(
                  this.getGetsterCategoryWiseAdditionalFields[i]
                    .getster_category_id
                );
              }

              // console.log(this.getsterSelectedCategoryIds);

              setTimeout(() => {
                this.arrayForm.disable();
              }, 5);
            }
            this._cdf.detectChanges();
            // console.log(this.getGetsterCategoryWiseAdditionalFields);
          },
        });
      });

    // this.disableInputs();
  }
  temp: any;
  addCategoryAdditionalFields(element: any, isChecked: any) {
    setTimeout(() => {
      this.getGetsterCategoryWiseAdditionalFields = [];
      let one: any = this.checklistSelection.selected;
      let two: any[] = [];
      one.map((e: any) => {
        e.category_id;
        two.push(e.getster_category_id);
      });

      for (let i = 0; i < two.length; i++) {
        this.arrayForm.removeControl(two[i]);
        // if (this.getsterSelectedCategoryIds[i] != two[i]) {
        //   this.arrayForm.removeControl(two[i]);
        // }
      }

      for (let index = 0; index < two.length; index++) {
        let arrayFormField = two[index];
        this.arrayForm.addControl(arrayFormField, this.formbuilder.array([]));
      }

      this.api.getGetsterCategory(two).subscribe((next) => {
        // console.log('efwef', next.data);
        for (let i = 0; i < two.length; i++) {
          const element = next.data[i];
          let fieldName = two[i];
          let dynamicArray = this.arrayForm.get(fieldName) as FormArray;
          // console.log(element.additional_getster_data_field_name.length);

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
            //   dynamicArray.push(header);
            if (this.getsterSelectedCategoryIds[i] != two[i]) {
              dynamicArray.push(header);
            }
          }
          this.getGetsterCategoryWiseAdditionalFields = next.data;
          this._cdf.detectChanges();
        }
      });
    }, 500);
  }

  getster_profile_edit(rowvalues: any) {
    this.disabledBtn1 = false;
    this.getster.enable();
    // this.getpass.enable();
    // this.regmob.enable();
    this.treeCheckbox = false;
    this.arrayForm.enable();
    if (!this.rowvalues) {
      if (this.getster.valid) {
      } else {
        this.update_profile_table1();
        this.changemob();
        this.passchange();
      }
    }

    this.disabledBtn2 = false;
    this.disabledBtn3 = false;
    this.disabledBtn4 = false;
    this.mapChange = false;
  }

  update_profile_table1() {
    this.displaySection = false;
    let data: any = {
      name: this.getster.controls['name'].value,
      lastName: this.getster.controls['lastName'].value,
      aditionaldata: this.input.nativeElement.value,
      dob: new Date(this.getster.controls['dob'].value as string)
        .toISOString()
        .toString()
        .slice(0, 19)
        .replace(/T/g, ' '),
      gender: this.getster.controls['gender'].value,
      address: this.getster.controls['cardAddress'].value,
      blood_group: this.getster.controls['bloodGroup'].value,
      email: this.getster.controls['emailId'].value,
      emMoNo: this.getster.controls['emMobileMo'].value,
      additionalDataFields: JSON.stringify(this.arrayForm.value),
    };

    this.api
      .getster_profile_login_reset_table1_update(
        this.rowvalues.getster_id,
        data
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.api
              .update_treeview_category_id(this.rowvalues.getster_id, {
                category_ids,
              })
              .subscribe((data: any) => {
                this.getster.reset();
                this.getster.disable();
                this.getpass.reset();
                this.getpass.disable();
                this.regmob.reset();
                this.regmob.disable();
                this.disabledBtn = true;
                this.disabledBtn1 = true;
                this.disabledBtn2 = true;
                this.disabledBtn3 = true;
                this.disabledBtn4 = true;
                this.visible = false;
                this.treeCheckbox = true;
                this.loadData();
              });
          }, 5);
          // alert('Updated Successfully !!!');

          // this._cdf.detectChanges();
          this._snackbar.success('Data Updated Successfully');
        },
        error: () => {
          this._snackbar.error('Error While Updating!');
        },
      });

    let category_ids = [
      ...this.checklistSelection.selected.map(
        (e: any) => e.getster_category_id
      ),
    ];
    this.checklistSelection.clear();
    this.mapChange = true;
  }

  changemob() {
    let mob: any = {
      mobile: this.regmob.controls['phone'].value,
    };
    this.api
      .getster_profile_login_reset_table1_update_mobno(
        this.rowvalues.getster_id,
        mob
      )
      .subscribe({
        next: () => {
          // alert('Mobile No updated Successfully !!!');
          this.loadData();
          this.getster.reset();
          this.getpass.reset();
          this.regmob.reset();
          this.disabledBtn = true;
          this.disabledBtn1 = true;
          this.disabledBtn2 = true;
          this.disabledBtn3 = true;
          this.disabledBtn4 = true;
          this._snackbar.success([
            'Registered Mobile Number Updated Successfully !!!',
          ]);
        },
        error: () => {
          // alert('Error While Updating !!!');
          this._snackbar.error([
            'Error while Updating Registered Mobile number!!!',
          ]);
        },
      });
  }

  passchange() {
    let passch: any = {
      password: this.getpass.controls['pass'].value,
    };
    this.api
      .getster_profile_login_reset_table1_update_pass(
        this.rowvalues.getster_id,
        passch
      )
      .subscribe({
        next: () => {
          // alert('Password Reset Successfully !!!');
          this._snackbar.success(['Password Reset Successfully !!!']);
          this.loadData();
          this.getster.reset();
          this.getpass.reset();
          this.regmob.reset();
          this.disabledBtn = true;
          this.disabledBtn1 = true;
          this.disabledBtn2 = true;
          this.disabledBtn3 = true;
          this.disabledBtn4 = true;
        },
        error: () => {
          // alert('Error While Password Reseting !!!');
          this._snackbar.error(['Error While Reset Password!!!']);
        },
      });
  }

  sendEmail() {
    this.api.sendEmail(this.email_id, this.id).subscribe((data) => {
      this.api
        .sendSMS(this.country_code_to_number, this.datavalue[0].mobile, this.id)
        .subscribe((res) => {
          this._snackbar.success('Send Mail and SMS Successfully');
        });
    });
  }

  sendEmailPhoneNumber() {
    this.api.sendEmailPhoneNumber(this.email_id, this.id).subscribe((data) => {
      // this._snackbar.success(data.message);
      this.api
        .sendSMSPhoneNumber(
          this.country_code_to_number,
          this.datavalue[0].mobile,
          this.id
        )
        .subscribe((res) => {
          this._snackbar.success('Send Mail and SMS Successfully');
        });
    });
  }

  reLoadMap(latitude: number, languid: number) {
    this.getster.disable();
    this.getpass.disable();
    this.regmob.disable();
    // this.map.removeLayer(this.getsterMarker);
    if (this.getsterMarker != null) {
      this.map.removeLayer(this.getsterMarker);
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${languid}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.address = data.display_name;

        // console.log(`Address: ${this.address}`);
        this.map.flyTo([latitude, languid], 15);
        this.changeGetsterMarker = new L.Marker([latitude, languid])
          .addTo(this.map)
          .bindPopup(this.address);
        this.api.getsterCompleteDetails1(this.id).subscribe((res) => {
          this.locationAddress = res.data[0].adlocationadd;
          this._cdf.detectChanges();
        });
      });
    // this.api.getMapAddress(latitude, languid).subscribe((res: any) => {
    //   this.map.flyTo([latitude, languid], 15);
    //   this.changeGetsterMarker = new L.Marker([latitude, languid])
    //     .addTo(this.map)
    //     .bindPopup(res[0].display_name);
    // });
    // this.initialMarkers = [
    //   {
    //     position: { lat: latitude, lng: languid },
    //     draggable: false,
    //   },
    // ];
    // this.map.flyTo([latitude, languid], 15);
    // this.map.invalidateSize();
  }

  openDialog(): void {
    if (this.changeGetsterMarker != null) {
      this.map.removeLayer(this.changeGetsterMarker);
    }
    const dialogRef = this.dialog.open(AddEditLocationComponent, {
      width: '600px',
      data: this.getster_id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reLoadMap(result.lat, result.lng);
      this.loadData();
      // console.log('The dialog was closed');
    });
  }
  //* --------------------------  Public methods  --------------------------*//
  phoneForm = new UntypedFormGroup({
    phone: new UntypedFormControl(undefined, [Validators.required]),
  });

  regmob = this.formbuilder.group({
    phone: ['', Validators.required],
  });

  //form to getster password

  getpass = this.formbuilder.group({
    pass: ['', Validators.required],
  });
  //* ------------------------------ Helper Function -----------------------*//
  async initMarkers() {
    for (let index = 0; index < this.initialMarkers.length; index++) {
      const data = this.initialMarkers[index];
      const marker = this.generateMarker(data, index);
      this.address = await this.getAddress(this.let_data, this.lng_data);
      // console.log(this.address);
      marker.addTo(this.map).bindPopup(`<b>${this.address} </b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position);
  }
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
    // this.openCollision($event);
  }
  nestedTreeControl!: NestedTreeControl<TreeData>;
  nestedDataSource!: MatTreeNestedDataSource<TreeData>;
  checklistSelection = new SelectionModel<TreeData>(true /* multiple */);
  // selected_category_val: any = [];

  private _getChildren = (node: TreeData) => of(node.children);

  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data;
    this.nestedDataSource.data = data;
  }

  getLevel = (node: TreeData) => node.level;

  isExpandable = (node: TreeData) => node.expandable;

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TreeData): any {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) => {
      child;
    });
    return descendants.map((val) => {
      let temp: any = val.ishidden;
      let a: any[] = temp;
      return a;
    });
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TreeData): void {
    this.checklistSelection.toggle(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    // console.log(node);
    // Force update for the parent
    descendants.forEach((child) => {
      this.checklistSelection.isSelected(child);
      // console.log(child);
    });
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TreeData): void {
    // console.log(node);
    this.checklistSelection.toggle(node);
    // this.selected_category_val = this.checklistSelection.selected;
    this.checkAllParentsSelection(node);
  }
  checkAllParentsSelection(node: TreeData): void {
    let parent: TreeData | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeData): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }
  getParentNode(node: TreeData): TreeData | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.nestedTreeControl?.dataNodes?.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.nestedTreeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  treeecatdata(ev: any) {
    // console.log(ev);
    this.getster_category_id_update = ev;
    this.selection.selected;
    // console.log(this.getster_category_id_update);
  }
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
  // showPageSizeOptions!: boolean = true;

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
    var printContents = document.getElementById('existingGetster')!.innerHTML;
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
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;">Existing GETster Profiles
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
        `<div>
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
  ngOnDestroy() {
    this.spinner.close();
  }
  //! -------------------------------  End  --------------------------------!//
}
export interface PeriodicElement {
  name: string;
  user_id: number;
  user_category_name: string;
}
