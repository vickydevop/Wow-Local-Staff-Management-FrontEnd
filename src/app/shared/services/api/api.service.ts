import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtAuthService } from './JwtAuthService.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;
  entry_by_user_id = 3;
  country_id = 'in';
  getster_id = 1;
  camp_id!: 1;
  private httpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private _jwtAuthService: JwtAuthService
  ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  getvalues() {
    this.customer_id = localStorage.getItem('customer_id');
    this.country_no = localStorage.getItem('country_no');
  }
  //login
  verify_getster_password(getster_id: number,getster_password: any) {
    return this.http.get<any>(
      `${environment.verify_getster_password}?getster_id=${getster_id}&getster_password=${getster_password}`
    );
  }

  get_assigned_getster_to_camps(camp_id:any,camp_country_code: any) {
    return this.http.get<any>(
      `${environment.get_assigned_getster_to_camps}?camp_id=${camp_id}&camp_country_code=${camp_country_code}`
    );
  }

  get_camp_site_name_based_on_country_code(camp_country_code: string) {
    return this.http.get<any>(
      `${environment.get_camp_site_name_based_on_country_code}?camp_country_code=${camp_country_code}`
    );
  }

  get_getster_category_id_based_getster_id(getster_id: number) {
    return this.http.get<any>(
      `${environment.get_getster_category_id_based_getster_id}?getster_id=${getster_id}`
    );
  }
  ///
  getNewGetster(page_no: number,per_page: number,camp_id:number): Observable<any> {
    // console.log(this._jwtAuthService.getJwtToken());

    return this.http.get<any>(
      `${environment.get_new_getster}?pageno=${page_no}&per_page=${per_page}&camp_id=${camp_id}`
    );
  }
  // getConsoleGetster(pageNo: number, pageSize: number): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.get_console_getster}?pageNo=${pageNo}&pageSize=${pageSize}`,
  //     this._jwtAuthService.getJwtToken()
  //   );
  // }
  getGetsterProfile(getster_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.get_getster_profile}?getster_id=${getster_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  getExistingGetster(pageNo: number, pageSize: number,camp_id:number): Observable<any> {
    // console.log('data', this._jwtAuthService.getJwtToken());

    return this.http.get<any>(
      `${environment.get_existing_profile}?pageNo=${pageNo}&pageSize=${pageSize}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getManualBlockGetster(pageNo: number, pageSize: number,camp_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.get_manual_block_getster}?pageNo=${pageNo}&pageSize=${pageSize}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  updateGetsterApprovalStatus(getster_id: number): Observable<any> {
    let body = {
      getster_id: getster_id,
      approval_status: 2,
      entry_status: 'Blocked',
    };
    return this.http.put<any>(
      `${environment.update_getster_profile}`,body,this._jwtAuthService.getJwtToken()
    );
  }
  updateGetsterApprovalRegistrationStatus(getster_id: number): Observable<any> {
    let body = {
      getster_id: getster_id,
      approval_status: 1,
      entry_status: 'Approved',
    };
    return this.http.put<any>(
      `${environment.update_getster_profile}`,body,this._jwtAuthService.getJwtToken()
    );
  }
  updateGetsterRemoveApprovalRegistrationStatus(
    getster_id: number
  ): Observable<any> {
    let body = {
      getster_id: getster_id,
      approval_status: 0,
      entry_status: 'Deny Approved',
    };
    return this.http.put<any>(
      `${environment.update_getster_profile}`,body,this._jwtAuthService.getJwtToken()
    );
  }

  getAutoBlockedGetster(pageNo: number, pageSize: number,camp_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.get_auto_blocked_getster}?pageNo=${pageNo}&pageSize=${pageSize}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //User E Identity Card Eligibility
  usereidentitycardeligibilitycard(
    Getster_category_id: string,
    data: any
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.usereidentitycardeligibilitycard}?getster_category_id=${Getster_category_id}`,data,this._jwtAuthService.getJwtToken()
    );
  }

  getCardBooleanValues(getster_category_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.getcardbooleanvalues}?getster_category_id=${getster_category_id}`,this._jwtAuthService.getJwtToken()
    );
  }
  //Treee

  getsterprofiletreeview(): Observable<any> {
    return this.http.get(
      `${environment.getsterprofiletreeview}`,this._jwtAuthService.getJwtToken()
    );
  }

  //ApproveProfileChangesByUsers
  approveprofilechangesByUsers_table(): Observable<any> {
    return this.http.get<any>(
      `${environment.approveprofilechangesByUsers_table}`,this._jwtAuthService.getJwtToken()
    );
  }

  approveprofilechangesByUsers_table_delete(
    getster_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.approveprofilechangesByUsers_table_delete}?getster_id=${getster_id}`,this._jwtAuthService.getJwtToken()
    );
  }

  approveprofilechangesByUsers_table_update(
    getster_id: number,
    data: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.approveprofilechangesByUsers_table_update}?getster_id=${getster_id}`,data,this._jwtAuthService.getJwtToken()
    );
  }

  getsterProfileLoginResetTable1CategoryId(
    getster_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getster_profile_login_reset_table1_category_id}?getster_id=${getster_id}`,this._jwtAuthService.getJwtToken()
    );
  }

  getAuditTrail(pageno: number, per_page: number): Observable<any> {
    return this.http.get<any>(
      `${environment.get_audit_trail}?pageno=${pageno}&per_page=${per_page}`,this._jwtAuthService.getJwtToken()
    );
  }

  getsterProfileLoginResetTable1(
    pageNo: number,
    pageSize: number,
    camp_id:number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getster_profile_login_reset_table1}?pageNo=${pageNo}&pageSize=${pageSize}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  // getster_profile_login_reset_table1(): Observable<any> {
  //   return this.http.get<any>(`${environment.get_new_getster}`);
  // }

  getster_profile_login_reset_table1_update(
    getster_id: number,
    data: any
  ): Observable<any> {
    // console.log(data);

    return this.http.put<any>(
      `${environment.getster_profile_login_reset_table1_update}?getster_id=${getster_id}`,data,this._jwtAuthService.getJwtToken()
    );
  }

  getster_profile_login_reset_table1_update_mobno(
    getster_id: number,
    data: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.getster_profile_login_reset_table1_update_mobno}?getster_id=${getster_id}&entry_by_user_id=${this.entry_by_user_id}`,data
    );
  }

  getster_profile_login_reset_table1_update_pass(
    getster_id: number,
    data: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.getster_profile_login_reset_table1_update_pass}?getster_id=${getster_id}&entry_by_user_id=${this.entry_by_user_id}`,data
    );
  }

  // getsterBizLocationUpdate(getsterId: number, latlang: any): Observable<any> {
  //   // console.log('bo', getsterId, latlang);

  //   const body: any = {
  //     getster_id: getsterId,
  //     gps_coordinates: {
  //       lat: latlang.lat,
  //       lng: latlang.lng,
  //     },
  //   };
  //   return this.http.put<any>(`${environment.getster_location_update}`, body);
  // }

  getsterBizLocationUpdate(
    getsterId: number,
    latlang: any,
    address: any
  ): Observable<any> {
    // console.log('bo', getsterId, latlang);

    const body: any = {
      getster_id: getsterId,
      address: address,
      gps_coordinates: {
        lat: latlang.lat,
        lng: latlang.lng,
      },
    };
    // console.log('body', body);

    return this.http.put<any>(
      `${environment.getster_location_update}`,body,this._jwtAuthService.getJwtToken()
    );
  }

  GetGetsterCategoryWiseAdditionalFields(): Observable<any> {
    return this.http.get<any>(
      `${environment.get_getster_category_wise_additional_fields}?getster_id=${this.entry_by_user_id}`
    );
  }

  GetGetsterCategoryWiseAdditionalFields1(getster_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.get_getster_category_wise_additional_fields}?getster_id=${getster_id}`
    );
  }

  getsterCompleteDetails(): Observable<any> {
    return this.http.get<any>(
      `${environment.getster_complete_details}?getster_id=${this.entry_by_user_id}`
    );
  }

  getsterCompleteDetails1(getster_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.getster_complete_details}?getster_id=${getster_id}`
    );
  }

  getstercardbooleanvalues(): Observable<any> {
    return this.http.get<any>(
      `${environment.getster_card_boolean_values}?getster_id=${this.entry_by_user_id}`
    );
  }

  getster_profile_login_reset_table1_category_ids(
    getster_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getster_profile_login_reset_table1_category_id}?getster_id=${getster_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  GetManageGetsterCategoryWiseAdditionalFields(
    getster_id: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.get_approve_getster_category_wise_additional_fields}?getster_id=${getster_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getGetsterCategory(getster_category_id: any) {
    return this.http.get<any>(
      `${environment.get_getster_category}?getster_category_id=${getster_category_id}`
    );
  }
  update_treeview_category_id(
    getster_id: number,
    getster_category_id: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.update_treeview_category_id}?getster_id=${getster_id}`,
      getster_category_id
    );
  }
  getMapAddress(lat: any, lag: any) {
    return this.httpClient.get(
      `http://103.133.214.254/nominatim/search?q=${lat}%2C${lag}&limit=5&format=json&addressdetails=1`
    );
  }

  sendEmail(emailId: any, getsterId: number) {
    return this.http.get<any>(
      `${environment.send_email_password}?email_id=${emailId}&getster_id=${getsterId}`
    );
  }
  sendEmailPhoneNumber(emailId: any, getsterId: number) {
    return this.http.get<any>(
      `${environment.send_email_phone_number}?email_id=${emailId}&getster_id=${getsterId}`
    );
  }
  sendSMS(mobile_country_code: any, mobile_no: any, getsterId: number) {
    let body = {
      mobile_country_code: mobile_country_code,
      mobile_no: mobile_no,
      getster_id: getsterId,
    };
    return this.http.post<any>(`${environment.send_sms_password}`, body);
  }
  sendSMSPhoneNumber(
    mobile_country_code: any,
    mobile_no: any,
    getsterId: number
  ) {
    let body = {
      mobile_country_code: mobile_country_code,
      mobile_no: mobile_no,
      getster_id: getsterId,
    };
    // console.log(body);

    return this.http.post<any>(`${environment.send_sms_phone_number}`, body);
  }

  getsterProfileUrl(getster_id: number): Observable<any> {
    return this.http.get(
      `${environment.profile_card_url}?getster_id=${getster_id}`
    );
  }

  onEncoded(token: any) {
    return this.http.get<any>(`${environment.on_encoded}?hash=${token}`);
  }
  //-----------------CEPH API'S------------------------
}
