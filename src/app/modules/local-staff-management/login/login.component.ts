import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

// import { AppAdministratorListComponent } from 'src/app/modules/manage-app/components/app-administrator-list/app-administrator-list.component';
// import { GetsterRegisterService } from '../../services/app-development-console/getster-register.service';
interface Country {
  shortName: string;
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuthError: boolean = false;
  hide: any;
  getsterId!: number;
  country_code: any;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    // private _getsterRegisterService: GetsterRegisterService,
    private dialog: MatDialog,
    private service: CountryStateCityService,
    private apiService: ApiService,
    private jwtService: JwtHelperService,
    private spinner: CustomSpinnerService,
    private snackBar: SnackBarService,
    private _data_share:DataSharingService
  ) {
    this.CountryfilteredOptions = this.service.getCountries();
  }

  CountryfilteredOptions!: any;
  countries: Country[] = [];

  form = new FormGroup({
    country: new FormControl('', Validators.required),
    campName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.form.controls['country'].valueChanges.subscribe((data: any) => {
      // //console.log(data);
      this.countries = this.service.getCountries();
      // //////console.log(this.countries);
      if (data !== undefined) {
        this.CountryfilteredOptions = this.countries?.filter((d: any) => {
          // //////console.log(d)
          if (d.name)
            return d?.name
              ?.toLowerCase()
              .includes(data.toString().toLowerCase());
        });
      }
    });
    this.getsterId = this.data?.getster_id;
  }

  displayCountry(user: any) {
    return user && user.name ? user.name : '';
  }
  loginWithGetsterPassword() {
    // let getster_password = this.formGroup.controls['getster_password'].value;
    // this._getsterRegisterService
    //   .loginWithGetsterPassword(this.getsterId, getster_password)
    //   .subscribe((res) => {
    //     this.isAuthError = false;
    //     if (res.statusCode == 200) {
    //       this.dialogRef.close({
    //         token: res.data,
    //       });
    //     }
    //     if (res.statusCode == 401) {
    //       this.isAuthError = true;
    //     }
    //   });
  }

  onGetAppAdministratorList() {
    // this._getsterRegisterService.onGetAppAdministratorList().subscribe({
    //   next: (res) => {
    //     let config: MatDialogConfig = {
    //       disableClose: false,
    //       width: '330px',
    //       height: '410px',
    //       data: res.data,
    //     };
    //     const dialogRef = this.dialog.open(
    //       AppAdministratorListComponent,
    //       config
    //     );
    //     dialogRef.afterClosed().subscribe((res) => {
    //       if (res == 'true') {
    //       }
    //     });
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
  }

  campArray: any;
  arr: any[] = [];
  arrays: any[] = [];
  camp_site_name:any;
  getval(selectedVal: any) {
    const array: any[] = [];
    let val = selectedVal.name;

    let country_codeVal = selectedVal.shortName;
    this.country_code = selectedVal.shortName;

    this.form.controls['country'].setValue(val);

    this.apiService
      .get_camp_site_name_based_on_country_code(country_codeVal)
      .subscribe({
        next: (res) => {
          // console.log(res);

          if (res.data.length == 0) {
            this.form.controls['campName'].reset();
            this.campArray = [];
          }

          for (let i = 0; i < res.data.length; i++) {
            array.push(res.data[i].camp_site_name);
            this.campArray = array;
          }
          this.form.controls['campName'].valueChanges.subscribe((data) => {
            // console.log(data,'form');
            this.camp_site_name = data;
            for (let i = 0; i < res.data.length; i++) {
              this.arr.splice(i);
              this.arrays.splice(i);
              // const arr: any[] = [];
              if (data == res.data[i].camp_site_name) {
                this.arr.push(
                  res.data[i].camp_id
                  // res.data[i].camp_country_code
                );
              }
              if (data == res.data[i].camp_site_name) {
                this.arrays.push(
                  // res.data[i].camp_id
                  res.data[i].camp_country_code
                );
              }
              // console.log(this.arr);
              // console.log(this.arrays);
            }
          });
        },
      });
  }

  hasMatch: any;
  // check_camp_site_name(check:any) {
    // console.log('check',this.arr);
    // this._data_share.check_campsite_name_Data([check,this.arr?.[0]]);
  // }

  onsubmit() {
    const reg_getster_category_id: any[] = [];
    const array: any[] = [];
    const campId: any[] = [];
    const campCountryCode: any[] = [];

    let getster_id = this.jwtService.decodeToken(
      localStorage.getItem('access_token') as string
    ).user.getster_id;
    //console.log(getster_id);

    this.apiService
      .verify_getster_password(getster_id, this.form.controls['password'].value)
      .subscribe((res) => {
        // //console.log(res);

        if (res.data.is_password_incorrect == true) {
          this.snackBar.error('Login Incorrect');
        } else {
          this.apiService
            .get_getster_category_id_based_getster_id(getster_id)
            .subscribe({
              next: (res) => {
                // //console.log(res);

                for (let i = 0; i < res.data.length; i++) {
                  reg_getster_category_id.push(res.data[i].getster_category_id);

                  // //console.log(reg_getster_category_id);
                }

                this.apiService
                  .get_assigned_getster_to_camps(this.arr, this.country_code)
                  .subscribe({
                    next: (res) => {
                      //console.log(res);
                      // //console.log(campId);

                      for (let i = 0; i < res.data.length; i++) {
                        array.push(res.data[i].getster_category_id);
                        campId.push(res.data[i].camp_id);
                        campCountryCode.push(res.data[i].camp_country_code);
                        //console.log(array);
                        reg_getster_category_id.forEach((categoryId1) => {
                          array.forEach((categoryId2) => {
                            if (categoryId1 == categoryId2) {
                              this.hasMatch = true;
                              // console.log(this.arr,this.camp_site_name,'asasasasasas');
                              this.dialogRef.close(true);
                              // this._data_share.check_campsite_name_Data([this.camp_site_name,this.arr?.[0]]);
                              this.snackBar.success('Login Successful');
                              sessionStorage.setItem('name', 'true');
                              sessionStorage.setItem('camp_name' ,this.camp_site_name);
                              sessionStorage.setItem('camp_id', this.arr?.[0]);
                            }
                            if (!this.hasMatch) {
                              //console.log(false);
                              this.snackBar.error('Login Not Successful');
                            }
                          });
                        });
                      }
                    },
                  });
              },
            });
        }
      });
  }


}
