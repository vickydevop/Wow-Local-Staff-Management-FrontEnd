import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { TreeData } from 'src/app/models/tree.interface';
import { ApiService } from '../../../../shared/services/api/api.service';

import { SnackBarService } from '../../../../shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-user-e-identity-card-eligibility',
  templateUrl: './user-e-identity-card-eligibility.component.html',
  styleUrls: ['./user-e-identity-card-eligibility.component.scss'],
})
export class UserEIdentityCardEligibilityComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  fonts = this.formbuilder.group({
    font: ['', Validators.required],
  });
  arr: any[] = [];
  bgclr: any;
  textclr1: any;
  textclr2: any;
  textclr3: any;
  fontclr: any;
  category_id: any;
  fontfamilychange: any;
  disabledbtn: boolean = true;
  getster_photo: number = 0;
  app_icon: number = 0;
  barcode: number = 0;
  dob1: number = 0;
  category1: number = 0;
  institution: number = 0;
  mobile11: number = 0;
  mobile21: number = 0;
  bldg1: number = 0;
  email: number = 0;
  add: number = 0;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private formbuilder: FormBuilder,
    private _snackbar: SnackBarService,
    private api: ApiService,
    private _cdf: ChangeDetectorRef
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.api.getsterprofiletreeview().subscribe((res) => {
      this.nestedDataSource.data = res.data;
      this.nestedTreeControl.dataNodes = res.data;
    });
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  loadData() {
    this.api.getCardBooleanValues(this.category_id).subscribe((res) => {
      // console.log(this.category_id,'get');
      (this.getster_photo = res.data[0].getster_photo),
        (this.app_icon = res.data[0].app_icon),
        (this.barcode = res.data[0].barcode),
        (this.dob1 = res.data[0].dob),
        (this.category1 = res.data[0].category),
        (this.institution = res.data[0].institution),
        (this.mobile11 = res.data[0].mobile1),
        (this.mobile21 = res.data[0].mobile2),
        (this.bldg1 = res.data[0].bldg),
        (this.email = res.data[0].email),
        (this.add = res.data[0].add),
        // (this.bgclr = res.data[0].bg_color),
        // (this.textclr1 = res.data[0].text1),
        // (this.textclr2 = res.data[0].text2),
        // (this.textclr3 = res.data[0].text3),
        // (this.fontclr = res.data[0].fontclr);
        this._cdf.detectChanges();
    });
  }

  submit() {
    let obj = {
      is_getster_photo_id_to_be_displayed: this.getster_photo,
      is_app_icon_to_be_displayed: this.app_icon,
      is_barcode_id_to_be_displayed: this.barcode,
      is_getster_date_of_birth_to_be_displayed: this.dob1,
      is_getster_category_name_to_be_displayed: this.category1,
      is_registered_educational_institution_name_to_be_displayed:
        this.institution,
      is_registered_mobile_no_to_be_displayed: this.mobile11,
      is_additional_mobile_no_to_be_displayed: this.mobile21,
      is_getster_blood_group_to_be_dispalyed: this.bldg1,
      is_email_to_be_displayed: this.email,
      is_address_to_be_displayed: this.add,
      is_getster_background_color: this.cardbgclrchange,
      is_getster_text_type_1: this.cardtext1clrchange,
      is_getster_text_type_2: this.cardtext2clrchange,
      is_getster_text_type_3: this.cardtext3clrchange,
      is_getster_font: this.fontfamilychange,
    };
    // console.log(obj);
    // Getster_category_id:this.category_id
    this.api.usereidentitycardeligibilitycard(this.category_id, obj).subscribe({
      next: () => {
        // alert('Updated Successfully !!!');
        this._snackbar.success(['Data Updated Successfully']);
        // console.log(this.category_id,'update' );
        this.disabledbtn = true;
        this.loadData();
      },
      error: () => {
        // alert('Error While Updating !!!');
        this._snackbar.error(['Error While Updating']);
      },
    });
  }
  //* --------------------------  Public methods  --------------------------*//
  //tree view
  selected_category_name_val!: TreeData;
  nestedTreeControl!: NestedTreeControl<TreeData>;
  nestedDataSource!: MatTreeNestedDataSource<TreeData>;

  selectedCat(ev: any) {
    // console.log(ev);
    this.category_id = ev;
  }
  todoLeafItemSelectionToggle(node: TreeData): void {
    this.loadData();
    this.disabledbtn = false;
  }

  private _getChildren = (node: TreeData) => of(node.children);

  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = [];
    this.nestedDataSource.data = data;
  }
  // colors
  public color: string = '#2889e9';
  public color1: string = '#ff0000';
  public color2: string = '#7d848c';
  public color3: string = '#232324';

  //select fonts
  item: any[] = ['sans', 'serif', 'monospace'];

  fontchange(ev: any) {
    this.fontfamilychange = ev;
    // console.log(ev);
  }
  //* ------------------------------ Helper Function -----------------------*//
  cardbgclrchange: any;
  cardbgcolor(ev: any) {
    this.cardbgclrchange = ev;
  }
  cardtext1clrchange: any;
  cardtext1clr(ev: any) {
    this.cardtext1clrchange = ev;
  }
  cardtext2clrchange: any;
  cardtext2clr(ev: any) {
    this.cardtext2clrchange = ev;
  }
  cardtext3clrchange: any;
  cardtext3clr(ev: any) {
    this.cardtext3clrchange = ev;
  }

  checkprofile(ev: any) {
    this.getster_photo = ev.checked;
    // console.log(this.profile);
  }
  checkschlpic(ev: any) {
    this.app_icon = ev.checked;
    // console.log(this.schlpic);
  }
  checkqr(ev: any) {
    this.barcode = ev.checked;
    // console.log(this.qr);
  }
  checkdob(ev: any) {
    this.dob1 = ev.checked;
    // console.log(this.dob);
  }
  checkcategory(ev: any) {
    this.category1 = ev.checked;
    // console.log(this.category);
  }
  checkinstitute(ev: any) {
    this.institution = ev.checked;
    // console.log(this.institute);
  }
  checkmobile1(ev: any) {
    this.mobile11 = ev.checked;
    // console.log(this.mobile1);
  }
  checkmobile2(ev: any) {
    this.mobile21 = ev.checked;
    // console.log(this.mobile2);
  }
  checkbldg(ev: any) {
    this.bldg1 = ev.checked;
    // console.log(this.bldg);
  }
  checkmail(ev: any) {
    this.email = ev.checked;
    // console.log(this.mail);
  }
  checkaddress(ev: any) {
    this.add = ev.checked;
    // console.log(this.address);
  }
  //! -------------------------------  End  --------------------------------!//
}
